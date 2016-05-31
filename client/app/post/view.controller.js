/*
* @Author: yglin
* @Date:   2016-05-02 09:21:37
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-31 13:41:12
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.post')
        .controller('PostViewController', PostViewController);

    PostViewController.$inject = ['$window', '$routeParams', 'Util', 'Channel', 'Post', 'Auth'];

    /* @ngInject */
    function PostViewController($window, $routeParams, Util, Channel, Post, Auth) {
        var $ctrl = this;
        $ctrl.title = 'Post View';
        $ctrl.channel = undefined;
        $ctrl.post = undefined;
        $ctrl.categoryIcon = undefined;
        $ctrl.categoryTitle = undefined;

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

                    // Check if my post
                    Auth.getCurrentUser(function (user) {
                        if (user && user._id && post.owner_id == user._id) {
                            $ctrl.isMyPost = true;
                        }
                        else {
                            $ctrl.isMyPost = false;
                        }
                    });
                    
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
    }
})();
