/*
* @Author: yglin
* @Date:   2016-04-02 11:04:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-22 11:31:27
*/

'use strict';

angular.module('spirit99StationApp.channel')
.config(function($routeProvider) {
    $routeProvider
    .when('/channels', {
        templateUrl: 'app/channel/channel-list.tpl.html',
        controller: 'ChannelListController',
        controllerAs: '$ctrl',
        resolve: {
            channels: ['Channel', '$q', function (Channel, $q) {
                return Channel.query().$promise;
            }]
        }        
    })
    .when('/channels/create', {
        templateUrl: 'app/channel/create/create.tpl.html',
        controller: 'ChannelCreateController',
        controllerAs: 'channelCreateVM',
        authenticate: 'user'
    })
    .when('/channels/update/:id', {
        templateUrl: 'app/channel/update/update.tpl.html',
        controller: 'ChannelUpdateController',
        controllerAs: '$ctrl',
        authenticate: 'user'
    });
});
