/*
* @Author: yglin
* @Date:   2016-04-28 14:25:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 14:36:42
*/

'use strict';

(function() {

    angular
    .module('spirit99StationApp.post')
    .controller('PostCreateController', PostCreateController);

    PostCreateController.$inject = ['$routeParams'];

    /* @ngInject */
    function PostCreateController($routeParams) {
        var $ctrl = this;
        $ctrl.title = 'Create Post';
        $ctrl.post = {};

        activate();

        ////////////////

        function activate() {
            $ctrl.post.latitude = $routeParams.latitude;
            $ctrl.post.longitude = $routeParams.longitude;
        }
    }
})();