/*
* @Author: yglin
* @Date:   2016-04-11 19:38:58
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-25 14:49:20
*/

'use strict';

var config = browser.params;
var exec = require('child_process').exec;
import {channels, users} from '../mocks/data';

describe('ChannelCreate View', function() {
    var channelEditor, loginPage;
    var channelListPage;
    var testChannel = channels[0];
    var testUser = users[0];

    beforeEach(function() {
        channelEditor = require('./channel-editor.po');
        loginPage = require('../account/login/login.po');
        channelListPage = require('./channel-list.po');

        browser.get(config.baseUrl + '/channels/create');

        loginPage.loginAsNeeded(testUser, '/channels/create');
    });

    it(' - Create a channel', function() {
        channelEditor.apply(testChannel);
        channelEditor.submit();

        expect(browser.getCurrentUrl()).toEqual(config.baseUrl + '/channels');

        var newChannels = channelListPage.channelItems.filter(function (elem, index) {
            return elem.element(by.css('.s99-channel-title')).getText().then(function (text) {
                return text == testChannel.title;
            });
        });

        expect(newChannels.count()).toBe(1);
    });

    describe(' - Invalid user inputs', function() {
        
        it(' - Channel ID is required', function() {
            channelEditor.id.clear();
            channelEditor.buttonSubmit.click();
            expect(channelEditor.buttonSubmit.isEnabled()).toBe(false);
            expect(channelEditor.messages.channelIDRequired.isDisplayed()).toBe(true);
        });

        it(' - Channel ID is already exist', function() {
            channelEditor.id.clear();
            channelEditor.id.sendKeys(testChannel.id);
            channelEditor.buttonSubmit.click();
            expect(channelEditor.buttonSubmit.isEnabled()).toBe(false);
            expect(channelEditor.messages.channelIDExist.isDisplayed()).toBe(true);
        });        
        
        it(' - Channel ID can be only alphanumeric', function() {
            channelEditor.id.clear();
            channelEditor.id.sendKeys('雞雞歪歪');
            channelEditor.buttonSubmit.click();
            expect(channelEditor.buttonSubmit.isEnabled()).toBe(false);
            expect(channelEditor.messages.channelIDFalsePattern.isDisplayed()).toBe(true);
        });        
        
        it(' - Channel title is required', function() {
            channelEditor.title.clear();
            channelEditor.buttonSubmit.click();
            expect(channelEditor.buttonSubmit.isEnabled()).toBe(false);
            expect(channelEditor.messages.channelTitleRequired.isDisplayed()).toBe(true);
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
