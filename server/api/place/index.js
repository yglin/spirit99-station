/*
* @Author: yglin
* @Date:   2016-08-09 11:48:28
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-11 16:19:36
*/

'use strict';

var express = require('express');
var router = express.Router();
import * as auth from '../../auth/auth.service';
var place = require('./place');

router.get('/', place.getModel, place.query);
// router.get('/:id', post.getModel, post.get);
// router.post('/', post.getModel, post.create);
// router.put('/:id', auth.isAuthenticated(), post.getModel, post.update);
// router.delete('/:id', auth.isAuthenticated(), post.getModel, post.delete);

module.exports = router;
