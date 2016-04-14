/*
* @Author: yglin
* @Date:   2016-04-02 11:15:22
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-14 11:52:45
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
        channelCreateVM.channelIDPattern = /^[A-Z]\w+$/i;
        channelCreateVM.channel = {};
        channelCreateVM.message = {
            show: false,
            text: ''
        };
        channelCreateVM.assignLogo = assignLogo;
        channelCreateVM.selectCategory = selectCategory;
        channelCreateVM.selectCategoryIcon = selectCategoryIcon;
        channelCreateVM.addCategory = addCategory;
        channelCreateVM.updateCategory = updateCategory;
        channelCreateVM.deleteCategory = deleteCategory;
        channelCreateVM.create = create;

        var categoryDefaults = {
            icon: {
                url: 'https://cdn3.iconfinder.com/data/icons/shopping-and-market/512/pin_marker_location_mark_navigation_flat_icon-256.png'
            }
        };

        activate();

        ////////////////

        function activate() {
            channelCreateVM.channel.categories = [];
            channelCreateVM.channel['logo-url'] = 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Electromagnetic_radiation.png';
            channelCreateVM.category = angular.copy(categoryDefaults);
        }

        function onSccuess () {
            channelCreateVM.message.show = true;
            channelCreateVM.message.text = '新頻道開張~!!';
        }

        function onFail (error) {
            channelCreateVM.message.show = true;
            channelCreateVM.message.text = '新增頻道失敗...';
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

        function selectCategory(index) {
            if (channelCreateVM.selectedCategoryIndex == index) {
                channelCreateVM.selectedCategoryIndex = -1;
                channelCreateVM.category = angular.copy(categoryDefaults);
            }
            else {
                channelCreateVM.selectedCategoryIndex = index;
                channelCreateVM.category = angular.copy(channelCreateVM.channel.categories[index]);
            }
        }

        function selectCategoryIcon() {
            $mdDialog.show({
                template: '<s99st-image-selector></s99st-image-selector>',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            })
            .then(function(imgUrl) {
                channelCreateVM.category.icon = {
                    url: imgUrl
                };
            });            
        }

        function addCategory() {
            channelCreateVM.channel.categories.push(channelCreateVM.category);
            channelCreateVM.category = angular.copy(categoryDefaults);
        }

        function updateCategory(index) {
            channelCreateVM.channel.categories[index] = channelCreateVM.category;
        }

        function deleteCategory(index) {
            channelCreateVM.channel.categories.splice(index, 1);
            channelCreateVM.selectedCategoryIndex = -1;
            channelCreateVM.category = angular.copy(categoryDefaults);
        }

        function create () {
            $http.post('/api/channels', channelCreateVM.channel)
            .then(onSccuess, onFail);
        }
    }
})();