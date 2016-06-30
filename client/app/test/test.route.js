/*
* @Author: yglin
* @Date:   2016-06-29 09:35:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-29 20:18:26
*/

(function() {
    'use strict';

    angular
    .module('spirit99StationApp.test')
    .config(TestRouter);

    TestRouter.$inject = ['appConfig', '$routeProvider'];

    /* @ngInject */
    function TestRouter(appConfig, $routeProvider){
        if (appConfig.env === 'development') {
            $routeProvider.when('/test', {
                templateUrl: 'app/test/test.tpl.html',
                controller: 'TestController',
                controllerAs: '$ctrl'
            });            
        }
    }

})();
