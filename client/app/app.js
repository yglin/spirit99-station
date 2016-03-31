'use strict';

angular.module('spirit99StationApp', [
  'spirit99StationApp.auth',
  'spirit99StationApp.admin',
  'spirit99StationApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'validation.match'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
