/*
* @Author: yglin
* @Date:   2016-04-02 11:15:22
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-02 11:13:38
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.channel')
        .controller('ChannelCreateController',ChannelCreateController);

    ChannelCreateController.$inject = ['$scope', '$window', '$location', 'Channel'];

    /* @ngInject */
    function ChannelCreateController($scope, $window, $location, Channel) {
        var $ctrl = this;
        $ctrl.create = create;
        $ctrl.channel = {
            categories: {}
        };

        activate();

        function activate() {
            $scope.$on('account:logout', function () {
                $location.path('/'); 
            });
        }

        function create (channelData) {
            return Channel.create(channelData)
            .then(function(response) {
                $window.alert('新增成功！');
                $location.path('/channels');
            }, function (error) {
                $window.alert('新增失敗');
                console.error(error);
            });
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