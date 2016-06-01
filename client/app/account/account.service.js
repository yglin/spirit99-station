/*
* @Author: yglin
* @Date:   2016-06-01 11:13:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-01 20:53:14
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .service('Account', Account);

    Account.$inject = ['$rootScope', 'Auth', '$mdDialog', 'ygDialog'];

    /* @ngInject */
    function Account($rootScope, Auth, $mdDialog, ygDialog) {
        var self = this;
        self.loginDialog = loginDialog;
        self.logoutDialog = logoutDialog;

        ////////////////

        function loginDialog() {
            return $mdDialog.show({
                templateUrl: 'app/account/login/login-dialog.tpl.html',
                controller: 'LoginDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose:true,
                parent: angular.element(document.body)
            });
        }

        function logoutDialog() {
            ygDialog.confirm('登出', '<h3>確定要登出嗎？</h3>')
            .then(function () {
                Auth.logout();
            });            
        }
    }
})();