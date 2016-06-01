/*
* @Author: yglin
* @Date:   2016-04-28 14:25:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-01 11:01:56
*/

'use strict';

(function() {

    angular
    .module('spirit99StationApp.post')
    .controller('PostCreateController', PostCreateController);

    PostCreateController.$inject = ['$window', 'Util', '$q', '$routeParams', '$location', '$cookies', 'Auth', 'Channel', 'Post', 'ygDialog'];

    /* @ngInject */
    function PostCreateController($window, Util, $q, $routeParams, $location, $cookies, Auth, Channel, Post, ygDialog) {
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

            Auth.getCurrentUser(function (user) {
                if (!user || !user._id) {
                    ygDialog.confirm('尚未登入', '<p>您尚未登入，以此匿名建立的文章之後將無法再修改或刪除。</p><br><h4>是否要先登入呢？</h4>')
                    .then(function () {
                        $cookies.put('path-after-login', $location);
                        $location.path('/login');
                    })
                }
            });
        }

        function create(data) {
            return Post.create($routeParams.channel_id, data)
            .then(function (post) {
                $window.alert('發佈成功~!!');
                // console.log(post);
                Util.returnUrl('/' + $routeParams.channel_id + '/posts/' + post._id);
                return $q.resolve();
            }, function (error) {
                $window.alert('發佈失敗...');
                return $q.reject();
            });
        }
    }
})();