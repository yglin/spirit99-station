/*
* @Author: yglin
* @Date:   2016-04-28 17:50:10
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 18:25:27
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.post')
    .component('s99PostItem',{
        templateUrl: 'app/post/post-item.tpl.html',
        controller: PostItemController,
        bindings: {
            post: '='
        }
    });

    PostItemController.$inject = [];

    /* @ngInject */
    function PostItemController() {
        var $ctrl = this;
        $ctrl.title = 'PostItem';

        $ctrl.getHeaderTextFromHtml = getHeaderTextFromHtml;

        $ctrl.$onInit = function () {
        };

        function getHeaderTextFromHtml(html, length) {
            return html ? String(html).replace(/<[^>]+>/gm, '').substr(0, length) + ' ...' : '';
        }

    }
})();