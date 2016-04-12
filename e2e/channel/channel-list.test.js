/*
* @Author: yglin
* @Date:   2016-04-11 11:35:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 16:12:07
*/

'use strict';

var config = browser.params;

describe('ChannelList View', function() {
    var page;
    
    beforeEach(function() {
        browser.get(config.baseUrl + '/');
        page = require('./channel-list.po');
    });

    it(' - Clicking on button "Create" redirects to create channel page', function() {
        page.buttonCreate.click();
        expect(browser.getCurrentUrl()).toEqual(config.baseUrl + '/channels/create');
    });
});