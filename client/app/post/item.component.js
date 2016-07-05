/*
* @Author: yglin
* @Date:   2016-04-28 17:50:10
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-05 13:32:28
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.post')
    .component('s99PostItem',{
        templateUrl: 'app/post/item.tpl.html',
        controller: PostItemController,
        bindings: {
            post: '=',
            link: '<'
        }
    });

    PostItemController.$inject = ['$window'];

    /* @ngInject */
    function PostItemController($window) {
        var $ctrl = this;
        $ctrl.title = 'PostItem';

        $ctrl.getHeaderTextFromHtml = getHeaderTextFromHtml;
        $ctrl.gotoView = gotoView;

        $ctrl.$onInit = function () {
        };

        function getHeaderTextFromHtml(html, length) {
            return html ? String(html).replace(/<[^>]+>/gm, '').substr(0, length) + ' ...' : '';
        }

        function gotoView() {
            if ($ctrl.link) {
                $window.location.href = $ctrl.link;
            }
        }
    }
})();