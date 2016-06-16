/*
* @Author: yglin
* @Date:   2016-04-12 15:09:47
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-16 10:37:03
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.channel')
    .component('channelItem',{
        templateUrl: 'app/channel/channel-item.tpl.html',
        controller: ChannelItemController,
        bindings: {
            channel: '='
        }
    });

    ChannelItemController.$inject = ['appConfig', '$window', 'ygDialog', 'Channel'];

    /* @ngInject */
    function ChannelItemController(appConfig, $window, ygDialog, Channel) {
        var $ctrl = this;
        $ctrl.title = 'ChannelItem';
        $ctrl.import = _import;

        $ctrl.$onInit = function () {
        };

        function _import() {
            ygDialog.confirm('匯入頻道', '匯入頻道至' + appConfig.spirit99Url + '?')
            .then(function () {
                $window.open(Channel.getImportUrl($ctrl.channel.id));
            })
        }
    }
})();