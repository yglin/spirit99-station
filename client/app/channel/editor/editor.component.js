/*
* @Author: yglin
* @Date:   2016-04-23 13:35:09
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-20 17:12:58
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.channel')
    .component('channelEditor',{
        templateUrl: 'app/channel/editor/editor.tpl.html',
        controller: ChannelEditorController,
        bindings: {
            channel: '=',
            action: '@',
            submit: '='
        }
    });

    ChannelEditorController.$inject = ['$scope', '$mdMedia', 'Channel', 'ImageSelector', '$q', 'ygDialog'];

    /* @ngInject */
    function ChannelEditorController($scope, $mdMedia, Channel, ImageSelector, $q, ygDialog) {
        var $ctrl = this;
        $ctrl.title = 'ChannelEditor';
        $ctrl.channelIDPattern = /^[A-Z]\w+$/i;
        $ctrl.importUrl = undefined;
        $ctrl.$mdMedia = $mdMedia;

        $ctrl.onChangeID = onChangeID;
        $ctrl.assignLogo = assignLogo;
        $ctrl.selectCategory = selectCategory;
        $ctrl.selectCategoryIcon = selectCategoryIcon;
        $ctrl.addCategory = addCategory;
        $ctrl.updateCategory = updateCategory;
        $ctrl.deleteCategory = deleteCategory;
        $ctrl.clearCategories = clearCategories;
        $ctrl.doSubmit = doSubmit;

        var maxID;
        var categoryDefaults = {
            icon: {
                url: 'http://icongal.com/gallery/image/460113/chartreuse_base_con_pixe_marker_map_outside_biswajit.png'
            }
        };

        $ctrl.$onInit = function () {
            if (!$ctrl.channel.categories) {
                $ctrl.channel.categories = {};
            }
            $ctrl.category = angular.copy(categoryDefaults);
            maxID = Math.max.apply(null, [0].concat(Object.keys($ctrl.channel.categories)));

            if (!$ctrl.channel.state) {
                $ctrl.public = true;
            }
            else {
                $ctrl.public = $ctrl.channel.state == 'public';
            }

            if ($ctrl.channel.id) {
                $ctrl.importUrl = Channel.getImportUrl($ctrl.channel.id);
            }
        };

        function onChangeID() {
            $ctrl.importUrl = Channel.getImportUrl($ctrl.channel.id);
        }

        function assignLogo() {
            ImageSelector.select({
                maxWidth: 128,
                maxHeight: 128,
                maxSizeMb: 1,
                image: {
                    url: $ctrl.channel['logo-url']
                }
            })
            .then(function(image) {
                $ctrl.channel['logo-url'] = image.url;
            });
        }

        function selectCategory(id) {
            if ($ctrl.selectedCategoryID == id || !$ctrl.channel.categories[id]) {
                $ctrl.selectedCategoryID = null;
                $ctrl.category = angular.copy(categoryDefaults);
            }
            else {
                $ctrl.selectedCategoryID = id;
                // $ctrl.category = angular.copy($ctrl.channel.categories[id]);
                $ctrl.category = $ctrl.channel.categories[id];
            }
        }

        function selectCategoryIcon() {
            ImageSelector.select({
                maxWidth: 48,
                maxHeight: 48,
                maxSizeMb: 1,
                image: angular.copy($ctrl.category.icon)
            })
            .then(function(image) {
                $ctrl.category.icon = image;
            });            
        }

        function addCategory() {
            maxID += 1;
            $ctrl.channel.categories[maxID] = $ctrl.category;
            $ctrl.category = angular.copy(categoryDefaults);
            $scope.$broadcast('categoriesChanged');
            // console.log($ctrl.channel.categories);
        }

        function updateCategory() {
            $ctrl.channel.categories[$ctrl.selectedCategoryID] = $ctrl.category;
            $ctrl.selectedCategoryID = null;
            $ctrl.category = angular.copy(categoryDefaults);
            $scope.$broadcast('categoriesChanged');
        }

        function deleteCategory() {
            delete $ctrl.channel.categories[$ctrl.selectedCategoryID];
            $ctrl.selectedCategoryID = null;
            $ctrl.category = angular.copy(categoryDefaults);
            $scope.$broadcast('categoriesChanged');
        }

        function clearCategories() {
            ygDialog.confirm('移除所有分類', '確定要移除所有的分類？')
            .then(function () {
                $ctrl.channel.categories = {};
                // for (var id in $ctrl.channel.categories) {
                //     delete $ctrl.channel.categories[id];
                // }
                $scope.$broadcast('categoriesChanged');
            });
        }

        function doSubmit(channel) {
            if ($ctrl.public) {
                $ctrl.channel.state = 'public';
            }
            else {
                $ctrl.channel.state = 'private';
            }
            
            $ctrl.processingSubmit = true;
            $ctrl.submit(channel)
            .finally(function () {
                $ctrl.processingSubmit = false;
            });
        }
    }
})();