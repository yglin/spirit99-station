/*
* @Author: yglin
* @Date:   2016-04-14 17:04:29
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-08 23:34:59
*/

// This file is generated from map.config.js.env, by grunt task "replace"

'use strict';

angular.module('spirit99StationApp.map')
.config(['uiGmapGoogleMapApiProvider', 'appConfig',
function(uiGmapGoogleMapApiProvider, appConfig) {
    uiGmapGoogleMapApiProvider.configure({
        key: appConfig.googleAPIKey
    });
}]);