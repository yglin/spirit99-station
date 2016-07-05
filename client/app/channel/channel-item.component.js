/*
* @Author: yglin
* @Date:   2016-04-12 15:09:47
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-05 17:26:06
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.channel')
    .component('channelItem',{
        templateUrl: 'app/channel/channel-item.tpl.html',
        controller: ChannelItemController,
        bindings: {
            channel: '=',
            onClick: '&'
        }
    });

    ChannelItemController.$inject = [];

    /* @ngInject */
    function ChannelItemController() {
        var $ctrl = this;
        $ctrl.title = 'ChannelItem';
        console.log($ctrl.onClick);
    }
})();