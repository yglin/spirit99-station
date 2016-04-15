(function() {
    'use strict';

    angular.module('spirit99StationApp.channel')
    .component('channelList',{
        templateUrl: 'app/channel/channel-list.tpl.html',
        controller: ChannelListController,
        bindings: {
        }
    });

    ChannelListController.$inject = ['$location', '$http'];

    /* @ngInject */
    function ChannelListController($location, $http) {
        var $ctrl = this;
        $ctrl.title = 'ChannelList';
        $ctrl.$onInit = onInit;
        $ctrl.gotoCreatePage = gotoCreatePage;

        function onInit () {
            $http.get('/api/channels')
            .then(function(response) {
                $ctrl.channels = response.data;
            }, function(error) {
                console.error(error);
            });
        }

        function gotoCreatePage () {
            $location.path('/channels/create');
        }

    }
})();
