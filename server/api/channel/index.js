/*
* @Author: yglin
* @Date:   2016-04-18 14:22:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 19:45:50
*/

'use strict';

var channel = require('./channel');
var express = require('express');
var router = express.Router();
import * as auth from '../../auth/auth.service';

router.get('/', channel.query);
router.get('/:id', channel.query);
router.post('/validate-id', channel.validateID);
router.post('/', auth.isAuthenticated(), channel.create);
router.put('/:id', auth.isAuthenticated(), channel.update);

module.exports = router;
