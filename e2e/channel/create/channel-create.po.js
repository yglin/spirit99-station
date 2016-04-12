/*
* @Author: yglin
* @Date:   2016-04-11 19:37:25
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 15:44:40
*/

'use strict';

var ChannelCreatePage = function() {
  this.divRoot = element(by.css('#s99st-div-channel-create'));
  this.inputChannelID = element(by.css('input#s99st-input-channel-id'));
  this.warningChannelIDRequired = element(by.css('#s99st-message-channel-id-required'));
  this.warningChannelIDExist = element(by.css('#s99st-message-channel-id-exists'));
  this.inputChannelTitle = element(by.css('input#s99st-input-channel-title'));
  this.warningChannelTitleRequired = element(by.css('#s99st-message-channel-title-required'));
  this.buttonSubmit = element(by.css('#s99st-button-submit-create'));

  this.preview = {
    channel: {
        title: element(by.css('div#preview div.s99st-channel-item .s99st-channel-title'))
    }
  }
};

module.exports = new ChannelCreatePage();
