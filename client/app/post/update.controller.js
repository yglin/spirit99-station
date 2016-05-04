/*
* @Author: yglin
* @Date:   2016-05-03 19:53:57
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 13:40:33
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.post')
        .controller('PostUpdateController', PostUpdateController);

    PostUpdateController.$inject = ['$window', 'Util', '$routeParams', 'Auth', 'Channel', 'Post'];

    /* @ngInject */
    function PostUpdateController($window, Util, $routeParams, Auth, Channel, Post) {
        var $ctrl = this;
        $ctrl.title = 'Post Update View';
        $ctrl.channel = undefined;
        $ctrl.post = undefined;

        activate();

        ////////////////

        function activate() {
            if (!$routeParams.channel_id || !$routeParams.post_id) {
                $window.alert('未指定頻道ID或文章ID');
                Util.returnUrl();
                return;
            }
            
            Auth.getCurrentUser(function (user) {
                if (user._id) {
                    Channel.get($routeParams.channel_id)
                    .then(function (channel) {
                        $ctrl.channel = channel;

                        Post.getFromUser(user._id, $routeParams.channel_id, $routeParams.post_id)
                        .then(function (post) {
                            $ctrl.post = post;
                        }, function (error) {
                            $window.alert('找不到文章，或是你沒有權限修改');
                            Util.returnUrl();
                        });
                    }, function (error) {
                        console.error(error);
                        $window.alert('找不到頻道 ' + $routeParams.channel_id + ' 的資料');
                        Util.returnUrl()
                    });
                }
            });
        }
    }
})();