/*
* @Author: yglin
* @Date:   2016-05-05 17:57:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-06 17:15:11
*/

'use strict';

var express = require('express');
var router = express.Router();

var comment = require('./comment');

router.get('/', comment.query);
router.post('/', comment.create);

module.exports = router;