'use strict';

exports = module.exports = (function () {
    var sharedConstants = {
        env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
        // List of user roles
        userRoles: ['guest', 'user', 'admin']
    };

    if (process.env.NODE_ENV === 'production') {
        sharedConstants.spirit99Url = '//www.9493.tw';
    }
    else if (process.env.NODE_ENV === 'development') {
        sharedConstants.spirit99Url = '//localhost:9493';
    }
    else if (process.env.NODE_ENV === 'test') {
        sharedConstants.spirit99Url = '//localhost:9001';
    }

    sharedConstants.googleAPIKey = process.env.GOOGLE_CLIENT_API_KEY;
    sharedConstants.ImgurClientID = process.env.IMGUR_CLIENT_ID;

    return sharedConstants;
})();