'use strict';

(function() {

angular.module('spirit99StationApp.auth')
.run(function($rootScope, $window, $cookies, $location, Auth, Account) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        // console.log(current);
        if (!next.authenticate) {
            return;
        }

        var backPath = '/';
        if (current && current.$$route && current.$$route.originalPath) {
            backPath = buildPathFromRoute(current);
        }

        $cookies.remove('url-after-login');
        if (typeof next.authenticate === 'string') {
            Auth.hasRole(next.authenticate, _.noop).then(has => {
                if (has) {
                    return;
                }

                return Auth.isLoggedIn(_.noop).then(is => {
                    if (is) {
                        $window.alert('抱歉，您沒有權限執行此動作');
                        $location.path(backPath);
                    }
                    else {
                        Account.loginDialog().then(function () {
                            return;
                        }, function () {
                            event.preventDefault();
                            $location.path(backPath);
                        });
                    }
                });
            });
        } else {
            Auth.isLoggedIn(_.noop).then(is => {
                if (is) {
                    return;
                }
                event.preventDefault();
                $location.path(backPath);
            });
        }
    });

    function buildPathFromRoute(routeObj)
    {
        var path = routeObj.$$route.originalPath;
        for (var property in routeObj.pathParams)
        {
            if (routeObj.pathParams.hasOwnProperty(property))
            {
                var regEx = new RegExp(":" + property, "gi");
                path = path.replace(regEx, routeObj.pathParams[property].toString());
            }
        }
        return path;
    }
});

})();
