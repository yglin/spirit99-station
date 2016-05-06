/*
* @Author: yglin
* @Date:   2016-05-05 11:25:36
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-05 11:38:02
*/

'use strict';

var config = browser.params;
var seedData = require('../../server/config/seed-data');
var mocksData = require('../mocks/data');

describe('Comment Create', function() {
    var editor, viewer, testChannel, testPostID, testComment;
    
    beforeEach(function() {
        testChannel = seedData.mainDB.channels[0];
        testPostID = 11;
        testComment = mocksData.comments[0];
        browser.get(config.baseUrl + '/' + testChannel.id + '/posts/' + testPostID);

        editor = require('./editor.po');
        viewer = require('./viewer.po');
    });

    it(' - Create a comment and verify it', function() {
        editor.apply(testComment);
        editor.submit();
        viewer.has(testComment);
    });
});