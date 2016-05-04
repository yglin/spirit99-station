/*
* @Author: yglin
* @Date:   2016-05-02 09:21:37
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-02 13:36:42
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.post')
        .controller('PostViewController', PostViewController);

    PostViewController.$inject = ['$window', '$routeParams', 'Util', 'Channel', 'Post'];

    /* @ngInject */
    function PostViewController($window, $routeParams, Util, Channel, Post) {
        var $ctrl = this;
        $ctrl.title = 'Post View';
        $ctrl.post = undefined;
        $ctrl.postIcon = undefined;

        activate();

        ////////////////

        function activate() {
            if ($routeParams.channel_id && $routeParams.post_id) {
                Post.get($routeParams.channel_id, $routeParams.post_id)
                .then(function (post) {
                    $ctrl.post = post;

                    Channel.get($routeParams.channel_id).then(function (channel) {
                        if (post.category && channel.categories
                        && post.category in channel.categories) {
                            $ctrl.postIcon = channel.categories[post.category].icon;
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
