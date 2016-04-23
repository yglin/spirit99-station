/*
* @Author: yglin
* @Date:   2016-04-21 13:25:23
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-23 15:06:51
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.channel')
        .controller('ChannelUpdateController', ChannelUpdateController);

    ChannelUpdateController.$inject = ['$scope', '$location', '$window', '$routeParams', 'Auth', 'Channel'];

    /* @ngInject */
    function ChannelUpdateController($scope, $location, $window, $routeParams, Auth, Channel) {
        var $ctrl = this;
        $ctrl.title = 'Update Channel';
        $ctrl.channel = undefined;
        $ctrl.update = update;

        activate();

        ////////////////

        function activate() {
            var user = Auth.getCurrentUser();
            Channel.getFromUser(user._id, $routeParams.id)
            .then(function (channels) {
                $ctrl.channel = channels[0];
            }, function (error) {
                $window.alert('找不到頻道 ' + $routeParams.id + ' 的資料，或者您沒有權限修改。');
                $location.path('/');
                console.error(error);
            });
        }

        function update(channelData) {
            Channel.update(channelData).then(function () {
                $window.alert('更新完成！');
            }, function (error) {
                $window.alert('更新失敗！');
                console.error(error);
            });
        }
    }
})();
