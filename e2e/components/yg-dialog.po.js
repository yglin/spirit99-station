/*
* @Author: yglin
* @Date:   2016-04-25 10:04:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-25 10:07:24
*/

'use strict';

var YgDialogPage = function() {
    var self = this;
    self.divRoot = element(by.css('#yg-dialog'));
    self.buttonConfirm = self.divRoot.element(by.css('#confirm'));
    self.confirm = confirm;

    function confirm() {
        self.buttonConfirm.click();
    }
};

module.exports = new YgDialogPage();
