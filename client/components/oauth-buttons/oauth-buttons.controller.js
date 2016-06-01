'use strict';

angular.module('spirit99StationApp')
  .controller('OauthButtonsCtrl', function($window, $cookies) {
    this.loginOauth = function(provider) {
        $cookies.put('url-after-login', $window.location.href);
        $window.location.href = '/auth/' + provider;
        // Auth.login({ provider: provider });
    };
  });
