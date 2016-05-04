/*
* @Author: yglin
* @Date:   2016-04-22 11:13:42
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-29 13:29:47
*/

'use strict';

(function() {

    angular.module('spirit99StationApp.channel')
    .factory('Channel', Channel);

    Channel.$inject = ['$http', '$q', 'Auth'];

    function Channel($http, $q, Auth) {
        return {
            query: query,
            create: create,
            update: update,
            get: get,
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

        function create(channelData) {
            // console.log(channelData);
            channelData.state = 'private';
            if (channelData.public) {
                channelData.state = 'public';
            }
            delete channelData.public;
            return $http.post('/api/channels', channelData)
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

        function get(channel_id) {
            var url = '/api/channels/' + channel_id;
            return $http.get(url)
            .then(function (response) {
                if (response.data.length > 0) {
                    return $q.resolve(response.data[0]);
                }
                else {
                    return $q.reject(response.data);
                }
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
