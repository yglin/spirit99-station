'use strict';

exports = module.exports = (function () {
    var sharedConstants = {
        env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
        // List of user roles
        userRoles: ['guest', 'user', 'admin']
    };

    if (process.env.NODE_ENV == 'production') {
        sharedConstants.spirit99Url = 'http://www.9493.tw';
    }
    else if (process.env.NODE_ENV == 'development') {
        sharedConstants.spirit99Url = 'http://localhost:9493';
    }
    else if (process.env.NODE_ENV == 'test') {
        sharedConstants.spirit99Url = 'http://localhost:9001';
    }

    if (process.env.NODE_ENV == 'production') {
        sharedConstants.googleAPIKey = 'AIzaSyB72lwL0HWu-jdurOAWFMIUMPAL6aHeZ0s';
    }
    else {
        sharedConstants.googleAPIKey = 'AIzaSyCewhA8IKkKYEWgW0e5bSThsw6sNKauliE';
    }

    return sharedConstants;
})();