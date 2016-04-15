/*
* @Author: yglin
* @Date:   2016-04-15 17:16:05
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-15 18:04:19
*/

'use strict';

var ImageSelectorPage = function() {
  this.divRoot = element(by.css('div#s99st-image-selector'));
  this.url = this.divRoot.element(by.css('input[type=url]'));
  this.confirm = element(by.css('button#s99st-image-selector-confirm'));
};

module.exports = new ImageSelectorPage();
