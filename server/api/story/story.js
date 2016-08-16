/*
* @Author: yglin
* @Date:   2016-04-27 16:22:20
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-16 14:10:48
*/

'use strict';

var Q = require('q');
var HttpStatus = require('http-status-codes');
var channelDBs = require('../../sqldb/channels');
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';

module.exports = {
    getModel: getModel,
    passStoryID: passStoryID,
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
        req.locals.Story = channelDBs.getModel(req.locals.channel_id, 'story');
        if (!req.locals.Story) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Can not retrive model Story of channel ' + req.locals.channel_id).end();
        }
        else {
            next();
        }
    }
}

function passStoryID(req, res, next) {
    if (!req.locals) {
        req.locals = {};
    }
    req.locals.story_id = req.params.story_id;
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

    var Story = req.locals.Story;
    Story.findAll({where: whereConditions, raw: true})
    .then(handleEntityNotFound(res))
    .then(function (storys) {
        for (var i = 0; i < storys.length; i++) {
            var hostUrl = req.protocol + '://' + req.headers.host;
            storys[i].links = {
                'read': hostUrl + '/' + req.locals.channel_id + '/storys/' + storys[i]._id
            };
        }
        return Q.resolve(storys);
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
    var Story = req.locals.Story;
    Story.findOne({
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
    .then(function (story) {
        story = story.get();
        var hostUrl = req.protocol + '://' + req.headers.host;
        story.links = {
            'read': hostUrl + '/' + req.locals.channel_id + '/storys/' + story._id
        };
        return Q.resolve(story);
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function create(req, res) {
    var Story = req.locals.Story;

    var user_id = null;
    if (req.user && req.user._id) {
        user_id = req.user._id;
    }
    
    var story = Story.build({
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

    return story.save()
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
    var Story = req.locals.Story;
    if (req.body.id) {
        delete req.body.id;
    }
    if (req.body.owner_id) {
        delete req.body.owner_id;
    }
    return Story.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(handleEntityNotBelonging(res, req.user._id, 'owner_id'))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function _delete(req, res) {
    var Story = req.locals.Story;
    return Story.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(handleEntityNotBelonging(res, req.user._id, 'owner_id'))
    .then(saveUpdates({state: 'deleted'}))
    .then(respondWithResult(res))
    .catch(handleError(res));
}