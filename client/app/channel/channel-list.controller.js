/*
* @Author: yglin
* @Date:   2016-04-22 10:51:05
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-22 11:31:57
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.channel')
        .controller('ChannelListController', ChannelListController);

    ChannelListController.$inject = ['$location', '$http', 'channels'];

    /* @ngInject */
    function ChannelListController($location, $http, channels) {
        var $ctrl = this;
        $ctrl.title = 'Channel List';
        $ctrl.channels = channels;
        $ctrl.$onInit = onInit;
        $ctrl.gotoCreatePage = gotoCreatePage;

        function onInit () {
        }

        function gotoCreatePage () {
            $location.path('/channels/create');
        }

    }
})();