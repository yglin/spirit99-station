/*
* @Author: yglin
* @Date:   2016-04-21 12:53:07
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-21 13:24:24
*/

'use strict';

var config = browser.params;
import {channels, users} from '../../mocks/data';

describe('ChannelUpdate View', function() {
    // var page;
    var toolbar;
    var myChannels;
    var testChannel = channels[0];
    var testUser = users[0];
    
    beforeEach(function() {
        // page = require('./channel-update.po');

        browser.get(config.baseUrl + '/channels/update/' + testChannel);

        // Login as needed
        browser.getCurrentUrl().then(function (url) {
            if (url == config.baseUrl + '/login') {
                loginPage.login(testUser);
                // Should redirect back to channel create page
                expect(browser.getCurrentUrl()).toEqual(config.baseUrl + '/channels/create');
            }
        });
    });

    it('TODO', function() {
        fail('To be continued...');
    });
});