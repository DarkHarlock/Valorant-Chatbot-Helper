# Valorant ChatBot Helper

Valorant utility that can be used from any chat bot with *http fetch support* inspired from [valorant_Nightbot](https://github.com/axsddlr/valorant_Nightbot) project.

The goal for that project is just use unofficial API exposed by [docs.henrikdev.xyz](https://docs.henrikdev.xyz/valorant.html) and format the result using [mustache.js](https://github.com/janl/mustache.js) before returning it to the caller.

This repo is [heroku](heroku.com) deploy ready and can be used by everyone!

> Do not worry! Nothing is saved server-side. This private "API" is purely for “viewing” ressources!

> NOTE that, as documented in the unofficial Valorant API [dashboard](https://docs.henrikdev.xyz/reference.html), there are speed limits based on the caller's IP. This means that if the app is hosted in the heroku cloud, some IP restrictions will apply to the heroku cloud itself.

## Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Usage

All API support a `$$template` querystring parameter that is used to format the response.
More about *mustache* syntax can be found [here](https://github.com/janl/mustache.js).

## Exposed APIs

- `/v1/account/:name/:tag`
- `/v1/mmr/:region/:name/:tag`
- `/v2/mmr/:region/:name/:tag`
- `/v3/matches/:region/:name/:tag`

## Examples

### Nightbot

```
$(user) my Valorant stats are $(urlfetch https://<deploy server>/v1/mmr/<region>/<user>/<tag>?$$template=Rank:%20{{data.currenttierpatched}}%20-%20ELO:%20{{data.elo}})
```

### StreamElements

```
${user} my Valorant stats are ${urlfetch https://<deploy server>/v1/mmr/<region>/<user>/<tag>?$$template=Rank:%20%7B%7Bdata.currenttierpatched%7D%7D%20-%20ELO:%20%7B%7Bdata.elo%7D%7D}
```

### Streamlabs Cloudbot

```
{user.name} my Valorant stats are {readapi.https://<deploy server>/v1/mmr/<region>/<user>/<tag>?$$template=Rank:%20%7B%7Bdata.currenttierpatched%7D%7D%20-%20ELO:%20%7B%7Bdata.elo%7D%7D}
```

### Streamlabs Chatbot (aka: ankhbot)

```
$user my Valorant stats are $readapi(https://<deploy server>/v1/mmr/<region>/<user>/<tag>?$$template=Rank:%20{{data.currenttierpatched}}%20-%20ELO:%20{{data.elo}})
```

## Thank you! :raised_hands:

A big Thanks to [ProFumatoTK](https://www.twitch.tv/profumatotk) for the entertainment and for which this tools was created and to [TheDarkness90](https://www.twitch.tv/thedarkness90) who originally had the idea!

## Legal
This API isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. 
Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

## Riot Games
Hey Riot, first of all i hope u know that this project is a try to enhance the developer community of VALORANT and also recognize it as one. 
If u still has a issue with it, feel free to text me :D

