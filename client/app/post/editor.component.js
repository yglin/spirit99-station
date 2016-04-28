/*
* @Author: yglin
* @Date:   2016-04-28 17:05:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 17:38:46
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.post')
    .component('s99PostEditor',{
        templateUrl: 'app/post/editor.tpl.html',
        controller: PostEditorController,
        bindings: {
            post: '='
        }
    });

    PostEditorController.$inject = [];

    /* @ngInject */
    function PostEditorController() {
        var $ctrl = this;
        $ctrl.title = 'Post Editor';

        $ctrl.$onInit = function () {
        };
    }
})();