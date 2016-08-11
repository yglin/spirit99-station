/*
* @Author: yglin
* @Date:   2016-08-09 11:48:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-11 19:40:16
*/

'use strict';

var HttpStatus = require('http-status-codes');
var channelDBs = require('../../sqldb/channels');
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';

module.exports = {
    getModel: getModel,
    query: query
}

function getModel(req, res, next) {
    if (!req.locals || !req.locals.channel_id) {
        var error_msg = 'Not specified channel id in url: ' + req.originalUrl;
        console.error(error_msg);
        res.status(HttpStatus.BAD_REQUEST).send(error_msg).end();
        return;        
    }
    else {
        req.locals.Place = channelDBs.getModel(req.locals.channel_id, 'place');
        if (!req.locals.Place) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Can not retrive model Place of channel ' + req.locals.channel_id).end();
        }
        else {
            next();
        }
    } 
}

function query(req, res) {
    var Place = req.locals.Place;
    var Post = channelDBs.getModel(req.locals.channel_id, 'post');
    var whereConditions = {};

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

    // console.dir(Post);
    Place.findAll({
        where: whereConditions,
        include: [
            {
                model: Post,
                as: 'Posts'
            }
        ]
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}