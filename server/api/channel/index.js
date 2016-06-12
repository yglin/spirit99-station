/*
* @Author: yglin
* @Date:   2016-04-18 14:22:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-12 17:10:50
*/

'use strict';

var Q = require('q');
var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
import * as auth from '../../auth/auth.service';
var channel = require('./channel');
var channelDBs = require('../../sqldb/channels');
var post = require('../post');
import {Channel} from '../../sqldb';
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';

router.get('/', channel.query);
router.get('/:id', channel.query);
router.get('/:id/portal', channel.portal);
router.post('/validate-id', channel.validateID);
router.post('/', auth.isAuthenticated(), channel.create);
router.put('/:id', auth.isAuthenticated(), channel.update);
// router.delete('/:id', auth.isAuthenticated(), channel.delete);

// redirect route to post
router.use('/:channel_id/posts', function (req, res, next) {
    // Check if channel is closed
    Channel.findById(req.params.channel_id)
    .then(handleEntityNotFound(res))
    .then(function (channel) {
        if (channel.state == 'closed') {
            res.status(HttpStatus.CONFLICT);
            res.send('Channel is closed');
            return Q.reject();
        }
        else {
            return Q.resolve();
        }
    })
    .then(function () {
        if (!req.locals) {
            req.locals = {};
        }

        req.locals.channel_id = req.params.channel_id;
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
    })
    .catch(function () {
        return;
    });
}, post);

module.exports = router;
