/*
* @Author: yglin
* @Date:   2016-06-09 09:58:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-28 10:27:34
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$routeParams', '$mdMedia', 'Util', 'Auth', 'Channel', 'Post', 'user'];

    /* @ngInject */
    function ProfileController($scope, $routeParams, $mdMedia, Util, Auth, Channel, Post, user) {
        var $ctrl = this;
        $ctrl.title = 'Profile';
        $ctrl.activeTab = "profile";
        $ctrl.user = user;
        $ctrl.layout = {};

        activate();

        ////////////////

        function activate() {
            if ($routeParams.tab) {
                $ctrl.activeTab = $routeParams.tab;
            }
            
            $scope.$on('account:logout', function () {
                Util.returnUrl(); 
            });

            if ($mdMedia('xs')) {
                $ctrl.layout['min-width'] = '300px';
            }
            else if ($mdMedia('sm')) {
                $ctrl.layout['min-width'] = '600px';
            }
            else {
                $ctrl.layout['min-width'] = '800px';                
            }
        }
    }
})();
