/*
* @Author: yglin
* @Date:   2016-04-28 17:05:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-03 14:16:27
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp.post')
    .component('s99PostEditor',{
        templateUrl: 'app/post/editor.tpl.html',
        controller: PostEditorController,
        bindings: {
            post: '=',
            channel: '<',
            submit: '<'
        }
    });

    PostEditorController.$inject = ['$scope', 'Auth', 'ImageSelector'];

    /* @ngInject */
    function PostEditorController($scope, Auth, ImageSelector) {
        var $ctrl = this;
        $ctrl.title = 'Post Editor';
        $ctrl.selectedCategoryID = -1;
        $ctrl.selectCategory = selectCategory;
        $ctrl.onChangeContent = onChangeContent;
        $ctrl.addImage = addImage;
        $ctrl.doSubmit = doSubmit;
        $ctrl.postIcon = undefined;

        $ctrl.$onInit = function () {
            if (!$ctrl.post.content) {
                $ctrl.post.content = '';
            }

            if ($ctrl.post.category && $ctrl.channel.categories[$ctrl.post.category]){
                var icon = $ctrl.channel.categories[$ctrl.post.category].icon;
                if (icon) {
                    $ctrl.postIcon = icon;
                }
            }

            if (!$ctrl.post.author) {
                Auth.getCurrentUser(function (user) {
                    if (user.email) {
                        $ctrl.post.author = user.email;
                    }
                });
            }

            // $scope.$watch('$ctrl.post.content', function () {
            //     $ctrl.post.thumbnail = grabFirstImgUrl($ctr.post.content); 
            // });
        };

        function selectCategory(id) {
            if (id == $ctrl.selectedCategoryID) {
                $ctrl.selectedCategoryID = -1;
                $scope.$broadcast('map:iconChanged', null);
            }
            else {
                $ctrl.selectedCategoryID = id;
                $ctrl.post.category = id;
                var icon = $ctrl.channel.categories[id].icon;
                if (icon) {
                    $ctrl.postIcon = icon;
                    $scope.$broadcast('map:iconChanged', $ctrl.postIcon);
                }
            }
        }

        function grabFirstImgUrl(html) {
            var img = angular.element('<div>' + html + '</div>').find('img');
            if (img && img.attr('src')) {
                return img.attr('src');
            }
            else {
                return null;
            }
        }

        function onChangeContent() {
             $ctrl.post.thumbnail = grabFirstImgUrl($ctrl.post.content);
        }

        function addImage() {
            ImageSelector.select({
                maxWidth: 2048,
                maxHeight: 2048,
                maxSizeMb: 5
            }).then(function (data) {
                if (data && data.url) {
                    var img = '<img src="' + data.url + '">';
                    $ctrl.post.content += '<br>' + img;
                    $ctrl.post.thumbnail = grabFirstImgUrl($ctrl.post.content);
                }
            })
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