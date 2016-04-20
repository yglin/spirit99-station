/*
* @Author: yglin
* @Date:   2016-04-18 14:22:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-20 15:55:33
*/

'use strict';

var channel = require('./channel');
var express = require('express');
var router = express.Router();
import * as auth from '../../auth/auth.service';

router.get('/', channel.query);
router.post('/validate-id', channel.validateID);
router.post('/', auth.isAuthenticated(), channel.create);

module.exports = router;
