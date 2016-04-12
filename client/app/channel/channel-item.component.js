/*
* @Author: yglin
* @Date:   2016-04-12 15:09:47
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 15:16:42
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('channelItem',{
        templateUrl: 'app/channel/channel-item.tpl.html',
        controller: ChannelItemController,
        bindings: {
            channel: '='
        }
    });

    ChannelItemController.$inject = [];

    /* @ngInject */
    function ChannelItemController() {
        var $ctrl = this;
        $ctrl.title = 'ChannelItem';

        $ctrl.$onInit = function () {
        };
    }
})();