'use strict';

// Development specific configuration
// ==================================
module.exports = {

    // Sequelize connection opions
    sequelize: {
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        options: {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
            },
            logging: false,
            // define: {
            //     timestamps: false
            // }
        }
    },

    // Seed database on startup
    seedDB: true

};
