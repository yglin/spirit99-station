/*
* @Author: yglin
* @Date:   2016-04-11 19:38:58
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 15:46:58
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
            page.inputChannelID.clear();
            page.buttonSubmit.click();
            // browser.pause(54088);
            expect(page.warningChannelIDRequired.isDisplayed()).toBe(true);
        });

        it(' - Check if input channel ID is already exist', function() {
            // browser.pause(54088);
            page.inputChannelID.clear();
            page.inputChannelID.sendKeys('ggyy');
            expect(page.warningChannelIDExist.isDisplayed()).toBe(true);
            page.inputChannelID.clear();
            page.inputChannelID.sendKeys('ggyygg');
            expect(page.warningChannelIDExist.isDisplayed()).toBe(false);
        });        
    });

    describe(' - Input channel title', function() {
        
        it(' - Channel title is required', function() {
            page.inputChannelTitle.clear();
            page.buttonSubmit.click();
            // browser.pause(54088);
            expect(page.warningChannelTitleRequired.isDisplayed()).toBe(true);
        });
        
        it(' - Should preview channel title', function() {
            page.inputChannelTitle.clear();
            page.inputChannelTitle.sendKeys('It\'s a good day to die');
            expect(page.preview.channel.title.getText()).toEqual('It\'s a good day to die');
        });
    });

});
