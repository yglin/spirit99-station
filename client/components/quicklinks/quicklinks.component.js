/*
* @Author: yglin
* @Date:   2016-06-14 19:59:22
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-14 20:03:37
*/

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('s99Quicklinks',{
        templateUrl: 'components/quicklinks/quicklinks.tpl.html',
        controller: QuicklinksController,
        bindings: {
        }
    });

    QuicklinksController.$inject = [];

    /* @ngInject */
    function QuicklinksController() {
        var $ctrl = this;
        $ctrl.title = 'Quicklinks';

        $ctrl.$onInit = function () {
        };
    }
})();
