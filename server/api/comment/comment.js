/*
* @Author: yglin
* @Date:   2016-05-05 17:59:10
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-06 17:18:41
*/

'use strict';
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';
var HttpStatus = require('http-status-codes');


module.exports = {
    query: query,
    create: create
}

function query(req, res) {
    var Comment = req.locals.Comment;
    var whereConditions = {};
    whereConditions.post_id = req.locals.post_id;
    Comment.findAll({where: whereConditions})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function create(req, res) {
    var Comment = req.locals.Comment;
    var comment = Comment.build({
        content: req.body.content,
        author: req.body.author,
        post_id: req.locals.post_id
    });
    comment.save()
    .then(respondWithResult(res, HttpStatus.CREATED))
    .catch(handleError(res));   
}