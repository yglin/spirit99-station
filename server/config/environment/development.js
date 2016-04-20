'use strict';

var credentials = require('../../../.credentials/database');

// Development specific configuration
// ==================================
module.exports = {

    // Sequelize connection opions
    sequelize: {
        database: credentials.development.database,
        username: credentials.development.username,
        password: credentials.development.password,
        options: {
            host: credentials.development.host,
            dialect: 'mysql',
            pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
            },
            logging: false,
            define: {
                timestamps: false
            }
        }
    },

    // Seed database on startup
    seedDB: true

};
