/*
* @Author: yglin
* @Date:   2016-04-11 19:37:25
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-15 20:16:47
*/

'use strict';

var ChannelCreatePage = function() {
    this.divRoot = element(by.css('div#s99st-channel-create'));
    this.form = {
        id: this.divRoot.element(by.css('input[name=id]')),
        title: this.divRoot.element(by.css('input[name=title]')),
        description: this.divRoot.element(by.css('textarea[name=description]')),
        buttonLogo: this.divRoot.element(by.css('#s99st-button-select-logo')),
        buttonSubmit: this.divRoot.element(by.css('#s99st-button-submit-create'))
    };

    this.messages = {
        channelIDRequired: this.divRoot.element(by.css('#s99st-message-channel-id-required')),
        channelIDExist: this.divRoot.element(by.css('#s99st-message-channel-id-exists')),
        channelIDFalsePattern: this.divRoot.element(by.css('#s99st-message-channel-id-false-pattern')),
        channelTitleRequired: this.divRoot.element(by.css('#s99st-message-channel-title-required')),
        channelCreated: this.divRoot.element(by.css('#s99st-message-channel-created'))
    };

    this.preview = {
        title: this.divRoot.element(by.css('div#preview div.s99st-channel-item .s99st-channel-title'))
    }
};

module.exports = new ChannelCreatePage();
