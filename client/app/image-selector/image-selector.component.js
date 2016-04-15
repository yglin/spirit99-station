/*
* @Author: yglin
* @Date:   2016-04-12 16:54:01
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-15 10:34:10
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('s99stImageSelector',{
        templateUrl: 'app/image-selector/image-selector.tpl.html',
        controller: 'ImageSelectorController',
        bindings: {
            maxWidth: '@',
            maxHeight: '@',
            maxSizeMb: '@'
        }
    });

})();
