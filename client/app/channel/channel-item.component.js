/*
* @Author: yglin
* @Date:   2016-04-12 15:09:47
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-20 14:59:24
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
        // console.log($ctrl.onClick);
    }
})();