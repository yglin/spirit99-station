/*
* @Author: yglin
* @Date:   2016-06-29 09:35:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-29 20:18:26
*/

(function() {
    'use strict';

    angular
    .module('spirit99StationApp.debug')
    .config(DebugRouter);

    DebugRouter.$inject = ['appConfig', '$routeProvider'];

    /* @ngInject */
    function DebugRouter(appConfig, $routeProvider){
        if (appConfig.env === 'development') {
            $routeProvider.when('/debug', {
                templateUrl: 'app/debug/debug.tpl.html',
                controller: 'DebugController',
                controllerAs: '$ctrl'
            });            
        }
    }

})();