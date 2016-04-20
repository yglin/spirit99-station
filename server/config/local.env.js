'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

var dbCredentials = require('../../.credentials/database')[process.env.NODE_ENV || 'development'];
var googleOauth2 = require('../../.credentials/google/oauth2')[process.env.NODE_ENV || 'development'];

module.exports = {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: 'spirit99-station-ru.3g6ru.3gp6',

    DB_HOST: dbCredentials.host,
    DB_DATABASE: dbCredentials.database,
    DB_USERNAME: dbCredentials.username,
    DB_PASSWORD: dbCredentials.password,

    FACEBOOK_ID: 'app-id',
    FACEBOOK_SECRET: 'secret',

    TWITTER_ID: 'app-id',
    TWITTER_SECRET: 'secret',

    GOOGLE_ID: googleOauth2.client_id,
    GOOGLE_SECRET: googleOauth2.client_secret,

    // Control debug level for modules using visionmedia/debug
    DEBUG: ''
};
