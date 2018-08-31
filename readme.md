MessageBird Assignment (Vadim Sheydakov)
===
Usage
---

### NPM Scripts
`npm run start:server` - build and start server with `babel` in `development` mode.

`npm run start:client` - build client by `webpack` in `development` mode. Starts `webpack-dev-server` on `3002` port by default. Using `.\webpack\webpack.development.config.js` configuration file.

`npm run dev:storybook` - starts Storybook application for demo purpose of components layout and behavior.

`npm run start:tunnel` - starts `localtunnel` for external requests to application.

`npm run test:jest` - run tests (jest + enzyme) from `.\tests` folder.

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

`AccessKey` _(string, **required**)_ - Registered AccessKey in MessageBird dashboard.

`Originator` _(string, **required**, default: "Inbox")_ - Originator which will be used for sending messages via MessageBird rest API.

`assetsRootUrl` _(string, default: "http://localhost:3002/")_ - Place to search assets built by webpack. In `development` mode `webpack-dev-server` serves _http://localhost:3002/_ url.
