/*
* @Author: yglin
* @Date:   2016-04-18 14:22:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-11 16:54:13
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
var place = require('../place');
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
router.use('/:channel_id/posts', channel.passChannelID, channel.isChannelClosed, post);
// redirect route to place
router.use('/:channel_id/places', channel.passChannelID, channel.isChannelClosed, place);

module.exports = router;
