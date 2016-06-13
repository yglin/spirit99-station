/*
* @Author: yglin
* @Date:   2016-06-13 10:11:05
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-13 12:04:03
*/

(function() {
    'use strict';

    angular.module('spirit99StationApp.post')
    .component('s99MyPosts',{
        templateUrl: 'app/post/my-posts/my-posts.tpl.html',
        controller: MyPostsController,
        bindings: {
            user: '<'
        }
    });

    MyPostsController.$inject = ['Auth', 'Channel', 'Post'];

    /* @ngInject */
    function MyPostsController(Auth, Channel, Post) {
        var $ctrl = this;
        // $ctrl.title = 'MyPosts';
        $ctrl.channels = [];

        $ctrl.togglePosts = togglePosts;

        $ctrl.$onInit = function () {
            Channel.query()
            .then(function (channels) {
                $ctrl.channels.push.apply($ctrl.channels, channels);
            });
        };

        function togglePosts(index) {
            var channel = $ctrl.channels[index];
            if (!channel.posts) {
                channel.onLoadingPosts = true;
                Post.getFromUser($ctrl.user._id, channel.id)
                .then(function (posts) {
                    channel.posts = posts;
                    channel.expanded = true;
                })
                .finally(function () {
                    channel.onLoadingPosts = false;
                });                
            }
            else {
                channel.expanded = !channel.expanded;
            }
        }
    }
})();
