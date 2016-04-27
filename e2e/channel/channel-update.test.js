/*
* @Author: yglin
* @Date:   2016-04-21 12:53:07
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-27 09:24:58
*/

'use strict';

var config = browser.params;
import {mainDB} from '../../server/config/seed-data'

describe('ChannelUpdate View', function() {
    // var page;
    var loginPage = require('../account/login/login.po');
    var channelEditor = require('./channel-editor.po');
    var testChannel = mainDB.channels[0];
    var testUser = mainDB.users[0];
    
    beforeEach(function() {
        browser.get(config.baseUrl + '/channels/update/' + testChannel.id);

        // Login as needed
        loginPage.loginAsNeeded(testUser, '/channels/update/' + testChannel.id);
    });

    it(' - Update channel data', function() {
        var updateData = JSON.parse(JSON.stringify(testChannel));
        delete updateData.id;
        updateData.title = 'GaGaULaLa';
        updateData.description = 'Update this shit';
        updateData['logo-url'] = 'http://pbs.twimg.com/profile_images/1734143502/gipple_bot_normal.jpg';
        updateData.categories = {};
        channelEditor.apply(updateData);
        channelEditor.submit();
        browser.refresh();
        channelEditor.expect(updateData);
    });
});