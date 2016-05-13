/*
* @Author: yglin
* @Date:   2016-04-27 16:22:20
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-13 16:21:28
*/

'use strict';

var Q = require('q');
var HttpStatus = require('http-status-codes');
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';

module.exports = {
    query: query,
    get: get,
    create: create, 
    update: update   
}

function query(req, res) {
    var whereConditions = {};

    if('bounds' in req.query){
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
    var whereConditions = {};
    whereConditions._id = req.params.id;
    if (req.locals && req.locals.user_id) {
        whereConditions.owner_id = req.locals.user_id;
    }
    var Post = req.locals.Post;
    Post.findOne({where: whereConditions, raw: true})
    .then(handleEntityNotFound(res))
    .then(function (post) {
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