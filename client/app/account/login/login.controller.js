'use strict';

class LoginController {
    constructor(Auth, $location, $cookies) {
        this.user = {};
        this.errors = {};
        this.submitted = false;

        this.Auth = Auth;
        this.$location = $location;
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
            })
            .catch(err => {
                this.errors.other = err.message;
            });
        }
    }
}

angular.module('spirit99StationApp')
    .controller('LoginController', LoginController);
