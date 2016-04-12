'use strict';

angular.module('spirit99StationApp', [
    'spirit99StationApp.auth',
    'spirit99StationApp.admin',
    'spirit99StationApp.constants',
    'spirit99StationApp.channel',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'btford.socket-io',
    'validation.match',
    'ngMaterial',
])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .otherwise({
        redirectTo: '/channels'
    });

    $locationProvider.html5Mode(true);
});
