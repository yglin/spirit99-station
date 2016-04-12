/*
* @Author: yglin
* @Date:   2016-04-11 19:37:25
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 17:37:05
*/

'use strict';

var ChannelCreatePage = function() {
    this.divRoot = element(by.css('#s99st-div-channel-create'));
    this.form = {
        channel: {
            id: element(by.css('input#s99st-input-channel-id')),
            title: element(by.css('input#s99st-input-channel-title')),
        },
        messages: {
            channelIDRequired: element(by.css('#s99st-message-channel-id-required')),
            channelIDExist: element(by.css('#s99st-message-channel-id-exists')),
            channelTitleRequired: element(by.css('#s99st-message-channel-title-required'))
        },
        buttonLogo: element(by.css('#s99st-button-select-logo')),
        buttonSubmit: element(by.css('#s99st-button-submit-create'))
    };

    this.imageSelector = {
        divRoot: element(by.css('div#s99st-image-selector'))
    };

    this.preview = {
        channel: {
            title: element(by.css('div#preview div.s99st-channel-item .s99st-channel-title'))
        }
    }
};

module.exports = new ChannelCreatePage();
