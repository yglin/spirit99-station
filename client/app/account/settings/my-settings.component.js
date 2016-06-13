/*
* @Author: yglin
* @Date:   2016-06-13 14:08:52
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-13 16:53:12
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

    MySettingsController.$inject = ['Account'];

    /* @ngInject */
    function MySettingsController(Account) {
        var $ctrl = this;
        $ctrl.title = 'MySettings';

        $ctrl.changePassword = Account.changePassword;

        $ctrl.$onInit = function () {
        };
    }
})();
