/*
* @Author: yglin
* @Date:   2016-06-01 11:20:39
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-01 11:28:32
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('LoginDialogController', LoginDialogController);

    LoginDialogController.$inject = ['$scope', '$mdDialog'];

    /* @ngInject */
    function LoginDialogController($scope, $mdDialog) {
        var $ctrl = this;
        $ctrl.title = 'LoginDialog';

        activate();

        ////////////////

        function activate() {
            $scope.$on('account:login', function () {
                $mdDialog.hide();
            });
        }
    }
})();
