/*
* @Author: yglin
* @Date:   2016-04-22 11:13:42
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-22 11:16:24
*/

'use strict';

(function() {

    function ChannelResource($resource) {
        return $resource('/api/channels/:id');
    }

    angular.module('spirit99StationApp.channel')
    .factory('Channel', ChannelResource);

})();
