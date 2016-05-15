(function(angular, undefined) {
'use strict';

angular.module('spirit99StationApp.constants', [])

.constant('appConfig', {env:'development',spirit99Url:'http://localhost:9493',userRoles:['guest','user','admin']})

;
})(angular);