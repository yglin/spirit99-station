/*
* @Author: yglin
* @Date:   2016-05-05 17:38:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-06 17:05:53
*/

'use strict';

(function() {
    angular
    .module('spirit99StationApp.comment')
    .service('Comment', Comment);

    Comment.$inject = ['$q', '$http'];

    /* @ngInject */
    function Comment($q, $http) {
        var self = this;
        self.query = query;
        self.create = create;

        ////////////////
        function httpError(error) {
            console.error(error);
            return $q.reject(error);
        }

        function query(channel_id, post_id) {
            return $http.get('/api/channels/' + channel_id + '/posts/' + post_id + '/comments')
            .then(function (response) {
                if (response.data && response.data.length > 0) {
                    return response.data;
                }
                else {
                    console.error('Got no comments from channel ' + channel_id + ', post ' + post_id);
                    return $q.reject(response.data);
                }
            }, httpError);
        }

        function create(channel_id, post_id, data) {
            return $http.post('/api/channels/' + channel_id + '/posts/' + post_id + '/comments', data)
            .then(function (response) {
                if (response.data) {
                    return response.data;
                }
                else {
                    console.error('Not responsed created comment from channel ' + channel_id + ', post ' + post_id);
                    return $q.reject(response.data);
                }                
            }, httpError);
        }
    }
})();