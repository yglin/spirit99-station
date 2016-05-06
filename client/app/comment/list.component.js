/*
* @Author: yglin
* @Date:   2016-05-05 17:25:15
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-06 17:28:35
*/

'use strict';

(function() {
    angular.module('spirit99StationApp.comment')
    .component('s99CommentList',{
        templateUrl: 'app/comment/list.tpl.html',
        controller: CommentListController,
        bindings: {
            channel: '<',
            post: '<'
        }
    });

    CommentListController.$inject = ['$scope', 'Comment'];

    /* @ngInject */
    function CommentListController($scope, Comment) {
        var $ctrl = this;
        $ctrl.title = 'Comment List';
        $ctrl.comments = [];

        var listeners = [];

        $ctrl.$onInit = function () {
            Comment.query($ctrl.channel.id, $ctrl.post._id)
            .then(function (comments) {
                Array.prototype.push.apply($ctrl.comments, comments);
            })

            listeners.push(
                $scope.$on('comment:created',
                function (event, newComment) {
                    $ctrl.comments.push(newComment);
            }));
        };

        $ctrl.onDestroy = function () {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        }
    }
})();