/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import channelDBs from './sqldb/channels'
import config from './config/environment';
import http from 'http';
import Q from 'q';

// var dbGoodToGO = Q.defer();

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

sqldb.sequelize.sync()
.then(channelDBs.connectAll)
.then(startServer)
.catch(function(err) {
console.log('Server failed to start due to error: %s', err);
});

// Expose app
exports = module.exports = app;
