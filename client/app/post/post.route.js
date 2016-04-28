/*
* @Author: yglin
* @Date:   2016-04-28 14:26:32
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 14:30:29
*/

'use strict';

(function() {
    'use strict';

    angular
    .module('spirit99StationApp.post')
    .config(PostRouter);

    PostRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function PostRouter($routeProvider){
        $routeProvider.when('/post/create', {
            templateUrl: 'app/post/create.tpl.html',
            controller: 'PostCreateController',
            controllerAs: '$ctrl',
            authenticate: 'user'
        });        
    }

})();