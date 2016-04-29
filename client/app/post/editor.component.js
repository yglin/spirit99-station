/*
* @Author: yglin
* @Date:   2016-04-28 17:05:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-29 09:39:00
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.post')
    .component('s99PostEditor',{
        templateUrl: 'app/post/editor.tpl.html',
        controller: PostEditorController,
        bindings: {
            post: '=',
            channel: '<'
        }
    });

    PostEditorController.$inject = [];

    /* @ngInject */
    function PostEditorController() {
        var $ctrl = this;
        $ctrl.title = 'Post Editor';
        $ctrl.selectedCategoryID = -1;
        $ctrl.selectCategory = selectCategory;

        $ctrl.$onInit = function () {
            if ($ctrl.post.category && $ctrl.channel.categories[$ctrl.post.category]){
                var icon = $ctrl.channel.categories[$ctrl.post.category].icon;
                if (icon) {
                    $ctrl.post.icon = icon;
                }
            }
        };

        function selectCategory(id) {
            if (id == $ctrl.selectedCategoryID) {
                $ctrl.selectedCategoryID = -1;
            }
            else {
                $ctrl.selectedCategoryID = id;
                $ctrl.post.category = id;
                var icon = $ctrl.channel.categories[id].icon;
                if (icon) {
                    $ctrl.post.icon = icon;
                }
            }
        }
    }
})();