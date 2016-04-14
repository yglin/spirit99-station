/*
* @Author: yglin
* @Date:   2016-04-14 17:04:29
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-14 17:06:11
*/

'use strict';

angular.module('spirit99StationApp.map')
.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCewhA8IKkKYEWgW0e5bSThsw6sNKauliE'
    });
}]);