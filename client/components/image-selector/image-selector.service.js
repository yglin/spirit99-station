/*
* @Author: yglin
* @Date:   2016-04-15 10:08:17
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-05 10:58:22
*/

'use strict';

(function() {
    'use strict';

    angular
        .module('spirit99StationApp')
        .service('ImageSelector', ImageSelector);

    ImageSelector.$inject = ['$q', '$mdDialog'];

    /* @ngInject */
    function ImageSelector($q, $mdDialog) {
        var self = this;
        self.select = select;

        ////////////////

        function select (options) {
            options = typeof options === 'undefined' ? {} : options;

            var defer = $q.defer();

            options.inDialog = true;
            
            $mdDialog.show({
                templateUrl: 'components/image-selector/image-selector.tpl.html',
                controller: 'ImageSelectorController',
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose: true,
                locals: options
            })
            .then(function(url) {
                defer.resolve(url);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };
    }
})();
