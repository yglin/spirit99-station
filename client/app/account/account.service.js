/*
* @Author: yglin
* @Date:   2016-06-01 11:13:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-25 20:47:17
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
        self.verifyDialog = verifyDialog;
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

        function verifyDialog() {
            if (!self.loginPromise || self.loginPromise.promise.$$state.status != 0) {
                self.loginPromise = $q.defer();
            }
            $mdDialog.show({
                templateUrl: 'app/account/signup/verify-dialog.tpl.html',
                controller: 'VerifyDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose: true,
                parent: angular.element(document.body)
            }).then(function (isVerified) {
                if (isVerified) {
                    self.loginPromise.resolve();
                }
            }, function () {
                self.loginPromise.reject();
            });
            return self.loginPromise.promise;
        }

        function try2Login() {
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
                    });
                }
            });

            return loggedIn.promise;            
        }

        function try2Verify() {
            var verified = $q.defer();
            
            Auth.getCurrentUser(function (user) {
                if (user.role == 'unverified') {
                    self.verifyDialog()
                    .then(function () {
                        verified.resolve();
                    }, function () {
                        verified.reject();
                    });
                }
                else {
                    verified.resolve();
                }
            });

            return verified.promise;
        }

        function try2Authorize(role) {
            var authorized = $q.defer();

            if (role) {
                Auth.hasRole(role, function (has) {
                    if (has) {
                        Auth.getCurrentUser(function (user) {
                            authorized.resolve(user);                        
                        });
                    }
                    else {
                        ygDialog.alert('權限不足', '<h3>抱歉，你沒有權限執行這項操作</h3>')
                        .then(function () {
                            authorized.reject();
                        });
                    }
                });
            }
            else {
                Auth.getCurrentUser(function (user) {
                    authorized.resolve(user);                        
                });
            }                    

            return authorized.promise;
        }


        function getToLogInAs(role) {
            return try2Login()
            .then(try2Verify)
            .then(function () {
                return try2Authorize(role);
            });
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