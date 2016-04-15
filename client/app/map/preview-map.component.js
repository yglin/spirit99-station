/*
* @Author: yglin
* @Date:   2016-04-14 16:52:30
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-15 11:38:23
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.map')
    .component('previewMap',{
        templateUrl: 'app/map/preview-map.tpl.html',
        controller: PreviewMapController,
        bindings: {
            width: '@',
            height: '@',
            categories: '='
        }
    });

    PreviewMapController.$inject = ['$scope'];

    /* @ngInject */
    function PreviewMapController($scope) {
        var $ctrl = this;
        $ctrl.title = 'PreviewMap';
        $ctrl.map = {
            center: {
                latitude: 23.973875,
                longitude: 120.982024
            },
            zoom: 7,
            bounds: {}
        };
        $ctrl.markers = [];

        $ctrl.$onInit = function () {
            $scope.$on('channel:creation:categoriesChanged', function() {
                rebuildMarkers();
            })
        };

        function rebuildMarkers() {
            $ctrl.markers.length = 0;
            var markerID = 0;
            var latitudeSpan = Math.abs($ctrl.map.bounds.northeast.latitude - $ctrl.map.bounds.southwest.latitude);
            var longitudeSpan = Math.abs($ctrl.map.bounds.northeast.longitude - $ctrl.map.bounds.southwest.longitude);
            for (var i = 0; i < $ctrl.categories.length; i++) {
                var category = $ctrl.categories[i];
                if (category.icon && category.icon.url) {
                    var addCount = 2 + Math.floor(Math.random() * 4);
                    for (var j = 0; j < addCount; j++) {
                        $ctrl.markers.push({
                            id: markerID,
                            latitude: $ctrl.map.center.latitude + (Math.random() - 0.5) * latitudeSpan,
                            longitude: $ctrl.map.center.longitude + (Math.random() - 0.5) * longitudeSpan,
                            icon: category.icon.url
                        });
                        markerID += 1;                        
                    }
                }
            }
            console.log($ctrl.markers);
        }
    }
})();