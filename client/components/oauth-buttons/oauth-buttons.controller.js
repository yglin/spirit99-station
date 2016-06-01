'use strict';

angular.module('spirit99StationApp')
  .controller('OauthButtonsCtrl', function($window, Auth) {
    this.loginOauth = function(provider) {
      // $window.location.href = '/auth/' + provider;
        Auth.login({ provider: provider });
    };
  });
