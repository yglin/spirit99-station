/*
* @Author: yglin
* @Date:   2016-04-28 14:26:32
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-12 14:58:57
*/

'use strict';

(function() {
    'use strict';

    angular
    .module('spirit99StationApp.post')
    .config(PostRouter);

    PostRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function PostRouter($routeProvider){
        $routeProvider.when('/:channel_id/posts/create', {
            templateUrl: 'app/post/create.tpl.html',
            controller: 'PostCreateController',
            controllerAs: '$ctrl'
        })
        .when('/:channel_id/posts/update/:post_id', {
            templateUrl: 'app/post/update.tpl.html',
            controller: 'PostUpdateController',
            controllerAs: '$ctrl',
            // authenticate: 'user'
            resolve: {
                user: loginAsUser
            }
        })
        .when('/:channel_id/posts/:post_id', {
            templateUrl: 'app/post/view.tpl.html',
            controller: 'PostViewController',
            controllerAs: '$ctrl'
        });
    }

    loginAsUser.$injector = ['Account', 'Util']

    function loginAsUser(Account, Util) {
        return Account.getToLogInAs('user')
        .catch(function () {
            Util.returnUrl('/');
        });
    }
})();