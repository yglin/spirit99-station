/*
* @Author: yglin
* @Date:   2016-04-27 16:28:00
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 15:49:35
*/

'use strict';

var post = require('./post');
var express = require('express');
var router = express.Router();
import * as auth from '../../auth/auth.service';

// router.get('/', post.query);
router.get('/:id', post.get);
router.post('/', post.create);
router.put('/:id', auth.isAuthenticated(), post.update);

module.exports = router;
