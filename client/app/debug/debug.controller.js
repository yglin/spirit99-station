/*
* @Author: yglin
* @Date:   2016-06-29 09:38:40
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-30 10:53:01
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.debug')
        .controller('DebugController', DebugController);

    DebugController.$inject = ['$mdMedia', 'ImageSelector'];

    /* @ngInject */
    function DebugController($mdMedia, ImageSelector) {
        var $ctrl = this;
        $ctrl.title = 'Debug';
        $ctrl.text = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
        $ctrl.editorConfig = {};
        $ctrl.editorApi = {};

        activate();

        ////////////////

        function activate() {
            $ctrl.editorConfig.sanitize = true;
            if ($mdMedia('xs')) {
                $ctrl.editorConfig.toolbar = [
                    {name: 'toolbar-xs', items: ['bold', 'italic', 'underline', 'strikethrough', 'fontColor', 'undo', 'symbols', 'image']}
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
        }

        function insertImage() {
            return ImageSelector.select({
                maxWidth: 2048,
                maxHeight: 2048,
                maxSizeMb: 5
            }).then(function (data) {
                if (data && data.url) {
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
