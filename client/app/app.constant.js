(function(angular, undefined) {
'use strict';

angular.module('spirit99StationApp.constants', [])

.constant('appConfig', {env:'test',userRoles:['guest','user','admin'],spirit99Url:'http://localhost:9001'})

;
})(angular);