/*
* @Author: yglin
* @Date:   2016-05-03 19:58:17
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 20:01:14
*/

'use strict';

var config = browser.params;
var util = require('../util');
var seedData = require('../../server/config/seed-data');
var mocksData = require('../mocks/data');

var editor = require('./editor.po');
var viewer = require('./viewer.po');
var login = require('../account/login/login.po');

describe('Update Post View', function() {
    var testUser, testChannel, updateData, testPostID;
    
    beforeEach(function() {
        testUser = seedData.mainDB.users[0];
        testPostID = 1;
        testChannel = seedData.mainDB.channels[0];
        updateData = mocksData.posts[0];
        browser.get(config.baseUrl + '/' + testChannel.id + '/posts/update/' + testPostID);
        login.loginAsNeeded(testUser, '/' + testChannel.id + '/posts/update/' + testPostID);
    });

    it(' - Update a post and verify it', function() {
        // browser.pause(54088);
        editor.apply(updateData);
        editor.submit();
        util.waitForRedirect(config.baseUrl + '/' + testChannel.id + '/posts/' + testPostID);
        viewer.equalToPost(updateData);
    });
});