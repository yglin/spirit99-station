/*
* @Author: yglin
* @Date:   2016-04-11 11:35:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-11 11:50:24
*/

'use strict';

var config = browser.params;

describe('ChannelList View', function() {
    var page;
    
    beforeEach(function() {
        browser.get(config.baseUrl + '/');
        page = require('./channel-list.po');
    });

    it('TODO', function() {
        fail('To be continued...');
    });
});