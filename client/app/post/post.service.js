/*
* @Author: yglin
* @Date:   2016-04-29 13:12:03
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-31 15:03:13
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.post')
        .service('Post', Post);

    Post.$inject = ['$http', '$q', 'Auth'];

    /* @ngInject */
    function Post($http, $q, Auth) {
        var self = this;
        self.get = get;
        self.create = create;
        self.update = update;
        self.delete = _delete;
        self.getFromUser = getFromUser;

        ////////////////
        function httpError(error, defer) {
            console.error(error);
            return $q.reject(error.data);
        }

        function create(channel_id, data) {
            var postCreated = $q.defer();
            Auth.getCurrentUser(function (user) {
                var apiPath = '/api';
                if (user && user._id) {
                    apiPath += '/users/' + user._id;
                }
                apiPath += '/channels/' + channel_id + '/posts';

                $http.post(apiPath, data)
                .then(function (response) {
                    postCreated.resolve(response.data);
                }, function (error) {
                    console.error(error);
                    postCreated.reject(error);
                });
            });
            return postCreated.promise;
        }

        function _delete(channel_id, post_id) {
            return $http.delete('/api/channels/' + channel_id + '/posts/' + post_id)
            .then(function (response) {
                return $q.resolve(response);
            }, httpError);
        }

        function update(channel_id, post_id, data) {
            return $http.put('/api/channels/' + channel_id + '/posts/' + post_id, data)
            .then(function (response) {
                return $q.resolve(response);
            }, httpError);
        }

        function get(channel_id, post_id) {
            return $http.get('/api/channels/' + channel_id + '/posts/' + post_id)
            .then(function (response) {
                return $q.resolve(response.data);
            }, httpError);
        }

        function getFromUser(user_id, channel_id, post_id) {
            return $http.get('/api/users/' + user_id + '/channels/' + channel_id + '/posts/' + post_id)
            .then(function (response) {
                if (response.data) {
                    return $q.resolve(response.data);
                }
                else {
                    console.error('Got no posts, response = ...');
                    console.error(response);
                    return $q.reject();
                }
            }, httpError);
        }
    }
})();
