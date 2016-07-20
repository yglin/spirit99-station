/*
* @Author: yglin
* @Date:   2016-04-12 16:54:01
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-20 14:38:01
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('s99stImageSelector',{
        templateUrl: 'components/image-selector/image-selector.tpl.html',
        controller: 'ImageSelectorController',
        bindings: {
            image: '=',
            maxWidth: '@',
            maxHeight: '@',
            maxSizeMb: '@'
        }
    });

})();
