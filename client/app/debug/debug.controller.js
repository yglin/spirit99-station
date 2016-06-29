/*
* @Author: yglin
* @Date:   2016-06-29 09:38:40
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-29 11:44:00
*/

(function() {
    'use strict';

    angular
        .module('spirit99StationApp.debug')
        .controller('DebugController', DebugController);

    DebugController.$inject = ['$timeout'];

    /* @ngInject */
    function DebugController($timeout) {
        var $ctrl = this;
        $ctrl.title = 'Debug';
        $ctrl.text = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';

        activate();

        ////////////////

        function activate() {
        }

        $ctrl.focusOnEditor = function () {
            var editor = angular.element(document.getElementById('taTextElement54088'));//.find('*[id*=taText]');//.focus();
            console.log(editor);
            editor.focus();
        }
    }
})();
