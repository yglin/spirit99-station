/*
* @Author: yglin
* @Date:   2016-06-13 14:08:52
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-13 14:12:41
*/

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('s99MySettings',{
        templateUrl: 'app/account/settings/my-settings.tpl.html',
        controller: MySettingsController,
        bindings: {
            user: '<'
        }
    });

    MySettingsController.$inject = [];

    /* @ngInject */
    function MySettingsController() {
        var $ctrl = this;
        $ctrl.title = 'MySettings';

        $ctrl.$onInit = function () {
        };
    }
})();
