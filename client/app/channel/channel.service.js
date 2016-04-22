/*
* @Author: yglin
* @Date:   2016-04-22 11:13:42
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-22 12:00:54
*/

'use strict';

(function() {

    angular.module('spirit99StationApp.channel')
    .factory('Channel', Channel);

    Channel.$inject = ['$http', '$q', 'Auth'];

    function Channel($http, $q, Auth) {
        return {
            query: query,
            getFromUser: getFromUser
        };

        function httpError(error) {
            return $q.reject(error.data);
        }

        function query() {
            return $http.get('/api/channels')
            .then(function (response) {
                return $q.resolve(response.data);
            }, httpError);
        }

        function getFromUser(user_id, channel_id) {
            if (!user_id) {
                user_id = Auth.getCurrentUser()._id;
            }
            var url = '/api/user/' + user_id + '/channels';
            if (channel_id) {
                url += '/' + channel_id;
            }
            return $http.get(url)
            .then(function (response) {
                return $q.resolve(response.data);
            }, httpError);
        }
    }
})();
