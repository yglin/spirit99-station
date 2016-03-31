'use strict';

angular.module('spirit99StationApp.auth', ['spirit99StationApp.constants', 'spirit99StationApp.util', 'ngCookies', 'ngRoute']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map
