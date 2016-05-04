/*
* @Author: yglin
* @Date:   2016-04-28 16:59:22
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-03 17:49:37
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.map')
    .component('s99LocateMap',{
        templateUrl: 'components/map/locate-map.tpl.html',
        controller: LocateMapController,
        bindings: {
            width: '@',
            height: '@',
            coords: '=',
            icon: '=',
            readonly: '='
        }
    });

    LocateMapController.$inject = ['$scope', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function LocateMapController($scope, uiGmapGoogleMapApi) {
        var $ctrl = this;
        $ctrl.title = 'LocateMap';

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

        $ctrl.marker = {
            coords: $ctrl.coords,
            options: {}
        };

        $ctrl.showMap = false;

        var listeners = [];

        var gMapsApi = null;

        $ctrl.$onInit = function () {
            uiGmapGoogleMapApi.then(function (googleMaps) {
                gMapsApi = googleMaps;
                if ($ctrl.marker.coords.latitude && $ctrl.marker.coords.longitude) {
                    $ctrl.map.center.latitude = $ctrl.marker.coords.latitude;
                    $ctrl.map.center.longitude = $ctrl.marker.coords.longitude;
                    $ctrl.map.zoom = 15;
                }
                else {
                    $ctrl.marker.coords.latitude = $ctrl.map.center.latitude;
                    $ctrl.marker.coords.longitude = $ctrl.map.center.longitude;
                }            

                if ($ctrl.readonly) {
                    $ctrl.marker.options.draggable = false;
                }
                else {
                    $ctrl.marker.options.draggable = true;                
                }

                onChangeIcon($ctrl.icon);

                listeners.push($scope.$on('map:iconChanged', function (event, iconObject) {
                    onChangeIcon(iconObject);
                }));

                $ctrl.showMap = true;
            });
        };

        $ctrl.$onDestroy = function () {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        };



        function onChangeIcon(iconObject) {
            if (!iconObject || !iconObject.url) {
                return;
            }

            var icon = $ctrl.marker.options.icon = {
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
        }
    }
})();
