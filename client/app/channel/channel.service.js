/*
* @Author: yglin
* @Date:   2016-04-22 11:13:42
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-23 16:06:48
*/

'use strict';

(function() {

    angular.module('spirit99StationApp.channel')
    .factory('Channel', Channel);

    Channel.$inject = ['$http', '$q', 'Auth'];

    function Channel($http, $q, Auth) {
        return {
            query: query,
            update: update,
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

        function update(channelData) {
            channelData.state = 'private';
            if (channelData.public) {
                channelData.state = 'public';
            }
            delete channelData.public;
            return $http.put('/api/channels/' + channelData.id, channelData)
            .then(function (response) {
                return $q.resolve(response.data);
            }, httpError);
        }

        function getFromUser(user_id, channel_id) {
            if (!user_id) {
                user_id = Auth.getCurrentUser()._id;
            }
            var url = '/api/users/' + user_id + '/channels';
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
