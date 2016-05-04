'use strict';

var HttpStatus = require('http-status-codes');
import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
import channel from '../channel';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
// router.get('/:user_id/channels/:channel_id', auth.isAuthenticated(), queryChannels);

router.use('/:user_id/channels',
function (req, res, next) {
    if (!req.locals) {
        req.locals = {};
    }
    req.locals.user_id = req.params.user_id;
    next();
},
auth.isAuthenticated(),
function (req, res, next) {
    if (req.user._id != req.locals.user_id) {
        console.error('User ID not match, ' + req.user._id + ' != ' + req.locals.user_id);
        res.status(HttpStatus.UNAUTHORIZED).end();
        return;
    }
    next();
},
channel);

module.exports = router;
