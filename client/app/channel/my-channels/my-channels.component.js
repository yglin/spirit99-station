/*
* @Author: yglin
* @Date:   2016-06-09 10:57:13
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-12 15:38:07
*/

(function() {
    'use strict';

    angular.module('spirit99StationApp.channel')
    .component('s99MyChannels',{
        templateUrl: 'app/channel/my-channels/my-channels.tpl.html',
        controller: MyChannelsController,
        bindings: {
            user: '<'
        }
    });

    MyChannelsController.$inject = ['$scope', 'Auth', 'Channel'];

    /* @ngInject */
    function MyChannelsController($scope, Auth, Channel) {
        var $ctrl = this;
        $ctrl.title = 'MyChannels';
        $ctrl.channels = [];

        $ctrl.$onInit = function () {
            Channel.getFromUser($ctrl.user._id)
            .then(function (channels) {
                $ctrl.channels.push.apply($ctrl.channels, channels);
            })
        };
    }
})();
