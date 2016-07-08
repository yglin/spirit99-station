/*
* @Author: yglin
* @Date:   2016-04-02 14:34:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-08 19:52:19
*/

'use strict';

var Q = require('q');
var exec = require('child_process').exec;
var HttpStatus = require('http-status-codes');
import {Channel} from '../../sqldb';
import {createDB, deleteDB} from '../../sqldb/channels';
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';

module.exports = {
    query: query,
    create: create,
    update: update,
    // delete: _delete,
    validateID: validateID,
    portal: portal
}

function query(req, res) {
    var whereConditions = {};
    if (req.locals && req.locals.user_id) {
        whereConditions.owner_id = req.locals.user_id;
    }
    else {
        whereConditions.state = 'public';
    }

    if (req.params.id) {
        whereConditions.id = req.params.id;
    }
    
    return Channel.findAll({where: whereConditions})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function create(req, res) {
    // console.log(req.body.id);
    req.on('close', function (error) {
        req.requestCancelled = true;
        console.error('request cancelled~!! ');
    });

    var channel = Channel.build({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        'logo-url': req.body['logo-url'],
        categories: req.body.categories,
        owner_id: req.user._id,
        state: req.body.state
    });

    return channel.save()
    .then(function (entity) {
        return createDB(channel).then(function () {
            return Q.resolve(entity);
        });
    })
    .then(respondWithResult(res, 201))
    .finally(function () {
        if (req.requestCancelled) {
            channel.destroy();
            // .then(function () {
            //     return deleteDB(channel);
            // });
        }        
    })
    .catch(handleError(res))
}

function update(req, res) {
    if (req.body.id) {
        delete req.body.id;
    }
    if (req.body.owner_id) {
        delete req.body.owner_id;
    }
    return Channel.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(handleEntityNotBelonging(res, req.user._id, 'owner_id'))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// function _delete(req, res) {
//     return Channel.findById(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(handleEntityNotBelonging(res, req.user._id, 'owner_id'))
//     .then(saveUpdates({state: 'closed'}))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

function validateID(req, res) {
    var channelID = req.body.value;
    var result = {};
    Channel.findById(channelID)
    .then(function(channel) {
        if (channel) {
            // Channel already exist
            result.isValid = false;
        }
        else {
            result.isValid = true;
        }
        result.value = channel;
        res.status(HttpStatus.OK).json(result);    
    });
}

function portal(req, res) {
    Channel.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function (channel) {
        var portalData = {
            id: channel.id,
            title: channel.title,
            description: channel.description,
            'logo-url': channel['logo-url'],
            categories: channel.categories
        };
        var hostUrl = '//' + req.headers.host;
        portalData['query-url'] = hostUrl + '/api/channels/' + channel.id + '/posts';
        portalData['create-url'] = hostUrl + '/' + channel.id + '/posts/create';
        portalData['portal-url'] = hostUrl + req.originalUrl;
        return Q.resolve(portalData);
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

