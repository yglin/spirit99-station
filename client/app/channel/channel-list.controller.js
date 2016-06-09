/*
* @Author: yglin
* @Date:   2016-04-22 10:51:05
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-08 16:38:10
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.channel')
        .controller('ChannelListController', ChannelListController);

    ChannelListController.$inject = ['$location', '$http', 'Channel'];

    /* @ngInject */
    function ChannelListController($location, $http, Channel) {
        var $ctrl = this;
        $ctrl.title = 'Channel List';
        $ctrl.channels = [];
        $ctrl.gotoCreatePage = gotoCreatePage;

        activate();

        function activate () {
            Channel.query()
            .then(function (channels) {
                angular.extend($ctrl.channels, channels);
            });
        }

        function gotoCreatePage () {
            $location.path('/channels/create');
        }

    }
})();