'use strict';

(function() {

function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
    }, {
        changePassword: {
            method: 'PUT',
            params: {
                controller: 'password'
            }
        },
        get: {
            method: 'GET',
            params: {
                id: 'me'
            }
        },
        sendVerifyEmail: {
            method: 'PUT',
            params: {
                controller: 'send-verify'
            }
        },
        verify: {
            method: 'PUT',
            params: {
                controller: 'verify'
            }
        }
    });
}

angular.module('spirit99StationApp.auth')
    .factory('User', UserResource);

})();
