var util = require('util');

module.exports = (siteRoot, options) => {
  options = options || {};

  var server= {
    appId: process.env.APP_ID || "appId",
    masterKey: process.env.MASTER_KEY || "masterKey",
    databaseURI: process.env.DATABASE_URI || "mongodb://localhost:27017/dev",
    serverURL: process.env.SERVER_URL || "http://localhost:1337/parse",
    fileKey: process.env.FILE_KEY || "invalid-file-key",
    cloud: siteRoot + "/cloud/main.js",
    logFolder: siteRoot + "/logs",
    publicServerURL: process.env.SERVER_URL || "http://localhost:1337/parse",
    appName: process.env.WEBSITE_SITE_NAME || "Parse Server"
  };

  var dashboard = {
    apps: [
      {
        appId: server.appId,
        serverURL: server.serverURL,
        masterKey: server.masterKey,
        appName: server.appName
      }
    ],
    users: [
      {
        user: server.appId,
        pass: server.masterKey
      }
    ]
  };

  loadConfigFile(options.config || 'config.js');
  loadConfigFile(options.local || 'local.js');

  var config = {
    server: server,
    dashboard: dashboard
  };

  console.log('parse-server-config generated the following configuration:');
  console.log(util.inspect(config, { showHidden: false, depth: 4 }))

  return config;

  function loadConfigFile(filename) {
    try {
      var config = require(`${siteRoot}/${filename}`);

      Object.assign(server, config.server);

      // concat apps and users
      Object.keys(dashboard).forEach((key) => {
        var val = config && config.dashboard && config.dashboard[key];
        if (val)
          dashboard[key] = dashboard[key].concat(val);
      });
    } catch (err) { 
      console.error(err);
      console.log(`Couldn't load configuration from ${siteRoot}/${filename}`) 
    }
  }
}
