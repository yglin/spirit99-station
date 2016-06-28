/*
* @Author: yglin
* @Date:   2016-06-01 11:20:39
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-28 12:11:45
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('LoginDialogController', LoginDialogController);

    LoginDialogController.$inject = ['$scope', '$mdDialog', 'Auth', 'Account'];

    /* @ngInject */
    function LoginDialogController($scope, $mdDialog, Auth, Account) {
        var $ctrl = this;
        $ctrl.title = '登入';
        $ctrl.user = {};
        $ctrl.submitted = false;
        $ctrl.loginFailed = false;
        $ctrl.serverErrors = {};

        $ctrl.login = login;
        $ctrl.cancel = cancel;
        $ctrl.gotoSignup = Account.signupDialog;

        activate();

        ////////////////

        function activate() {
            $scope.$on('account:login', function () {
                $mdDialog.hide(true);
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function login(form) {
            $ctrl.submitted = true;
            $ctrl.loginFailed = false;
            $ctrl.serverErrors = {};

            if (form.$valid) {
                $ctrl.isLoggingIn = true;
                Auth.login({
                    email: $ctrl.user.email,
                    password: $ctrl.user.password
                })
                .then(function (user) {
                    $mdDialog.hide(true);
                })
                .finally(function () {
                    $ctrl.isLoggingIn = false;
                })
                .catch(function (err) {
                    $ctrl.loginFailed = true;
                    if (err.fields) {
                        angular.forEach(err.fields, function(message, field) {
                            form[field].$setValidity('server', false);
                            $ctrl.serverErrors[field] = message;
                        });
                    }
                    else {
                        console.error(err);
                    }
                });
            }
        }
    }
})();
