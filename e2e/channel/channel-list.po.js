/*
* @Author: yglin
* @Date:   2016-04-11 11:36:03
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-15 20:02:41
*/

'use strict';

var ChannelListPage = function() {
  this.divRoot = element(by.css('div#s99st-channel-list'));
  this.buttonCreate = this.divRoot.element(by.css('#s99st-button-create'));
  this.channelItems = this.divRoot.all(by.css('.s99-channel-item'));
};

module.exports = new ChannelListPage();
