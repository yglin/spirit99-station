/*
* @Author: yglin
* @Date:   2016-04-28 14:22:20
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 14:22:56
*/

'use strict';

var config = browser.params;

describe('Create Post View', function() {
    var page;
    
    beforeEach(function() {
        browser.get(config.baseUrl + '/');
        page = require('./editor.po');
    });

    it('TODO', function() {
        fail('To be continued...');
    });
});