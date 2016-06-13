/*
* @Author: yglin
* @Date:   2016-06-01 11:13:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-13 16:52:19
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
        self.getToLogInAs = getToLogInAs;
        self.changePassword = changePassword;

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

        function getToLogInAs(role) {
            var authorized = $q.defer();
            var loggedIn = $q.defer();;
            
            Auth.isLoggedIn(function (isLoggedIn) {
                if (isLoggedIn) {
                    loggedIn.resolve();
                }
                else {
                    self.loginDialog()
                    .then(function () {
                        loggedIn.resolve();
                    }, function () {
                        loggedIn.reject();
                        authorized.reject();
                    });
                }
            });

            loggedIn.promise.then(function () {
                Auth.getCurrentUser(function (user) {
                    if (role) {
                        if (Auth.hasRole(role)) {
                            authorized.resolve(user);
                        }
                        else {
                            ygDialog.alert('權限不足', '<h3>抱歉，你沒有權限執行這項操作</h3>')
                            .then(function () {
                                authorized.reject();
                            });
                        }
                    }
                    else {
                        authorized.resolve(user);
                    }                    
                });
            });
            
            return authorized.promise;
        }

        function changePassword() {
            $mdDialog.show({
                templateUrl: 'app/account/settings/change-password-dialog.tpl.html',
                controller: 'ChangePasswordDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose: true,
                parent: angular.element(document.body)
            });
        }
    }
})();