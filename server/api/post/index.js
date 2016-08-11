/*
* @Author: yglin
* @Date:   2016-04-27 16:28:00
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-11 15:11:38
*/

'use strict';

var express = require('express');
var router = express.Router();
import * as auth from '../../auth/auth.service';

var post = require('./post');
// var comment = require('../comment');

// router.get('/', post.getModel, post.query);
// router.get('/:id', post.getModel, post.get);
// router.post('/', post.getModel, post.create);
// router.put('/:id', auth.isAuthenticated(), post.getModel, post.update);
// router.delete('/:id', auth.isAuthenticated(), post.getModel, post.delete);

// // redirect route to comments
// router.use('/:post_id/comments', post.passPostID, comment);

module.exports = router;
