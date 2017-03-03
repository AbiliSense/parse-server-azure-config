## Parse Server Config 
![Build Status](https://travis-ci.org/AbiliSense/parse-server-config.svg?branch=master "Build Status")

A package to simplify configuration of parse server.

Exports an object with default configurations for storage, push, server, and dashboard.
```js
let config = require('parse-server-config');
let ParseServer = require('parse-server').ParseServer;
let ParseDashboard = require('parse-dashboard');
let express = require('express');

let options = {
  defaults: 'config.js', // file to load with default user configuration
  secrets: 'secrets.js'  // file to load secrets
}

let {
  server,     // parse server configuration options
  dashboard   // parse dashboard configuration options
} = config(__dirname, options);

let app = express();
app.use('/parse', new ParseServer(server));
app.use('/parse-dashboard', ParseDashboard(dashboard));

app.listen(process.env.PORT);
```