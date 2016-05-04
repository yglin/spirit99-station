/*
* @Author: yglin
* @Date:   2016-04-23 13:35:09
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-03 11:51:39
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

    ChannelEditorController.$inject = ['$scope', 'ImageSelector', 'ygDialog'];

    /* @ngInject */
    function ChannelEditorController($scope, ImageSelector, ygDialog) {
        var $ctrl = this;
        $ctrl.title = 'ChannelEditor';
        $ctrl.channelIDPattern = /^[A-Z]\w+$/i;
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
            $ctrl.category = angular.copy(categoryDefaults);
            maxID = Math.max.apply(null, [0].concat(Object.keys($ctrl.channel.categories)));
        };

        function assignLogo() {
            ImageSelector.select({
                maxWidth: 64,
                maxHeight: 64,
                maxSizeMb: 1
            })
            .then(function(data) {
                $ctrl.channel['logo-url'] = data.url;
            });
        }

        function selectCategory(id) {
            if ($ctrl.selectedCategoryID == id) {
                $ctrl.selectedCategoryID = null;
                $ctrl.category = angular.copy(categoryDefaults);
            }
            else {
                $ctrl.selectedCategoryID = id;
                $ctrl.category = angular.copy($ctrl.channel.categories[id]);
            }
        }

        function selectCategoryIcon() {
            ImageSelector.select({
                maxWidth: 48,
                maxHeight: 48,
                maxSizeMb: 1,
                anchor: 'middle'
            })
            .then(function(data) {
                $ctrl.category.icon = {
                    url: data.url,
                    anchor: data.anchor
                };
            });            
        }

        function addCategory() {
            maxID += 1;
            $ctrl.channel.categories[maxID] = $ctrl.category;
            $ctrl.category = angular.copy(categoryDefaults);
            $scope.$broadcast('categoriesChanged');
            console.log($ctrl.channel.categories);
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

        function doSubmit(data) {
            $ctrl.processingSubmit = true;
            $ctrl.submit(data)
            .finally(function () {
                $ctrl.processingSubmit = false;
            });
        }
    }
})();