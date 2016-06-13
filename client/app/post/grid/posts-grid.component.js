/*
* @Author: yglin
* @Date:   2016-06-13 11:04:18
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-13 11:17:30
*/

(function() {
    'use strict';

    angular.module('spirit99StationApp.post')
    .component('s99PostsGrid',{
        templateUrl: 'app/post/grid/posts-grid.tpl.html',
        controller: PostsGridController,
        bindings: {
            posts: '<'
        }
    });

    PostsGridController.$inject = [];

    /* @ngInject */
    function PostsGridController() {
        var $ctrl = this;
        $ctrl.title = 'PostsGrid';

        $ctrl.$onInit = function () {
        };
    }
})();