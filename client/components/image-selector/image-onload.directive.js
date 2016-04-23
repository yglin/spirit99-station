/*
* @Author: yglin
* @Date:   2016-04-14 19:47:06
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-14 20:16:51
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .directive('s99stImageOnload', ImageOnload);

    ImageOnload.$inject = [];

    /* @ngInject */
    function ImageOnload() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                onLoaded: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            // console.log(scope.onLoaded);
            element.bind('load', function() {
                var img = this;
                // console.log('image loaded~!!');
                scope.$apply(function() {
                    scope.onLoaded({
                        width: img.width,
                        height: img.height
                    });
                });
                // scope.$apply(attrs['s99stImageOnload']);
            });
        }
    }

})();