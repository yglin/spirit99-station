/*
* @Author: yglin
* @Date:   2016-04-22 11:13:42
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-15 11:21:21
*/

'use strict';

(function() {

    angular.module('spirit99StationApp.channel')
    .factory('Channel', Channel);

    Channel.$inject = ['$window', '$http', '$q', 'Auth'];

    function Channel($window, $http, $q, Auth) {
        return {
            query: query,
            create: create,
            update: update,
            get: get,
            getPortal: getPortal,
            getFromUser: getFromUser,
            importTo: importTo
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
                if (response.data.length && response.data.length > 0) {
                    return $q.resolve(response.data[0]);
                }
                else {
                    return $q.resolve(response.data);
                }
            }, httpError);            
        }

        function getPortal(channel_id) {
            var url = '/api/channels/' + channel_id + '/portal';
            return $http.get(url)
            .then(function (response) {
                if (response.data) {
                    return $q.resolve(response.data);
                }
                else {
                    return $q.reject(response);
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

        function importTo(channel_id, client_url) {
            var portalUrl = $window.location.protocol + '//' + $window.location.host + '/api/channels/' + channel_id + '/portal';
            $window.location.href = client_url + '?import=' + $window.encodeURIComponent(portalUrl);
        }
    }
})();
