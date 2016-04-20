/*
* @Author: yglin
* @Date:   2016-04-02 11:04:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-20 15:17:00
*/

'use strict';

angular.module('spirit99StationApp.channel')
.config(function($routeProvider) {
    $routeProvider
    .when('/channels', {
        template: '<channel-list></channel-list>'
    })
    .when('/channels/create', {
        templateUrl: 'app/channel/create/create.tpl.html',
        controller: 'ChannelCreateController',
        controllerAs: 'channelCreateVM',
        authenticate: 'user'
    });
});
