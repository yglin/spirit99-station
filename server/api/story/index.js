/*
* @Author: yglin
* @Date:   2016-04-27 16:28:00
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-16 14:11:10
*/

'use strict';

var express = require('express');
var router = express.Router();
import * as auth from '../../auth/auth.service';

var story = require('./story');
var comment = require('../comment');

router.get('/', story.getModel, story.query);
router.get('/:id', story.getModel, story.get);
router.story('/', story.getModel, story.create);
router.put('/:id', auth.isAuthenticated(), story.getModel, story.update);
router.delete('/:id', auth.isAuthenticated(), story.getModel, story.delete);

// redirect route to comments
router.use('/:story_id/comments', story.passStoryID, comment);

module.exports = router;
