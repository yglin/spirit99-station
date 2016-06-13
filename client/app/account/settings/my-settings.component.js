/*
* @Author: yglin
* @Date:   2016-06-13 14:08:52
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-13 20:38:10
*/

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('s99MySettings',{
        templateUrl: 'app/account/settings/my-settings.tpl.html',
        controller: MySettingsController,
        bindings: {
            user: '<'
        }
    });

    MySettingsController.$inject = ['Account'];

    /* @ngInject */
    function MySettingsController(Account) {
        var $ctrl = this;
        $ctrl.title = 'MySettings';

        $ctrl.changePassword = Account.changePassword;
        $ctrl.getFacebookAccountLink = getFacebookAccountLink;


        $ctrl.$onInit = function () {
            $ctrl.picture = findPicture($ctrl.user);
        };
        
        function findPicture(user) {
            if (user.provider && user[user.provider]) {
                var profile = user[user.provider];
                if (user.provider == 'google' && profile.image && profile.image.url) {
                    return profile.image.url.replace('sz=50', 'sz=96');
                }
                if (user.provider == 'facebook') {
                    return 'http://graph.facebook.com/' + user.provider_id + '/picture?type=normal';
                }
            }
            return null;
        }

        function getFacebookAccountLink(user) {
            return 'https://facebook.com/' + user.provider_id;
        }
    }
})();
