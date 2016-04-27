/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';
import Q from 'q';

var dbGoodToGO = Q.defer();

// Populate databases with sample data
if (config.seedDB) {
    sqldb.forceSync(sqldb.sequelize)
    .then(() => {
      return require('./config/seed')
      .then(() => {
          dbGoodToGO.resolve();
      });          
    }, (error) => {
      dbGoodToGO.reject(error);
    });
}
else {
    sqldb.sequelize.sync().then(() => {
      dbGoodToGO.resolve();
    }, (error) => {
      dbGoodToGO.reject(error);
    });
}

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}


dbGoodToGO.promise
.then(startServer)
.catch(function(err) {
console.log('Server failed to start due to error: %s', err);
});

// Expose app
exports = module.exports = app;
