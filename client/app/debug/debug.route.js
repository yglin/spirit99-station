/*
* @Author: yglin
* @Date:   2016-06-29 09:35:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-29 09:37:03
*/

(function() {
    'use strict';

    angular
    .module('spirit99StationApp.debug')
    .config(DebugRouter);

    DebugRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function DebugRouter($routeProvider){
        $routeProvider.when('/debug', {
            templateUrl: 'app/debug/debug.tpl.html',
            controller: 'DebugController',
            controllerAs: '$ctrl'
        });        
    }

})();