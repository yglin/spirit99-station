'use strict';

// Production specific configuration
// =================================
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
            define: {
                timestamps: false
            }
        }
    },

    // Server IP
    // ip:     process.env.OPENSHIFT_NODEJS_IP ||
    //         process.env.IP ||
    //         undefined,

    // // Server port
    // port:   process.env.OPENSHIFT_NODEJS_PORT ||
    //         process.env.PORT ||
    //         8080,

    // sequelize: {
    //   uri:  process.env.SEQUELIZE_URI ||
    //         'sqlite://',
    //   options: {
    //     logging: false,
    //     storage: 'dist.sqlite',
    //     define: {
    //       timestamps: false
    //     }
    //   }
    // }
};
