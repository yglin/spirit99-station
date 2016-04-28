/*
* @Author: yglin
* @Date:   2016-04-28 14:25:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 19:43:39
*/

'use strict';

(function() {

    angular
    .module('spirit99StationApp.post')
    .controller('PostCreateController', PostCreateController);

    PostCreateController.$inject = ['$window', '$location', '$routeParams', 'Channel'];

    /* @ngInject */
    function PostCreateController($window, $location, $routeParams, Channel) {
        var $ctrl = this;
        $ctrl.title = 'Create Post';
        $ctrl.post = undefined;
        $ctrl.channel = undefined;

        activate();

        ////////////////

        function activate() {
            $ctrl.post = {};
            $ctrl.post.latitude = $routeParams.latitude;
            $ctrl.post.longitude = $routeParams.longitude;

            if ($routeParams.channel_id) {
                Channel.get($routeParams.channel_id)
                .then(function (channel) {
                    $ctrl.channel = channel;
                }, function (error) {
                    console.error(error);
                    $window.alert('找不到頻道 ' + $routeParams.channel_id + ' 的資料');
                    if ($routeParams.returnUrl) {
                        $window.location.href = $routeParams.returnUrl;
                    }
                    else {
                        $location.path('/');
                    }
                });
            }
        }
    }
})();