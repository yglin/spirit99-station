/*
* @Author: yglin
* @Date:   2016-04-02 11:04:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-08 16:30:21
*/

'use strict';

angular.module('spirit99StationApp.channel')
.config(function($routeProvider) {
    $routeProvider
    .when('/channels', {
        templateUrl: 'app/channel/channel-list.tpl.html',
        controller: 'ChannelListController',
        controllerAs: '$ctrl'
    })
    .when('/channels/create', {
        templateUrl: 'app/channel/create/create.tpl.html',
        controller: 'ChannelCreateController',
        controllerAs: '$ctrl',
        authenticate: 'user'
    })
    .when('/channels/update/:id', {
        templateUrl: 'app/channel/update/update.tpl.html',
        controller: 'ChannelUpdateController',
        controllerAs: '$ctrl',
        authenticate: 'user'
    });
});
