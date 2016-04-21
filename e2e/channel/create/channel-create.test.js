/*
* @Author: yglin
* @Date:   2016-04-11 19:38:58
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-21 20:40:12
*/

'use strict';

var config = browser.params;
var exec = require('child_process').exec;
import {channels, users} from '../../mocks/data';

describe('ChannelCreate View', function() {
    var page, loginPage;
    var channelListPage;
    var testChannel = channels[0];
    var testUser = users[0];

    beforeEach(function() {
        page = require('./channel-create.po');
        loginPage = require('../../account/login/login.po');
        channelListPage = require('../channel-list.po');

        browser.get(config.baseUrl + '/channels/create');

        // Login as needed
        browser.getCurrentUrl().then(function (url) {
            if (url == config.baseUrl + '/login') {
                loginPage.login(testUser);
                // Should redirect back to channel create page
                expect(browser.getCurrentUrl()).toEqual(config.baseUrl + '/channels/create');
            }
        });
    });

    it(' - Create a channel', function() {
        page.create(testChannel);

        browser.wait(function(){
            return browser.getCurrentUrl().then(function (url) {
                return url == config.baseUrl + '/channels';
            });
        }, 5000);
        var newChannels = channelListPage.channelItems.filter(function (elem, index) {
            return elem.element(by.css('.s99-channel-title')).getText().then(function (text) {
                return text == testChannel.title;
            });
        });
        expect(newChannels.count()).toBe(1);
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
        var cmdCleanupDatabase = 'mysql -uyglin -pturbogan -e "DROP DATABASE IF EXISTS ' + testChannel.id + ';"';
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
