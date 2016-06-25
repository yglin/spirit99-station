/*
* @Author: yglin
* @Date:   2016-06-25 13:19:45
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-25 20:30:36
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('VerifyDialogController', VerifyDialogController);

    VerifyDialogController.$inject = ['$mdDialog', 'Auth'];

    /* @ngInject */
    function VerifyDialogController($mdDialog, Auth) {
        var $ctrl = this;
        $ctrl.title = '完成認證';
        $ctrl.emails = undefined;
        $ctrl.verifyCode = undefined;
        $ctrl.emailsSent = false;
        $ctrl.isSendingEmail = false;
        $ctrl.errorMessage = undefined;

        $ctrl.cancel = cancel;
        $ctrl.confirm = confirm;
        $ctrl.sendVerifyEmail = sendVerifyEmail;

        activate();

        ////////////////

        function activate() {
            $ctrl.isSendingEmail = true;
            Auth.sendVerifyEmail()
            .then(function (emails) {
                $ctrl.emails = emails;
                $ctrl.emailsSent = true;
            }, function (error) {
                $ctrl.errorMessage = JSON.stringify(error);
            })
            .finally(function () {
                $ctrl.isSendingEmail = false;
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function confirm() {
            Auth.verify($ctrl.verifyCode)
            .then(function () {
                $mdDialog.hide(true);
            }, function (error) {
                $ctrl.errorMessage = JSON.stringify(error);
            });
        }

        function sendVerifyEmail() {

        }
    }
})();
