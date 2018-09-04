MessageBird Assignment (Vadim Sheydakov)
===
Usage
---

### NPM Scripts
###### Development

`npm run start:server` - build and start server with `babel` in `development` mode.

`npm run start:client` - build client by `webpack` in `development` mode. Starts `webpack-dev-server` on `3002` port by default. Using `.\webpack\webpack.development.config.js` configuration file.

`npm run dev:storybook` - starts Storybook application for demo purpose of components layout and behavior.

`npm run start:tunnel` - starts `localtunnel` for external requests to application.

`npm run test:jest` - run tests (jest + enzyme) from `.\tests` folder.

###### Production

`npm run build:server` - build server with babel and move result into `dist\server` target folder. `shared` folder would be processed and moved as well.

`npm run build:client` - build and justify client by webpack with `.\webpack\webpack.production.config.js`. Moving result into `dist/client/static` folder, which `express` process as a static resource folder.

`npm run build` - build both, client and server.

`npm run start:server-prod` - runs server from `dist` folder with `NODE_ENV=production` value and `production` environment.   

Configuration
-----------------------------------
Application using `nconf` npm package for hierarchical configuration. You are able to specify any parameter as environment variable / argv / in configuration file.

```
--mcBird:Environment development --mcBird:AccessKey _{any value}_
```

#### Configuration file

Location: `_{project directory}_/src/server/configuration/_{mode}_.configuration.json`
```json
{
  "mcBird": {
    "assetsRootUrl": "http://localhost:3002/",
    "siteRoot": "/",
    "WindowTitle": "mcBird Assignment",
    "urls": {
      "WebSocketServer": "ws://localhost:8090",
      "MessageBirdApiRoot": "https://rest.messagebird.com"
    },
    "Originator": "Inbox",
    "AccessKey": ""
  }
}
```

`assetsRootUrl` _(string, default: "http://localhost:3002/")_ - Place where to search assets built by webpack. In `development` mode `webpack-dev-server` serves _http://localhost:3002/_ url.

`Originator` _(string, **required**, default: "Inbox")_ - Originator which will be used for sending messages via MessageBird rest API.

`AccessKey` _(string, **required**)_ - Registered AccessKey in MessageBird dashboard.

`urls.WebSocketServer` - Url to instantiate websocket connection with. Can be empty(=income request host value would be used).

Examples of config files you can find in `src\server\configuration` folder. 
