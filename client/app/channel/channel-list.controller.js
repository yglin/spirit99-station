/*
* @Author: yglin
* @Date:   2016-04-22 10:51:05
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-05 17:19:16
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.channel')
        .controller('ChannelListController', ChannelListController);

    ChannelListController.$inject = ['appConfig', '$window', '$location', '$http', 'Channel', 'ygDialog'];

    /* @ngInject */
    function ChannelListController(appConfig, $window, $location, $http, Channel, ygDialog) {
        var $ctrl = this;
        $ctrl.title = 'Channel List';
        $ctrl.channels = [];
        $ctrl.gotoCreatePage = gotoCreatePage;
        $ctrl.import = _import;

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

        function _import(channel_id) {
            ygDialog.confirm('匯入頻道', '匯入頻道至' + appConfig.spirit99Url + '?')
            .then(function () {
                $window.open(Channel.getImportUrl(channel_id), 'spirit99').focus();
            });
        }

    }
})();