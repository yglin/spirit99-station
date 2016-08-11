/*
* @Author: yglin
* @Date:   2016-04-27 16:22:20
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-11 20:25:54
*/

'use strict';

var Q = require('q');
var HttpStatus = require('http-status-codes');
var channelDBs = require('../../sqldb/channels');
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';

module.exports = {
    getModel: getModel,
    passPostID: passPostID,
    query: query,
    get: get,
    create: create, 
    update: update,
    delete: _delete
}

function getModel(req, res, next) {
    if (!req.locals || !req.locals.channel_id) {
        var error_msg = 'Not specified channel id in url: ' + req.originalUrl;
        console.error(error_msg);
        res.status(HttpStatus.BAD_REQUEST).send(error_msg).end();
    }
    else {
        req.locals.Post = channelDBs.getModel(req.locals.channel_id, 'post');
        if (!req.locals.Post) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Can not retrive model Post of channel ' + req.locals.channel_id).end();
        }
        else {
            next();
        }
    }
}

function passPostID(req, res, next) {
    if (!req.locals) {
        req.locals = {};
    }
    req.locals.post_id = req.params.post_id;
    next();
}

function query(req, res) {
    var whereConditions = {
        state: 'public'
    };

    if (req.locals && req.locals.user_id) {
        whereConditions.owner_id = req.locals.user_id;
    }

    if(req.query.bounds){
        var bounds = JSON.parse(req.query.bounds);
        // console.log(bounds);
        var latMin, latMax, lngMin, lngMax;
        if(bounds.northeast.latitude > bounds.southwest.latitude){
            latMin = bounds.southwest.latitude;
            latMax = bounds.northeast.latitude;
        }
        else{
            latMax = bounds.southwest.latitude;
            latMin = bounds.northeast.latitude;            
        }
        if(bounds.northeast.longitude > bounds.southwest.longitude){
            lngMin = bounds.southwest.longitude;
            lngMax = bounds.northeast.longitude;
        }
        else{
            lngMax = bounds.southwest.longitude;
            lngMin = bounds.northeast.longitude;
        }
        
        whereConditions.latitude = {
            $gt: latMin,
            $lt: latMax
        };
        whereConditions.longitude = {
            $gt: lngMin,
            $lt: lngMax
        };
    }

    // if (req.query.startAt) {
    //     whereConditions.startAt = {
    //         $lt: req.query.startAt
    //     }
    // }

    // if (req.query.endAt) {
    //     whereConditions.endAt = {
    //         $gt: req.query.endAt
    //     }
    // }

    var Post = req.locals.Post;
    Post.findAll({where: whereConditions, raw: true})
    .then(handleEntityNotFound(res))
    .then(function (posts) {
        for (var i = 0; i < posts.length; i++) {
            var hostUrl = req.protocol + '://' + req.headers.host;
            posts[i].links = {
                'read': hostUrl + '/' + req.locals.channel_id + '/posts/' + posts[i]._id
            };
        }
        return Q.resolve(posts);
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function get(req, res) {
    var Comment = channelDBs.getModel(req.locals.channel_id, 'comment');
    var whereConditions = {};
    whereConditions._id = req.params.id;
    if (req.locals && req.locals.user_id) {
        whereConditions.owner_id = req.locals.user_id;
    }
    var Post = req.locals.Post;
    Post.findOne({
        where: whereConditions,
        // raw: true,
        include: [
            {
                model: Comment,
                as: 'Comments'
            }
        ]
    })
    .then(handleEntityNotFound(res))
    .then(function (post) {
        post = post.get();
        var hostUrl = req.protocol + '://' + req.headers.host;
        post.links = {
            'read': hostUrl + '/' + req.locals.channel_id + '/posts/' + post._id
        };
        return Q.resolve(post);
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
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
        startAt: req.body.startAt,
        endAt: req.body.endAt,
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

function _delete(req, res) {
    var Post = req.locals.Post;
    return Post.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(handleEntityNotBelonging(res, req.user._id, 'owner_id'))
    .then(saveUpdates({state: 'deleted'}))
    .then(respondWithResult(res))
    .catch(handleError(res));
}