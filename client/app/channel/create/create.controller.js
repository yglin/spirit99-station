/*
* @Author: yglin
* @Date:   2016-04-02 11:15:22
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 17:08:40
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.channel')
        .controller('ChannelCreateController',ChannelCreateController);

    ChannelCreateController.$inject = ['$http', '$mdDialog'];

    /* @ngInject */
    function ChannelCreateController($http, $mdDialog) {
        var channelCreateVM = this;
        channelCreateVM.title = 'ChannelCreate';
        channelCreateVM.channel = {};
        channelCreateVM.assignLogo = assignLogo;
        channelCreateVM.create = create;
        channelCreateVM.message = {
            show: false,
            text: ''
        };

        activate();

        ////////////////

        function activate() {
        }

        function onSccuess () {
            channelCreateVM.message.show = true;
            channelCreateVM.message.text = '新頻道開張~!!';
        }

        function onFail (error) {
            channelCreateVM.message.show = true;
            channelCreateVM.message.text = '新增頻道失敗...';
        }

        function create () {
            $http.post('/api/channels', channelCreateVM.channel)
            .then(onSccuess, onFail);
        }

        function assignLogo() {
            $mdDialog.show({
                template: '<s99st-image-selector></s99st-image-selector>',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            })
            .then(function(imgUrl) {
                channelCreateVM.channel['logo-url'] = imgUrl;
            });
        }
    }
})();