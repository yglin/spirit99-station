/*
* @Author: yglin
* @Date:   2016-06-09 09:58:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-12 11:30:36
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', 'Util', 'Auth', 'Channel', 'Post'];

    /* @ngInject */
    function ProfileController($scope, Util, Auth, Channel, Post) {
        var $ctrl = this;
        $ctrl.title = 'Profile';
        $ctrl.user = undefined;

        activate();

        ////////////////

        function activate() {
            $scope.$on('account:logout', function () {
                Util.returnUrl(); 
            });

            Auth.getCurrentUser(function (user) {
                if (user._id) {
                    $ctrl.user = user;
                }
            });

            $scope.$on('account:login', function () {
                Auth.getCurrentUser(function (user) {
                    if (user._id) {
                        $ctrl.user = user;
                    }
                });                
            });
        }
    }
})();
