/*
* @Author: yglin
* @Date:   2016-04-21 13:25:23
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-21 13:52:37
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.channel')
        .controller('ChannelUpdateController', ChannelUpdateController);

    ChannelUpdateController.$inject = ['$scope', '$http', '$timeout', '$location', '$mdDialog', '$httpParamSerializer', 'ImageSelector'];

    /* @ngInject */
    function ChannelUpdateController($scope, $http, $timeout, $location, $mdDialog, $httpParamSerializer, ImageSelector) {
        var $ctrl = this;
        $ctrl.title = 'Update Channel';

        activate();

        ////////////////

        function activate() {
        }
    }
})();
