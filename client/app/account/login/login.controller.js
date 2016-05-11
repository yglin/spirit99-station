'use strict';

class LoginController {
    constructor(Auth, $rootScope, $location, $cookies) {
        this.user = {};
        this.errors = {};
        this.submitted = false;

        this.Auth = Auth;
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.$cookies = $cookies;
    }

    login(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.login({
                email: this.user.email,
                password: this.user.password
            })
            .then(() => {
                // Logged in, redirect to previous intent page, or home
                var pathAfterLogin = this.$cookies.get('path-after-login');
                if (pathAfterLogin) {
                    this.$location.path(pathAfterLogin);
                }
                else {
                    this.$location.path('/');
                }
                this.$rootScope.$broadcast('account:login');
            })
            .catch(err => {
                this.errors.other = err.message;
            });
        }
    }
}

angular.module('spirit99StationApp')
    .controller('LoginController', LoginController);
