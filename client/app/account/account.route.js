// 'use strict';
// 
(function() {
    'use strict';

    angular
    .module('spirit99StationApp')
    .config(AccountRouter);

    AccountRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function AccountRouter($routeProvider){
        $routeProvider
        .when('/profile', {
            templateUrl: 'app/account/profile/profile.tpl.html',
            controller: 'ProfileController',
            controllerAs: '$ctrl',
            authenticate: true
        });
    }

})();


// angular.module('spirit99StationApp')
//     .config(function($routeProvider) {
//         $routeProvider
//             .when('/login', {
//                 templateUrl: 'app/account/login/login.html',
//                 controller: 'LoginController',
//                 controllerAs: 'vm'
//             })
//             .when('/logout', {
//                 name: 'logout',
//                 referrer: '/',
//                 template: '',
//                 controller: function($rootScope, $location, $cookies, $route, Auth) {
//                     // var referrer = $route.current.params.referrer ||
//                     //                 $route.current.referrer ||
//                     //                 '/';
//                     Auth.logout();
//                     // $location.path(referrer);
//                     var beforePath = $cookies.get('path-before-logout');
//                     if (beforePath) {
//                         $location.path(beforePath);
//                     }
//                     else {
//                         $location.path('/');
//                     }
//                 }
//             })
//             .when('/signup', {
//                 templateUrl: 'app/account/signup/signup.html',
//                 controller: 'SignupController',
//                 controllerAs: 'vm'
//             })
//             .when('/settings', {
//                 templateUrl: 'app/account/settings/settings.html',
//                 controller: 'SettingsController',
//                 controllerAs: 'vm',
//                 authenticate: true
//             });
//     })
//     .run(function($rootScope) {
//         $rootScope.$on('$routeChangeStart', function(event, next, current) {
//             if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
//                 next.referrer = current.originalPath;
//             }
//         });
//     });
