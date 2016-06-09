/*
* @Author: yglin
* @Date:   2016-06-09 09:58:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-09 10:11:31
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', 'Util', 'Channel', 'Post'];

    /* @ngInject */
    function ProfileController($scope, Util, Channel, Post) {
        var $ctrl = this;
        $ctrl.title = 'Profile';
        $ctrl.user = undefined;

        activate();

        ////////////////

        function activate() {
            $scope.$on('account:logout', function () {
                Util.returnUrl(); 
            });
        }
    }
})();
