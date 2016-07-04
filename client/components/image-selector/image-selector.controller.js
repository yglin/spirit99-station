/*
* @Author: yglin
* @Date:   2016-04-15 10:31:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-04 17:51:55
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

        $ctrl.image = {};

        $ctrl.uploading = {
            progress: -1,
            success: false,
            fail: false,
            invalidFiles: [],
            errorMessages: null
        };

        $ctrl.invalid = false;
        $ctrl.inProgress = false;

        activate();

        function activate () {
            $ctrl.minWidth = parseInt($ctrl.minWidth || '12');
            $ctrl.minHeight = parseInt($ctrl.minHeight || '12');
            $ctrl.maxWidth = parseInt($ctrl.maxWidth || '4096');
            $ctrl.maxHeight = parseInt($ctrl.maxHeight || '4096');
            $ctrl.maxSizeMb = parseFloat($ctrl.maxSizeMb || '8');
        };

        function cancel() {
            $mdDialog.cancel();
        }

        function confirm() {
            $mdDialog.hide({
                url: $ctrl.image.src,
                anchor: $ctrl.anchor
            });
        }

        function uploadFile(file, invalidFiles) {
            $ctrl.invalid = false;
            $ctrl.image = {};

            $ctrl.uploading.progress = -1;
            $ctrl.uploading.success = false;
            $ctrl.uploading.fail = false;
            $ctrl.uploading.errorMessages = null;
            $ctrl.uploading.invalidFiles = invalidFiles;

            if (invalidFiles.length > 0) {
                $ctrl.invalid = true;
            }
            
            if (file) {
                file.upload = Upload.upload({
                    url: 'https://api.imgur.com/3/image',
                    headers: {'Authorization': 'Client-ID 38186eac8820601'},
                    data: {image: file}
                });

                file.upload.then(function (response) {
                    if (response.data.data) {
                        $ctrl.image.src = response.data.data.link;
                        $ctrl.image.naturalWidth = response.data.data.width;
                        $ctrl.image.naturalHeight = response.data.data.height;                        
                    }
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

        function checkImageDimension(width, height) {
            var isValid = true
            if (width && (width < $ctrl.minWidth || width > $ctrl.maxWidth)) {
                isValid = false;
            }
            if (height && (height < $ctrl.minheight || height > $ctrl.maxheight)) {
                isValid = false;
            }
            return isValid;
        }

        function onChange() {
            $ctrl.invalid = false;
            $ctrl.inProgress = true;
        }

        function onLoaded(image) {
            $ctrl.image = image;
            $ctrl.invalid = !checkImageDimension(image.naturalWidth, image.naturalHeight);
            $ctrl.inProgress = false;
        }

        function onError() {
            $ctrl.invalid = true;
            $ctrl.inProgress = false;
        }
    }
})();
