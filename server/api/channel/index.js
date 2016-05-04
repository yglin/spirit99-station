/*
* @Author: yglin
* @Date:   2016-04-18 14:22:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 16:24:38
*/

'use strict';

var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
import * as auth from '../../auth/auth.service';
var channel = require('./channel');
var channelDBs = require('../../sqldb/channels');
var post = require('../post');

router.get('/', channel.query);
router.get('/:id', channel.query);
router.post('/validate-id', channel.validateID);
router.post('/', auth.isAuthenticated(), channel.create);
router.put('/:id', auth.isAuthenticated(), channel.update);

// redirect route to post
router.use('/:channel_id/posts', function (req, res, next) {
    if (!req.locals) {
        req.locals = {};
    }

    req.locals.Post = channelDBs.getModel(req.params.channel_id, 'post');
    if (req.locals.Post) {
        next();
    }
    else {
        var error_msg = 'Post model not available in channel: ' + req.params.channel_id;
        console.error(error_msg);
        res.status(HttpStatus.NOT_FOUND)
        .send(error_msg);
        return;        
    }
}, post);

module.exports = router;
