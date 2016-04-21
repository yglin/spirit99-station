/*
* @Author: yglin
* @Date:   2016-04-11 19:37:25
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-21 12:42:26
*/

'use strict';

var ChannelCreatePage = function() {
    var self = this;
    var imageSelector = require('../../image-selector.po');

    self.divRoot = element(by.css('div#s99st-channel-create'));
    self.form = {
        id: self.divRoot.element(by.css('input[name=id]')),
        title: self.divRoot.element(by.css('input[name=title]')),
        description: self.divRoot.element(by.css('textarea[name=description]')),
        buttonLogo: self.divRoot.element(by.css('#s99st-button-select-logo')),
        categoryTitle: self.divRoot.element(by.css('input#category-title')),
        categoryIcon: self.divRoot.element(by.css('div#category-icon')),
        checkPublic: self.divRoot.element(by.css('#checkbox-public')),
        buttonAddCategory: self.divRoot.element(by.css('button#category-add')),
        buttonSubmit: self.divRoot.element(by.css('#s99st-button-submit-create'))
    };

    self.messages = {
        channelIDRequired: self.divRoot.element(by.css('#s99st-message-channel-id-required')),
        channelIDExist: self.divRoot.element(by.css('#s99st-message-channel-id-exists')),
        channelIDFalsePattern: self.divRoot.element(by.css('#s99st-message-channel-id-false-pattern')),
        channelTitleRequired: self.divRoot.element(by.css('#s99st-message-channel-title-required')),
        channelCreated: self.divRoot.element(by.css('#s99st-message-channel-created'))
    };

    self.preview = {
        title: self.divRoot.element(by.css('div#preview div.s99st-channel-item .s99st-channel-title'))
    }

    self.create = function (channel) {
        self.form.id.sendKeys(channel.id);
        self.form.title.sendKeys(channel.title);
        self.form.description.sendKeys(channel.description);
        self.form.buttonLogo.click();
        imageSelector.select(channel['logo-url']);
        if (channel.categories && channel.categories.length > 0) {
            for (var i = 0; i < channel.categories.length; i++) {
                self.form.categoryTitle.sendKeys(channel.categories[i].title);
                self.form.categoryIcon.click();
                imageSelector.select(channel.categories[i].icon.url);
                self.form.buttonAddCategory.click();
            }
        }
        if (channel.public) {
            self.form.checkPublic.click();
        }
        self.form.buttonSubmit.click();        
    }
};

module.exports = new ChannelCreatePage();
