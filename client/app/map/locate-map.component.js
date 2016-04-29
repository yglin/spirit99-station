/*
* @Author: yglin
* @Date:   2016-04-28 16:59:22
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-29 09:24:28
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.map')
    .component('s99LocateMap',{
        templateUrl: 'app/map/locate-map.tpl.html',
        controller: LocateMapController,
        bindings: {
            width: '@',
            height: '@',
            marker: '=',
        }
    });

    LocateMapController.$inject = ['$scope'];

    /* @ngInject */
    function LocateMapController($scope) {
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

        $ctrl.$onInit = function () {
            $ctrl.marker.draggable = true;

            if ($ctrl.marker.latitude && $ctrl.marker.longitude) {
                $ctrl.map.center.latitude = $ctrl.marker.latitude;
                $ctrl.map.center.longitude = $ctrl.marker.longitude;
                $ctrl.map.zoom = 15;
            }
            else {
                $ctrl.marker.latitude = $ctrl.map.center.latitude;
                $ctrl.marker.longitude = $ctrl.map.center.longitude;
            }
        };
    }
})();
