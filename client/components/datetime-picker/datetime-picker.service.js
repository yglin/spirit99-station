/*
* @Author: yglin
* @Date:   2016-06-02 17:50:57
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-02 17:58:13
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .service('DatetimePicker', DatetimePicker);

    DatetimePicker.$inject = ['$mdDialog'];

    /* @ngInject */
    function DatetimePicker($mdDialog) {
        var self = this;
        self.pickDatetime = pickDatetime;

        ////////////////

        function pickDatetime(datetime) {
            return $mdDialog.show({
                templateUrl: 'components/datetime-picker/datetime-picker.tpl.html',
                controller: 'DatetimePickerController',
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose: true,
                locals: {
                    datetime: datetime
                }               
            });
        }
    }
})();
