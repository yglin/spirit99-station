/*
* @Author: yglin
* @Date:   2016-06-02 10:03:19
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-25 15:04:08
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('SignupDialogController', SignupDialogController);

    SignupDialogController.$inject = ['$scope', 'Auth', '$mdDialog', 'Account'];

    /* @ngInject */
    function SignupDialogController($scope, Auth, $mdDialog, Account) {
        var $ctrl = this;
        $ctrl.title = '註冊';
        $ctrl.user = {};
        $ctrl.errors = {};
        $ctrl.submitted = false;

        $ctrl.cancel = cancel;
        $ctrl.register = register;
        $ctrl.gotoLogin = Account.loginDialog;

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

        function register(form) {
            $ctrl.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                    name: $ctrl.user.name,
                    email: $ctrl.user.email,
                    password: $ctrl.user.password
                }, function (user) {
                    $mdDialog.hide(true);
                })
                .catch(function(err) {
                    err = err.data;
                    // Update validity of form fields that match the sequelize errors
                    if (err.name) {
                        angular.forEach(err.fields, function(field) {
                            form[field].$setValidity('server', false);
                            $ctrl.errors[field] = err.message;
                        });
                    }
                });
            }
        }
    }
})();
