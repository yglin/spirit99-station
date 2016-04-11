/*
* @Author: yglin
* @Date:   2016-04-02 11:04:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-02 11:17:02
*/

'use strict';

angular.module('spirit99StationApp.channel').config(function ($routeProvider) {
    $routeProvider.when('/channel/create', {
        templateUrl: 'app/channel/create/create.tpl.html',
        controller: 'ChannelCreateController',
        controllerAs: 'channelCreateVM'
    });
});
//# sourceMappingURL=channel.router.js.map
