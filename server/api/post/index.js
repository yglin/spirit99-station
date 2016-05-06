/*
* @Author: yglin
* @Date:   2016-04-27 16:28:00
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-05 18:01:33
*/

'use strict';

var express = require('express');
var router = express.Router();
import * as auth from '../../auth/auth.service';
var channelDBs = require('../../sqldb/channels')

var post = require('./post');
var comment = require('../comment');

// router.get('/', post.query);
router.get('/:id', post.get);
router.post('/', post.create);
router.put('/:id', auth.isAuthenticated(), post.update);

// redirect route to comments
router.use('/:post_id/comments', function (req, res, next) {
    if (!req.locals || !req.locals.channel_id) {
        var error_msg = 'Not specified channel id in url: ' + req.originalUrl;
        console.error(error_msg);
        res.status(HttpStatus.BAD_REQUEST)
        .send(error_msg);
        return;        
    }

    req.locals.post_id = req.params.post_id;
    req.locals.Comment = channelDBs.getModel(req.locals.channel_id, 'comment');
    if (req.locals.Comment) {
        next();
    }
    else {
        var error_msg = 'Comment model not available in channel: ' + req.params.channel_id;
        console.error(error_msg);
        res.status(HttpStatus.NOT_FOUND)
        .send(error_msg);
        return;        
    }    
}, comment);

module.exports = router;
