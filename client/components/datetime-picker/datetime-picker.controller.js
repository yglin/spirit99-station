/*
* @Author: yglin
* @Date:   2016-06-02 17:50:41
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-02 18:14:04
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('DatetimePickerController', DatetimePickerController);

    DatetimePickerController.$inject = ['$mdDialog'];

    /* @ngInject */
    function DatetimePickerController($mdDialog, datetime) {
        var $ctrl = this;
        $ctrl.title = '選擇日期與時間';
        $ctrl.datetime = moment(datetime);

        $ctrl.cancel = cancel;
        $ctrl.confirm = confirm;

        activate();

        ////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function confirm() {
            $mdDialog.hide($ctrl.datetime.toDate());
        }
    }
})();
