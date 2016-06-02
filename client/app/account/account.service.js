/*
* @Author: yglin
* @Date:   2016-06-01 11:13:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-02 11:29:14
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .service('Account', Account);

    Account.$inject = ['$rootScope', '$q', 'Auth', '$mdDialog', 'ygDialog'];

    /* @ngInject */
    function Account($rootScope, $q, Auth, $mdDialog, ygDialog) {
        var self = this;
        self.loginPromise = null;
        self.loginDialog = loginDialog;
        self.logoutDialog = logoutDialog;
        self.signupDialog = signupDialog;

        ////////////////

        function loginDialog() {
            if (!self.loginPromise || self.loginPromise.promise.$$state.status != 0) {
                self.loginPromise = $q.defer();
            }
            $mdDialog.show({
                templateUrl: 'app/account/login/login-dialog.tpl.html',
                controller: 'LoginDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose:true,
                parent: angular.element(document.body)
            }).then(function (isLoggedIn) {
                if (isLoggedIn) {
                    self.loginPromise.resolve();
                }
            }, function () {
                self.loginPromise.reject();
            });
            return self.loginPromise.promise;
        }

        function logoutDialog() {
            ygDialog.confirm('登出', '<h3>確定要登出嗎？</h3>')
            .then(function () {
                Auth.logout(function () {
                    self.loginPromise = null;
                });
            });            
        }

        function signupDialog() {
            if (!self.loginPromise || self.loginPromise.promise.$$state.status != 0) {
                self.loginPromise = $q.defer();
            }
            $mdDialog.show({
                templateUrl: 'app/account/signup/signup-dialog.tpl.html',
                controller: 'SignupDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose: true,
                parent: angular.element(document.body)
            }).then(function (isLoggedIn) {
                if (isLoggedIn) {
                    self.loginPromise.resolve();
                }
            }, function () {
                self.loginPromise.reject();
            });
            return self.loginPromise.promise;
        }
    }
})();