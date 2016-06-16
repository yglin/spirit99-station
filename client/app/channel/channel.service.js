/*
* @Author: yglin
* @Date:   2016-04-22 11:13:42
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-16 13:46:10
*/

'use strict';

(function() {

    angular.module('spirit99StationApp.channel')
    .factory('Channel', Channel);

    Channel.$inject = ['appConfig', '$window', '$http', '$q', 'Auth'];

    function Channel(appConfig, $window, $http, $q, Auth) {
        return {
            query: query,
            create: create,
            update: update,
            // delete: _delete,
            get: get,
            getPortal: getPortal,
            getFromUser: getFromUser,
            getImportUrl: getImportUrl
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
            return $http.post('/api/channels', channelData)
            .then(function (response) {
                return $q.resolve(response.data);
            }, httpError);
        }

        function update(channelData) {
            return $http.put('/api/channels/' + channelData.id, channelData)
            .then(function (response) {
                return $q.resolve(response.data);
            }, httpError);
        }

        // function _delete(channel_id) {
        //     var url = '/api/channels/' + channel_id;
        //     return $http.delete(url)
        //     .catch(httpError);
        // }

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

        function getImportUrl(channel_id) {
            var portalUrl = $window.location.protocol + '//' + $window.location.host + '/api/channels/' + channel_id + '/portal';
            return appConfig.spirit99Url + '?import=' + $window.encodeURIComponent(portalUrl);
        }
    }
})();
