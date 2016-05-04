/*
* @Author: yglin
* @Date:   2016-04-29 13:12:03
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 13:36:22
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.post')
        .service('Post', Post);

    Post.$inject = ['$http', '$q'];

    /* @ngInject */
    function Post($http, $q) {
        var self = this;
        self.create = create;
        self.get = get;
        self.getFromUser = getFromUser;

        ////////////////
        function httpError(error) {
            return $q.reject(error.data);
        }

        function create(channel_id, data) {
            return $http.post('/api/channels/' + channel_id + '/posts', data)
            .then(function (response) {
                return $q.resolve(response.data);
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
