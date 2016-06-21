(function(angular, undefined) {
'use strict';

angular.module('spirit99StationApp.constants', [])

.constant('appConfig', {env:'development',userRoles:['guest','user','admin'],spirit99Url:'//localhost:9493',googleAPIKey:'AIzaSyCewhA8IKkKYEWgW0e5bSThsw6sNKauliE'})

;
})(angular);