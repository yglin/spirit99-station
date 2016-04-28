/*
* @Author: yglin
* @Date:   2016-04-27 20:19:45
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-27 20:22:32
*/

'use strict';

var debug = require('./debug');
var express = require('express');
var router = express.Router();

router.get('/timeout', debug.timeout);

module.exports = router;
