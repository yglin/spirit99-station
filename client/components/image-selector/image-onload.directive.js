/*
* @Author: yglin
* @Date:   2016-04-14 19:47:06
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-04 13:08:14
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
                onLoaded: '=',
                onError: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            // console.log(scope.onLoaded);
            element.bind('load', function() {
                var img = this;
                scope.$apply(function() {
                    scope.onLoaded(img);
                });
                // scope.$apply(attrs['s99stImageOnload']);
            });

            element.bind('error', function () {
                scope.$apply(function () {
                    scope.onError();
                });
            });
        }
    }

})();