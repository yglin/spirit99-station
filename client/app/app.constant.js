(function(angular, undefined) {
'use strict';

angular.module('spirit99StationApp.constants', [])

.constant('appConfig', {env:'production',userRoles:['guest','user','admin'],spirit99Url:'http://www.9493.tw',googleAPIKey:'AIzaSyB72lwL0HWu-jdurOAWFMIUMPAL6aHeZ0s'})

;
})(angular);