(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('channelList',{
        templateUrl: 'app/channel/channel-list.tpl.html',
        controller: ChannelListController,
        bindings: {
        }
    });

    ChannelListController.$inject = ['$location'];

    /* @ngInject */
    function ChannelListController($location) {
        var $ctrl = this;
        $ctrl.title = 'ChannelList';
        $ctrl.$onInit = onInit;
        $ctrl.gotoCreatePage = gotoCreatePage;

        function onInit () {
        }

        function gotoCreatePage () {
            $location.path('/channels/create');
        }

    }
})();
