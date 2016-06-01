/*
* @Author: yglin
* @Date:   2016-06-01 11:20:39
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-01 21:04:14
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('LoginDialogController', LoginDialogController);

    LoginDialogController.$inject = ['$scope', '$mdDialog', 'Auth'];

    /* @ngInject */
    function LoginDialogController($scope, $mdDialog, Auth) {
        var $ctrl = this;
        $ctrl.title = '登入';
        $ctrl.user = {};
        $ctrl.errors = {};
        $ctrl.submitted = false;

        $ctrl.login = login;
        $ctrl.cancel = cancel;

        activate();

        ////////////////

        function activate() {
            $scope.$on('account:login', function () {
                $mdDialog.hide();
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function login(form) {
            $ctrl.submitted = true;
            $ctrl.errors.other = null;

            if (form.$valid) {
                Auth.login({
                    email: $ctrl.user.email,
                    password: $ctrl.user.password
                })
                .catch(function (err) {
                    $ctrl.errors.other = err.message;
                });
            }
        }

    }
})();
