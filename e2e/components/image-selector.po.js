/*
* @Author: yglin
* @Date:   2016-04-15 17:16:05
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-21 10:58:39
*/

'use strict';

var ImageSelectorPage = function() {
    var self = this;
    self.divRoot = element(by.css('div#s99st-image-selector'));
    self.url = self.divRoot.element(by.css('input[type=url]'));
    self.confirm = element(by.css('button#s99st-image-selector-confirm'));

    self.select = function (url) {
        browser.wait(function() {
            return self.divRoot.isDisplayed();
        }, 2000);
        self.url.sendKeys(url);
        browser.wait(function() {
            return self.confirm.isEnabled();
        }, 2000);
        self.confirm.click();
        // browser.wait(function() {
        //     return self.divRoot.isDisplayed().then(function (isDisplayed) {
        //         return isDisplayed == false;
        //     });
        // }, 2000);
    }
};

module.exports = new ImageSelectorPage();
