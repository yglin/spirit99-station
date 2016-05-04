/*
* @Author: yglin
* @Date:   2016-04-14 16:52:30
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-03 18:01:20
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.map')
    .component('s99PreviewMap',{
        templateUrl: 'components/map/preview-map.tpl.html',
        controller: PreviewMapController,
        bindings: {
            width: '@',
            height: '@',
            channel: '='
        }
    });

    PreviewMapController.$inject = ['$scope', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function PreviewMapController($scope, uiGmapGoogleMapApi) {
        var $ctrl = this;
        $ctrl.title = 'PreviewMap';
        $ctrl.map = {
            center: {
                latitude: 23.973875,
                longitude: 120.982024
            },
            zoom: 7,
            bounds: {
                northeast: {
                    latitude: 24.973875,
                    longitude: 121.982024
                },
                southwest: {
                    latitude: 22.973875,
                    longitude: 119.982024
                }
            }
        };
        $ctrl.markers = [];
        $ctrl.showMap = false;

        var listeners = [];
        var gMapsApi = null

        $ctrl.$onInit = function () {
            uiGmapGoogleMapApi.then(function (googleMapsApi) {
                gMapsApi = googleMapsApi;
                rebuildMarkers();
                listeners.push($scope.$on('categoriesChanged', function() {
                    rebuildMarkers();
                }));
                $ctrl.showMap = true;
            });
        };

        $ctrl.$onDestroy = function () {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        };

        function buildIcon(iconObject) {
            var icon = {
                url: iconObject.url,
                scaledSize: new gMapsApi.Size(36, 36)
            };
            if (iconObject.anchor) {
                if (iconObject.anchor == 'left') {
                    icon.anchor = new gMapsApi.Point(6, 36);
                }
                else if (iconObject.anchor == 'right') {
                    icon.anchor = new gMapsApi.Point(30, 36);
                }
                else {
                    icon.anchor = new gMapsApi.Point(18, 36);
                }                
            }
            return icon;
        }

        function rebuildMarkers() {
            $ctrl.markers.length = 0;
            var markerID = 0;
            var latitudeSpan = Math.abs($ctrl.map.bounds.northeast.latitude - $ctrl.map.bounds.southwest.latitude);
            var longitudeSpan = Math.abs($ctrl.map.bounds.northeast.longitude - $ctrl.map.bounds.southwest.longitude);
            for (var id in $ctrl.channel.categories) {
                var category = $ctrl.channel.categories[id];
                var addCount = 3 + Math.floor(Math.random() * 5);
                for (var j = 0; j < addCount; j++) {
                    $ctrl.markers.push({
                        id: markerID,
                        latitude: $ctrl.map.center.latitude + (Math.random() - 0.5) * latitudeSpan,
                        longitude: $ctrl.map.center.longitude + (Math.random() - 0.5) * longitudeSpan,
                        icon: buildIcon(category.icon)
                    });
                    markerID += 1;                        
                }
            }
        }
    }
})();