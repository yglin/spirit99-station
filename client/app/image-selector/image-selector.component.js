/*
* @Author: yglin
* @Date:   2016-04-12 16:54:01
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 17:32:12
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('s99stImageSelector',{
        templateUrl: 'app/image-selector/image-selector.tpl.html',
        controller: ImageSelectorController,
        bindings: {
        }
    });

    ImageSelectorController.$inject = ['$mdDialog'];

    /* @ngInject */
    function ImageSelectorController($mdDialog) {
        var $ctrl = this;
        $ctrl.title = '選擇圖片';
        $ctrl.cancel = cancel;
        $ctrl.confirm = confirm;
        $ctrl.image = {
            url: ''
        };

        $ctrl.$onInit = function () {
        };

        function cancel() {
            $mdDialog.cancel();
        }

        function confirm() {
            $mdDialog.hide($ctrl.image.url);
        }
    }
})();
