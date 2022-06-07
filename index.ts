import * as http from 'http';
import { parse, UrlWithParsedQuery } from 'url';
import { ParsedUrlQuery } from 'querystring';
import * as mustache from 'mustache';

const port = process.env.PORT || 5000;

console.log("starting service on port " + port);

const knownApis = [
    ['v1', 'account', ':name', ':tag'],
    ['v1', 'mmr', ':region', ':name', ':tag'],
    ['v2', 'mmr', ':region', ':name', ':tag'],
    ['v3', 'matches', ':region', ':name', ':tag'],
];

function validateRequest(parsedUrl: UrlWithParsedQuery): boolean {
    const pathParams = (parsedUrl.path || "")
        .split('/')
        .filter(token => !!token);

    for (const knownApi of knownApis) {
        if (pathParams.length !== knownApi.length)
            continue;

        const res: { [key: string]: string } = {};
        let complete = true;
        for (const idx in knownApi) {
            const token = knownApi[idx];
            const par = pathParams[idx];

            if (token.startsWith(':')) {
                res[token.substring(1)] = par;
            } else {
                if (token !== par) {
                    complete = false;
                    break;
                }
            }
        }
        if (complete) {
            return true;
        }
    }

    return false;
}

function serializeQuery(obj: ParsedUrlQuery) {
    const str = [];
    for (const p in obj)
        if (obj.hasOwnProperty(p)) {
            const val = obj[p];
            if (typeof val === 'string')
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
            else if (Array.isArray(val))
                for (const v of val)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(v));
            else
                str.push(encodeURIComponent(p) + "=");
        }
    return str.length ? "?" + str.join("&") : "";
}

http.createServer(async (req, res) => {
    console.log("request " + req.url);
    try {
        const parsedUrl = parse(req.url!, true);
        const query = parsedUrl.query || {};
        const template = query["$$template"] as string || "";
        delete query["$$template"];

        if (template && validateRequest(parsedUrl)) {
            const response = await fetch('https://api.henrikdev.xyz/valorant' + parsedUrl.pathname + serializeQuery(query));
            if (response.status === 200) {
                const data = await response.json();

                if (template !== '-') {
                    var body = mustache.render(template, data);

                    res.statusCode = 200;
                    res.setHeader('content-type', 'text/plain');
                    res.write(body);
                    res.end();
                    return;
                } else {
                    res.statusCode = 200;
                    res.setHeader('content-type', 'application/json');
                    res.write(JSON.stringify(data));
                    res.end();
                    return;
                }
            } else {
                console.log("Error! code: " + response.status + " body: " + await response.blob().then(b => b.text()))
            }
        }
    }
    catch { }

    res.statusCode = 400;
    res.end();
}).listen(port);

