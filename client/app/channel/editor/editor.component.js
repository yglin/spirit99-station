/*
* @Author: yglin
* @Date:   2016-04-23 13:35:09
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-23 14:52:06
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

    ChannelEditorController.$inject = ['$scope', 'ImageSelector'];

    /* @ngInject */
    function ChannelEditorController($scope, ImageSelector) {
        var $ctrl = this;
        $ctrl.title = 'ChannelEditor';
        $ctrl.channelIDPattern = /^[A-Z]\w+$/i;
        $ctrl.assignLogo = assignLogo;
        $ctrl.selectCategory = selectCategory;
        $ctrl.selectCategoryIcon = selectCategoryIcon;
        $ctrl.addCategory = addCategory;
        $ctrl.updateCategory = updateCategory;
        $ctrl.deleteCategory = deleteCategory;

        var categoryDefaults = {
            icon: {
                url: 'http://icongal.com/gallery/image/460113/chartreuse_base_con_pixe_marker_map_outside_biswajit.png'
            }
        };

        $ctrl.$onInit = function () {
            $ctrl.category = angular.copy(categoryDefaults);
        };

        function assignLogo() {
            ImageSelector.select({
                maxWidth: 64,
                maxHeight: 64,
                maxSizeMb: 1
            })
            .then(function(imgUrl) {
                $ctrl.channel['logo-url'] = imgUrl;
            });
        }

        function selectCategory(index) {
            if ($ctrl.selectedCategoryIndex == index) {
                $ctrl.selectedCategoryIndex = -1;
                $ctrl.category = angular.copy(categoryDefaults);
            }
            else {
                $ctrl.selectedCategoryIndex = index;
                $ctrl.category = angular.copy($ctrl.channel.categories[index]);
            }
        }

        function selectCategoryIcon() {
            ImageSelector.select({
                maxWidth: 48,
                maxHeight: 48,
                maxSizeMb: 1
            })
            .then(function(imgUrl) {
                $ctrl.category.icon = {
                    url: imgUrl
                };
            });            
        }

        function addCategory() {
            $ctrl.channel.categories.push($ctrl.category);
            $ctrl.category = angular.copy(categoryDefaults);
            $scope.$broadcast('categoriesChanged');
        }

        function updateCategory(index) {
            $ctrl.channel.categories[index] = $ctrl.category;
            $scope.$broadcast('categoriesChanged');
        }

        function deleteCategory(index) {
            $ctrl.channel.categories.splice(index, 1);
            $ctrl.selectedCategoryIndex = -1;
            $ctrl.category = angular.copy(categoryDefaults);
            $scope.$broadcast('categoriesChanged');
        }
    }
})();