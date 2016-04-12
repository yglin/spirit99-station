/*
* @Author: yglin
* @Date:   2016-04-11 19:38:58
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 18:13:40
*/

'use strict';

var config = browser.params;

describe('ChannelCreate View', function() {
    var page;
    
    beforeEach(function() {
        browser.get(config.baseUrl + '/channels/create');
        page = require('./channel-create.po');
    });

    describe(' - Input channel ID', function() {
        
        it(' - Channel ID is required', function() {
            page.form.channel.id.clear();
            page.form.buttonSubmit.click();
            // browser.pause(54088);
            expect(page.form.messages.channelIDRequired.isDisplayed()).toBe(true);
        });

        it(' - Check if input channel ID is already exist', function() {
            // browser.pause(54088);
            page.form.channel.id.clear();
            page.form.channel.id.sendKeys('ggyy');
            expect(page.form.messages.channelIDExist.isDisplayed()).toBe(true);
            page.form.channel.id.clear();
            page.form.channel.id.sendKeys('ggyygg');
            expect(page.form.messages.channelIDExist.isDisplayed()).toBe(false);
        });        
    });

    describe(' - Input channel title', function() {
        
        it(' - Channel title is required', function() {
            page.form.channel.title.clear();
            page.form.buttonSubmit.click();
            // browser.pause(54088);
            expect(page.form.messages.channelTitleRequired.isDisplayed()).toBe(true);
        });
        
        it(' - Should preview channel title', function() {
            page.form.channel.title.clear();
            page.form.channel.title.sendKeys('It\'s a good day to die');
            expect(page.preview.channel.title.getText()).toEqual('It\'s a good day to die');
        });
    });

    describe(' - Assign logo', function() {
        
        it(' - Should bring out image selector dialog', function() {
            page.form.buttonLogo.click();
            browser.wait(function() {
                return page.imageSelector.divRoot.isDisplayed();
            }, 2000);
        });
    });
});
