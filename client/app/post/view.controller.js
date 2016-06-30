/*
* @Author: yglin
* @Date:   2016-05-02 09:21:37
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-30 15:05:19
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.post')
        .controller('PostViewController', PostViewController);

    PostViewController.$inject = ['$scope', '$window', '$location', '$routeParams', '$mdMedia', 'Util', 'Channel', 'Post', 'Auth', 'ygDialog'];

    /* @ngInject */
    function PostViewController($scope, $window, $location, $routeParams, $mdMedia, Util, Channel, Post, Auth, ygDialog) {
        var $ctrl = this;
        $ctrl.title = 'Post View';
        $ctrl.channel = undefined;
        $ctrl.post = undefined;
        $ctrl.categoryIcon = undefined;
        $ctrl.categoryTitle = undefined;
        $ctrl.isEvent = false;
        $ctrl.$mdMedia = $mdMedia;

        $ctrl.gotoUpdate = gotoUpdate;
        $ctrl.deletePost = deletePost;

        activate();

        ////////////////

        function activate() {
            if ($routeParams.channel_id && $routeParams.post_id) {
                Post.get($routeParams.channel_id, $routeParams.post_id)
                .then(function (post) {
                    $ctrl.post = post;

                    // Get channel data
                    Channel.get($routeParams.channel_id).then(function (channel) {
                        $ctrl.channel = channel;
                        if (post.category && channel.categories
                        && post.category in channel.categories) {
                            var category = channel.categories[post.category];
                            $ctrl.categoryIcon = category.icon;
                            $ctrl.categoryTitle = category.title;
                        }
                    });

                    checkMyPost();

                    $scope.$on('account:login', checkMyPost);
                    $scope.$on('account:logout', function () {
                        $ctrl.isMyPost = false;
                    });

                    $ctrl.isEvent = $ctrl.post.startAt && $ctrl.post.endAt;
                    
                }, function (error) {
                    $window.alert('找不到文章: channel id = ' + $routeParams.channel_id + ', post id = ' + $routeParams.post_id);
                    Util.returnUrl();
                    return;
                })
            }
            else {
                $window.alert('無效的頻道ID或是文章ID: ' + $location.absUrl());
                Util.returnUrl();
                return;
            }
        }

        function checkMyPost() {
            // Check if my post
            Auth.getCurrentUser(function (user) {
                if (user && user._id && $ctrl.post.owner_id == user._id) {
                    $ctrl.isMyPost = true;
                }
                else {
                    $ctrl.isMyPost = false;
                }
            });            
        }

        function gotoUpdate() {
            $location.path('/' + $ctrl.channel.id + '/posts/update/' + $ctrl.post._id);
        }

        function deletePost() {
            ygDialog.confirm('刪除文章', '<p>確定要刪除這篇文章嗎？</p><h3>' + $ctrl.post.title + '</h3>')
            .then(function () {
                Post.delete($ctrl.channel.id, $ctrl.post._id)
                .then(function () {
                    ygDialog.prompt('<h3>文章已刪除</h3>')
                    .then(function () {
                        Util.returnUrl();
                    });
                }, function (error) {
                    ygDialog.alert('刪除失敗', '刪除文章失敗：<br><pre>' + JSON.stringify(error) + '</pre>');
                })
            })
        }
    }
})();
