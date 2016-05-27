'use strict';

exports = module.exports = (function () {
    var sharedConstants = {
        env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
        // List of user roles
        userRoles: ['guest', 'user', 'admin']
    };

    sharedConstants.spirit99Url = 'http://www.9493.tw';
    if (process.env.NODE_ENV == 'development') {
        sharedConstants.spirit99Url = 'http://localhost:9493';
    }
    else if (process.env.NODE_ENV == 'test') {
        sharedConstants.spirit99Url = 'http://localhost:9001';
    }

    return sharedConstants;
})();