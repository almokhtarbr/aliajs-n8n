# aliajs-n8n

[n8n](https://n8n.io) packaged for [AliaJS](https://github.com/jdecaron/aliajs): `npm install` pulls the official `n8n` package and `start.js` runs `n8n start` on the port AliaJS assigns (`PORT`), listening on localhost behind AliaJS's nginx and HTTPS.

AliaJS service entry:

```js
{
  "name": "n8n",
  "tier": "production",
  "language": "javascript",
  "type": "nodejs",
  "remote_repository": "https://github.com/almokhtarbr/aliajs-n8n.git",
  "domains": [`n8n-production.${process.env.ALIAJS_DEFAULT_TOP_LEVEL_DOMAIN}`],
  "operations": {
    "main": "/start.js",
    "packages": "npm install --omit=dev --no-audit --no-fund",
  },
}
```

Any `N8N_*` setting can be added as an AliaJS service variable to override the defaults in `start.js`.
