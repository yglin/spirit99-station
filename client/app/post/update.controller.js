/*
* @Author: yglin
* @Date:   2016-05-03 19:53:57
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-03 13:40:25
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.post')
        .controller('PostUpdateController', PostUpdateController);

    PostUpdateController.$inject = ['$location', 'Util', '$routeParams', 'Auth', 'Channel', 'Post', 'ygDialog'];

    /* @ngInject */
    function PostUpdateController($location, Util, $routeParams, Auth, Channel, Post, ygDialog) {
        var $ctrl = this;
        $ctrl.title = 'Post Update View';
        $ctrl.channel = undefined;
        $ctrl.post = undefined;
        $ctrl.update = update;

        activate();

        ////////////////

        function activate() {
            if (!$routeParams.channel_id || !$routeParams.post_id) {
                ygDialog.alert('網址錯誤', '<h3>網址中未指定頻道ID或文章ID</h3><br><p>' + $location.absUrl() + '</p>')
                .then(function () {
                    Util.returnUrl();                
                });
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
                            console.error(error);
                            ygDialog.alert('找不到文章', '<h3>找不到文章，或是你沒有權限修改，錯誤回應：</h3><br><p>' + JSON.stringify(error) + '</p>')
                            .then(function () {
                                Util.returnUrl();
                            });
                        });
                    }, function (error) {
                        console.error(error);
                        ygDialog.alert('找不到頻道', '<h3>找不到頻道 ' + $routeParams.channel_id + ' 的資料，錯誤回應：</h3><br><p>' + JSON.stringify(error) + '</p>')
                        .then(function () {
                            Util.returnUrl();
                        });
                    });
                }
            });
        }

        function update(data) {
            return Post.update($routeParams.channel_id, $routeParams.post_id, data)
            .then(function () {
                ygDialog.prompt('<h3>修改完成~!!</h3>')
                .then(function () {
                    Util.returnUrl('/' + $routeParams.channel_id + '/posts/' + $routeParams.post_id);
                });
            }, function (error) {
                console.error(error);
                ygDialog.alert('修改失敗', '<h3>修改文章失敗...，錯誤回應：</h3><br><p>' + JSON.stringify(error) + '</p>');
            })
        }
    }
})();