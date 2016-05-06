/*
* @Author: yglin
* @Date:   2016-05-05 17:07:51
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-06 17:30:09
*/

'use strict';

(function() {

    angular.module('spirit99StationApp.comment')
    .component('s99CommentCreate',{
        templateUrl: 'app/comment/create.tpl.html',
        controller: CommentCreateController,
        bindings: {
            channel: '<',
            post: '<'
        }
    });

    CommentCreateController.$inject = ['$scope', '$window', 'Auth', 'Comment'];

    /* @ngInject */
    function CommentCreateController($scope, $window, Auth, Comment) {
        var $ctrl = this;
        $ctrl.title = 'Comment Create';
        $ctrl.comment = {};
        $ctrl.doSubmit = doSubmit;

        $ctrl.$onInit = function () {
            Auth.getCurrentUser(function (user) {
                if (user.email) {
                    $ctrl.comment.author = user.email;
                }
            });
        };

        function doSubmit(data) {
            $ctrl.processingSubmit = true;
            Comment.create($ctrl.channel.id, $ctrl.post._id, data)
            .then(function (newComment) {
                $window.alert('留言成功~!!');
                $scope.$emit('comment:created', newComment);
                $ctrl.comment = {};
            }, function (error) {
                $window.alert('留言失敗...請稍候再試');
            })
            .finally(function () {
                $ctrl.processingSubmit = false;
            })
        }
    }
})();