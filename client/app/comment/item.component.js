/*
* @Author: yglin
* @Date:   2016-05-05 17:31:07
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-05 17:33:06
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.comment')
    .component('s99CommentItem',{
        templateUrl: 'app/comment/item.tpl.html',
        controller: CommentItemController,
        bindings: {
            comment: '='
        }
    });

    CommentItemController.$inject = [];

    /* @ngInject */
    function CommentItemController() {
        var $ctrl = this;
        $ctrl.title = 'Comment Item ' + $ctrl.comment._id;

        $ctrl.$onInit = function () {
        };
    }
})();
