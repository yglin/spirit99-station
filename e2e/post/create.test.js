/*
* @Author: yglin
* @Date:   2016-04-28 14:22:20
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 10:18:04
*/

'use strict';

var config = browser.params;
var seedData = require('../../server/config/seed-data');
var mocksData = require('../mocks/data');

describe('Create Post View', function() {
    var editPage, viewPage, testChannel, testPost;
    
    beforeEach(function() {
        editPage = require('./editor.po');
        viewPage = require('./viewer.po');
        testChannel = seedData.mainDB.channels[0];
        testPost = mocksData.posts[0];
        browser.get(config.baseUrl + '/' + testChannel.id + '/posts/create?latitude=' + testPost.latitude + '&longitude=' + testPost.longitude);
    });

    it(' - Create a post and verify it', function() {
        editPage.apply(testPost);
        editPage.submit();
        browser.waitForAngular();
        viewPage.equalToPost(testPost);
    });
});