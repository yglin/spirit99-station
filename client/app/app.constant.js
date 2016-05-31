(function(angular, undefined) {
'use strict';

angular.module('spirit99StationApp.constants', [])

.constant('appConfig', {env:'development',userRoles:['guest','user','admin'],spirit99Url:'http://www.9493.tw'})

;
})(angular);