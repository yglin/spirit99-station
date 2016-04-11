/*
* @Author: yglin
* @Date:   2016-04-02 11:15:22
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-02 15:12:55
*/

'use strict';

(function () {
    'use strict';

    angular.module('spirit99StationApp.channel').controller('ChannelCreateController', ChannelCreateController);

    ChannelCreateController.$inject = ['$http'];

    /* @ngInject */
    function ChannelCreateController($http) {
        var channelCreateVM = this;
        channelCreateVM.title = 'ChannelCreate';
        channelCreateVM.channel = {};
        channelCreateVM.create = create;
        channelCreateVM.message = {
            show: false,
            text: ''
        };

        activate();

        ////////////////

        function activate() {}

        function onSccuess() {
            channelCreateVM.message.show = true;
            channelCreateVM.message.text = '新頻道開張~!!';
        }

        function onFail(error) {
            channelCreateVM.message.show = true;
            channelCreateVM.message.text = '新增頻道失敗...';
        }

        function create() {
            $http.post('/api/channels', channelCreateVM.channel).then(onSccuess, onFail);
        }
    }
})();
//# sourceMappingURL=channel-create.controller.js.map
