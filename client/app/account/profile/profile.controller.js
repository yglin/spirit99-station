/*
* @Author: yglin
* @Date:   2016-06-09 09:58:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-12 15:27:05
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', 'Util', 'Auth', 'Channel', 'Post', 'user'];

    /* @ngInject */
    function ProfileController($scope, Util, Auth, Channel, Post, user) {
        var $ctrl = this;
        $ctrl.title = 'Profile';
        $ctrl.user = user;

        activate();

        ////////////////

        function activate() {
            $scope.$on('account:logout', function () {
                Util.returnUrl(); 
            });
        }
    }
})();
