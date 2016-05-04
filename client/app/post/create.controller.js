/*
* @Author: yglin
* @Date:   2016-04-28 14:25:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 21:12:21
*/

'use strict';

(function() {

    angular
    .module('spirit99StationApp.post')
    .controller('PostCreateController', PostCreateController);

    PostCreateController.$inject = ['$window', 'Util', '$q', '$routeParams', 'Channel', 'Post'];

    /* @ngInject */
    function PostCreateController($window, Util, $q, $routeParams, Channel, Post) {
        var $ctrl = this;
        $ctrl.title = 'Create Post';
        $ctrl.post = undefined;
        $ctrl.channel = undefined;
        $ctrl.create = create;

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
                    Util.returnUrl()
                });
            }
        }

        function create(data) {
            return Post.create($routeParams.channel_id, data)
            .then(function (post) {
                $window.alert('發佈成功~!!');
                console.log(post);
                Util.returnUrl('/' + $routeParams.channel_id + '/posts/' + post._id);
                return $q.resolve();
            }, function (error) {
                $window.alert('發佈失敗...');
                return $q.reject();
            });
        }
    }
})();