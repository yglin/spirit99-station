/*
* @Author: yglin
* @Date:   2016-04-27 16:22:20
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 20:57:13
*/

'use strict';

var HttpStatus = require('http-status-codes');
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';

module.exports = {
    get: get,
    create: create, 
    update: update   
}

function get(req, res) {
    var whereConditions = {};
    whereConditions._id = req.params.id;
    if (req.locals && req.locals.user_id) {
        whereConditions.owner_id = req.locals.user_id;
    }
    var Post = req.locals.Post;
    Post.findOne({where: whereConditions})
    .then(function (post) {
        if (post) {
            res.status(HttpStatus.OK).json(post);
        }
        else {
            res.status(HttpStatus.NOT_FOUND).end();
        }
    }, function (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(error);
    })
}

function create(req, res) {
    var Post = req.locals.Post;

    var user_id = null;
    if (req.user && req.user._id) {
        user_id = req.user._id;
    }
    
    var post = Post.build({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        owner_id: user_id
    });

    return post.save()
    .then(function (entity) {
        res.status(HttpStatus.CREATED)
        .json(entity);
    }, function (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(error);
    });
}

function update(req, res) {
    var Post = req.locals.Post;
    if (req.body.id) {
        delete req.body.id;
    }
    if (req.body.owner_id) {
        delete req.body.owner_id;
    }
    return Post.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(handleEntityNotBelonging(res, req.user._id, 'owner_id'))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}