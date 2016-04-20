/*
* @Author: yglin
* @Date:   2016-04-11 19:38:58
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-20 20:32:35
*/

'use strict';

var config = browser.params;
var exec = require('child_process').exec;

describe('ChannelCreate View', function() {
    var page, loginPage;
    var imageSelector;
    var channelListPage;
    var testChannel;
    var testUser;

    beforeEach(function() {
        page = require('./channel-create.po');
        loginPage = require('../../account/login/login.po');
        imageSelector = require('../../image-selector.po');
        channelListPage = require('../channel-list.po');
        testChannel = {
            id: 'ggyy',
            title: '唧唧歪歪',
            description: '唧唧歪歪雞雞歪歪',
            'logo-url': 'https://emos.plurk.com/92fe2c75e52cd5dc99f6e98f6f50d5aa_w48_h48.jpeg'
        };

        testUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        };

        browser.get(config.baseUrl + '/channels/create');
    });

    it(' - Create a channel', function() {
        // Should redirect to login page
        expect(browser.getCurrentUrl()).toEqual(config.baseUrl + '/login');
        loginPage.login(testUser);

        // Should redirect back to channel create page
        expect(browser.getCurrentUrl()).toEqual(config.baseUrl + '/channels/create');

        page.form.id.sendKeys(testChannel.id);
        page.form.title.sendKeys(testChannel.title);
        page.form.description.sendKeys(testChannel.description);
        page.form.buttonLogo.click();
        browser.wait(function() {
            return imageSelector.divRoot.isDisplayed();
        }, 2000);
        imageSelector.url.sendKeys(testChannel['logo-url']);
        // browser.pause(54088);
        browser.wait(function() {
            return imageSelector.confirm.isEnabled();
        }, 2000);
        imageSelector.confirm.click();
        page.form.buttonSubmit.click();
        // browser.wait(function() {
        //     return page.messages.channelCreated.isDisplayed();
        // }, 2000);
        browser.wait(function(){
            return browser.getCurrentUrl().then(function (url) {
                return url == config.baseUrl + '/channels';
            });
        }, 5000);
        expect(channelListPage.channelItems.last().element(by.css('.s99-channel-title')).getText()).toEqual(testChannel.title);
    });

    describe(' - Warnings for invalid user inputs', function() {
        
        it(' - Channel ID is required', function() {
            page.form.id.clear();
            page.form.buttonSubmit.click();
            expect(page.messages.channelIDRequired.isDisplayed()).toBe(true);
        });

        it(' - Channel ID is already exist', function() {
            page.form.id.clear();
            page.form.id.sendKeys(testChannel.id);
            expect(page.messages.channelIDExist.isDisplayed()).toBe(true);
        });        
        
        it(' - Channel ID can be only alphanumeric', function() {
            page.form.id.clear();
            page.form.id.sendKeys('雞雞歪歪');
            expect(page.messages.channelIDFalsePattern.isDisplayed()).toBe(true);
        });        
        
        it(' - Channel title is required', function() {
            page.form.title.clear();
            page.form.buttonSubmit.click();
            expect(page.messages.channelTitleRequired.isDisplayed()).toBe(true);
        });
    });

    afterAll(function () {
        var cmdCleanupDatabase = 'mysql -uyglin -pturbogan -e "DROP DATABASE IF EXISTS ' + testChannel.id + ';DELETE FROM station.channel WHERE id=\'' + testChannel.id + '\';"';
        exec(cmdCleanupDatabase, function (error, stdout, stderr) {
            if(error) {
                console.log('Fail to clean up database!!');
                console.log(cmdCleanupDatabase);
                console.log('Error ==========================');
                console.log(error);
                console.log('Stdout =========================');
                console.log(stdout);
                console.log('Stderr =========================');
                console.log(stderr);
                console.log('================================');                
            }
        });
    });
});
