'use strict';

exports = module.exports = {
  // List of user roles
  env: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  spirit99Url: process.env.NODE_ENV == 'production' ? 'http://www.9493.tw' : 'http://localhost:9493',
  userRoles: ['guest', 'user', 'admin']
};
