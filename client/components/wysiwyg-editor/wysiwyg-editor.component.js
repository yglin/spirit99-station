/*
* @Author: yglin
* @Date:   2016-06-30 11:22:09
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-30 13:28:53
*/

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .component('s99WysiwygEditor',{
        templateUrl: '/components/wysiwyg-editor/wysiwyg-editor.tpl.html',
        controller: WysiwygEditorController,
        bindings: {
            content: '=',
            postInsertImage: '='
        }
    });

    WysiwygEditorController.$inject = ['$mdMedia', 'ImageSelector'];

    /* @ngInject */
    function WysiwygEditorController($mdMedia, ImageSelector) {
        var $ctrl = this;
        $ctrl.title = 'WysiwygEditor';
        $ctrl.editorConfig = {};
        $ctrl.editorApi = {};

        $ctrl.$onInit = function () {
            $ctrl.editorConfig.sanitize = true;
            if ($mdMedia('xs')) {
                $ctrl.editorConfig.toolbar = [
                    {name: 'toolbar-xs', items: ['bold', 'italic', 'underline', 'fontColor', 'undo', 'symbols', 'image']}
                ];
            }
            else if ($mdMedia('sm')) {
                $ctrl.editorConfig.toolbar = [
                    {
                        name: 'toolbar-sm-line1',
                        items: [
                            'bold', 'italic', 'underline', 'strikethrough', '-',
                            'leftAlign', 'centerAlign', 'rightAlign', '-',
                            'fontColor', 'backgroundColor', '-',
                            'orderedList', 'unorderedList', '-'
                        ]
                    },
                    {
                        name:'toolbar-sm-line2',
                        items: [
                            'image', 'hr', 'symbols', 'link', '-',
                            'format', 'size'
                        ]
                    }
                ];
            }

            $ctrl.editorApi.insertImage = insertImage;
        };

        function insertImage() {
            return ImageSelector.select({
                maxWidth: 2048,
                maxHeight: 2048,
                maxSizeMb: 5
            }).then(function (data) {
                if (data && data.url) {
                    if (typeof $ctrl.postInsertImage === 'function') {
                        $ctrl.postInsertImage(data.url);
                    }
                    var imgElement = '<img src="' + data.url + '">';
                    return imgElement;
                }
                else {
                    return $q.reject();
                }
            });
        }
    }
})();
