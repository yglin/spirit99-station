/*
* @Author: yglin
* @Date:   2016-04-02 11:15:22
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-14 20:39:16
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.channel')
        .controller('ChannelCreateController',ChannelCreateController);

    ChannelCreateController.$inject = ['$scope', '$http', '$mdDialog', '$httpParamSerializer'];

    /* @ngInject */
    function ChannelCreateController($scope, $http, $mdDialog, $httpParamSerializer) {
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
                url: 'http://icongal.com/gallery/image/460113/chartreuse_base_con_pixe_marker_map_outside_biswajit.png'
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
                template: '<s99st-image-selector max-width="64" max-height="64" max-size-mb="1"></s99st-image-selector>',
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
            $scope.$broadcast('channel:creation:categoriesChanged');
        }

        function updateCategory(index) {
            channelCreateVM.channel.categories[index] = channelCreateVM.category;
            $scope.$broadcast('channel:creation:categoriesChanged');
        }

        function deleteCategory(index) {
            channelCreateVM.channel.categories.splice(index, 1);
            channelCreateVM.selectedCategoryIndex = -1;
            channelCreateVM.category = angular.copy(categoryDefaults);
            $scope.$broadcast('channel:creation:categoriesChanged');
        }

        function create () {
            $http.post('/api/channels', channelCreateVM.channel)
            .then(onSccuess, onFail);
        }

        // function generateGoogleStaticMapUrl() {
        //     var params = {
        //         key: 'AIzaSyCewhA8IKkKYEWgW0e5bSThsw6sNKauliE',
        //         center: 'Taiwan',
        //         zoom: 7,
        //         size: '360x480',
        //         markers: []
        //     };
        //     var markers = [];
        //     for (var i = 0; i < channelCreateVM.channel.categories.length; i++) {
        //         var category = channelCreateVM.channel.categories[i];
        //         var markersDescriptor = 'icon:' + 'category-' + i + '-icon-url';
        //         for (var j=0; j<3; j++) {
        //             markersDescriptor += '|' + (23.973875 + (Math.random() - 0.5) * 2.0) + ',' + (120.982024 + (Math.random() - 0.5) * 2.0);
        //         }
        //         params.markers.push(markersDescriptor);
        //     }
        //     var queryString = $httpParamSerializer(params);
        //     for (var i = 0; i < channelCreateVM.channel.categories.length; i++) {
        //         queryString = queryString.replace('category-' + i + '-icon-url', channelCreateVM.channel.categories[i].icon.url);
        //     }
        //     return 'https://maps.googleapis.com/maps/api/staticmap?' + queryString;
        // }
    }
})();