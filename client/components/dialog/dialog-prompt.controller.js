/*
* @Author: yglin
* @Date:   2016-06-03 11:36:40
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-03 11:39:55
*/

(function() {
    'use strict';

    angular
        .module('ygDialog')
        .controller('DialogPromptController', DialogPromptController);

    DialogPromptController.$inject = ['$mdDialog'];

    /* @ngInject */
    function DialogPromptController($mdDialog) {
        var $ctrl = this;
        $ctrl.title = 'DialogPrompt';
        $ctrl.confirm = confirm;

        activate();

        ////////////////

        function activate() {
        }

        function confirm() {
            $mdDialog.hide();
        }
    }
})();
