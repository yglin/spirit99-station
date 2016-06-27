/*
* @Author: yglin
* @Date:   2016-05-10 15:30:41
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-27 12:14:56
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('s99Account',{
        templateUrl: 'app/account/account.tpl.html',
        controller: AccountController,
        bindings: {
        }
    });

    AccountController.$inject = ['$scope', '$location', '$cookies', 'Account', 'Auth', 'ygDialog'];

    /* @ngInject */
    function AccountController($scope, $location, $cookies, Account, Auth, ygDialog) {
        var $ctrl = this;
        $ctrl.title = 'Account';
        $ctrl.gotoLogin = Account.getToLogInAs;
        $ctrl.gotoLogout = Account.logoutDialog;
        $ctrl.user = undefined;

        $ctrl.$onInit = function () {
            syncUser();
            $scope.$on('account:login', syncUser);
            $scope.$on('account:logout', syncUser);
        };

        function findAvatar(user) {
            if (user.provider && user[user.provider]) {
                var profile = user[user.provider];
                if (user.provider == 'google' && profile.image && profile.image.url) {
                    return profile.image.url;
                }
                if (user.provider == 'facebook') {
                    return 'http://graph.facebook.com/' + user.provider_id + '/picture?type=small';
                }
            }
            return null;
        }

        function syncUser() {
            Auth.getCurrentUser(function (user) {
                if (user._id) {
                    $ctrl.user = user;
                    $ctrl.avatar = findAvatar(user);
                }
                else {
                    $ctrl.user = undefined;
                }
            });            
        }

        // function gotoLogin() {
        //     $cookies.put('path-before-login', $location.path());
        //     $location.path('/login');
        // }

        // function gotoLogout() {
        //     ygDialog.confirm('登出', '<h3>確定要登出嗎？</h3>')
        //     .then(function () {
        //         $cookies.put('path-before-logout', $location.path());
        //         $location.path('/logout');                
        //     });
        // }
    }
})();