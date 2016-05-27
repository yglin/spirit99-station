/*
* @Author: yglin
* @Date:   2016-04-15 10:31:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-27 18:17:44
*/

'use strict';

(function() {
    'use strict';

    angular.module('spirit99StationApp')
    .controller('ImageSelectorController', ImageSelectorController);

    ImageSelectorController.$inject = ['$mdDialog', '$timeout', 'Upload'];

    /* @ngInject */
    function ImageSelectorController($mdDialog, $timeout, Upload) {
        var $ctrl = this;
        $ctrl.title = '選擇圖片';
        $ctrl.cancel = cancel;
        $ctrl.confirm = confirm;
        $ctrl.uploadFile = uploadFile;
        $ctrl.onChange = onChange;
        $ctrl.onLoaded = onLoaded;
        $ctrl.onError = onError;

        $ctrl.image = {
            url: ''
        };
        $ctrl.uploading = {
            progress: -1,
            success: false,
            fail: false,
            invalidFiles: [],
            errorMessages: null
        };

        $ctrl.invalid = false;
        $ctrl.inProgress = false;

        $ctrl.$onInit = function () {
            $ctrl.minWidth = $ctrl.minWidth || '24';
            $ctrl.minHeight = $ctrl.minHeight || '24';
            $ctrl.maxWidth = $ctrl.maxWidth || '128';
            $ctrl.maxHeight = $ctrl.maxHeight || '128';
            $ctrl.maxSizeMb = $ctrl.maxSizeMb || '2';
        };

        function cancel() {
            $mdDialog.cancel();
        }

        function confirm() {
            $mdDialog.hide({
                url: $ctrl.image.url,
                anchor: $ctrl.anchor
            });
        }

        function uploadFile(file, invalidFiles) {
            $ctrl.uploading.progress = -1;
            $ctrl.uploading.success = false;
            $ctrl.uploading.fail = false;
            $ctrl.uploading.errorMessages = null;
            $ctrl.uploading.invalidFiles = invalidFiles;
            if (file) {
                file.upload = Upload.upload({
                    url: 'https://api.imgur.com/3/image',
                    headers: {'Authorization': 'Client-ID 38186eac8820601'},
                    data: {image: file}
                });

                file.upload.then(function (response) {
                    $ctrl.image.url = response.data.data.link;
                    $ctrl.previewUrl = $ctrl.image.url;
                    $timeout(function() {
                        $ctrl.uploading.success = true;
                    });
                }, function (error) {
                    $ctrl.uploading.errorMessages = error.status + ': ' + JSON.stringify(error.data);
                    $ctrl.uploading.fail = true;
                }, function (evt) {
                    $ctrl.uploading.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }

        function onChange() {
            $ctrl.inProgress = true;
            $timeout.cancel($ctrl.timeoutLoadImage);
            $ctrl.timeoutLoadImage = $timeout(function () {
                $ctrl.previewUrl = $ctrl.image.url;
            }, 1000);
        }

        function onLoaded(image) {
            if (!image.width || image.width < $ctrl.minWidth || image.width > $ctrl.maxWidth) {
                $ctrl.invalid = true;
            }
            else if (!image.height || image.height < $ctrl.minHeight || image.height > $ctrl.maxHeight) {
                $ctrl.invalid = true;
            }
            else {
                $ctrl.invalid = false;
            }
            $ctrl.inProgress = false;
        }

        function onError() {
            $ctrl.invalid = true;
            $ctrl.inProgress = false;
        }
    }
})();
