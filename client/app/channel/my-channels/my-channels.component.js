/*
* @Author: yglin
* @Date:   2016-06-09 10:57:13
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-12 17:39:45
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

    MyChannelsController.$inject = ['$scope', 'Auth', 'Channel', 'ygDialog'];

    /* @ngInject */
    function MyChannelsController($scope, Auth, Channel, ygDialog) {
        var $ctrl = this;
        $ctrl.title = 'MyChannels';
        $ctrl.channels = [];
        $ctrl.closedChannels = [];
        $ctrl.close = close;
        $ctrl.reopen = reopen;

        $ctrl.$onInit = function () {
            Channel.getFromUser($ctrl.user._id)
            .then(function (channels) {
                for (var i = 0; i < channels.length; i++) {
                    if (channels[i].state == 'closed') {
                        $ctrl.closedChannels.push(channels[i]);
                    }
                    else {
                        $ctrl.channels.push(channels[i]);
                    }
                }
            })
        };

        function close(index) {
            var channel = $ctrl.channels[index];
            ygDialog.confirm('關閉頻道', '<p>確定要關閉以下頻道?</p><br><h3>' + channel.title + '</h3>')
            .then(function () {
                Channel.update({
                    id: channel.id,
                    state: 'closed'
                })
                .then(function () {
                    $ctrl.closedChannels.push(channel);
                    $ctrl.channels.splice(index, 1);
                });                
            });
        }

        function reopen(index) {
            var channel = $ctrl.closedChannels[index];
            ygDialog.confirm('開啟頻道', '<p>確定要重新開啟以下頻道?</p><br><h3>' + channel.title + '</h3>')
            .then(function () {
                Channel.update({
                    id: channel.id,
                    state: 'public'
                })
                .then(function () {
                    $ctrl.channels.push(channel);
                    $ctrl.closedChannels.splice(index, 1);
                });                
            });
        }
    }
})();
