/*
* @Author: yglin
* @Date:   2016-06-13 16:42:07
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-13 17:39:10
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('ChangePasswordDialogController', ChangePasswordDialogController);

    ChangePasswordDialogController.$inject = ['$mdDialog', 'Auth', 'ygDialog'];

    /* @ngInject */
    function ChangePasswordDialogController($mdDialog, Auth, ygDialog) {
        var $ctrl = this;
        $ctrl.title = '更改密碼';
        $ctrl.errors = {};

        $ctrl.cancel = cancel;
        $ctrl.changePassword = changePassword;

        activate();

        ////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function changePassword(form) {
            if (form.$valid) {
                Auth.changePassword($ctrl.user.oldPassword, $ctrl.user.newPassword)
                .then(
                function() {
                    ygDialog.prompt('<h3>修改密碼完成~</h3>');
                }, 
                function(err) {
                    var errors = err.data;
                    if (errors.oldPassword) {
                        form.password.$setValidity('server', false);
                        $ctrl.errors.password = '密碼錯誤';
                    }
                    if (errors.newPassword) {
                        form.newPassword.$setValidity('server', false);
                        $ctrl.errors.newPassword = errors.newPassword;
                    }
                    // form.password.$setValidity('mongoose', false);
                    // this.errors.other = 'Incorrect password';
                    // this.message = '';
                });
            }
        }
    }
})();
