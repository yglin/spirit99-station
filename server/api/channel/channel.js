/*
* @Author: yglin
* @Date:   2016-04-02 14:34:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-23 15:59:03
*/

'use strict';

var Q = require('q');
var exec = require('child_process').exec;
var HttpStatus = require('http-status-codes');
import {Channel} from '../../sqldb'

module.exports = {
    query: query,
    create: create,
    update: update,
    validateID: validateID,
}

function query(req, res) {
    var whereConditions = {};
    if (req.params.user_id) {
        if (req.params.channel_id) {
            whereConditions.id = req.params.channel_id;
        }
        whereConditions.owner_id = req.params.user_id;
    }
    else {
        whereConditions.state = 'public';
    }
    Channel.findAll({ where: whereConditions}).then(function(channels) {
        if (!channels || !channels.length || channels.length == 0) {
            handleError(res, HttpStatus.NOT_FOUND)();
        }
        else {
            respondWithResult(res, HttpStatus.OK)(channels);
        }
    }, handleError(res));
}

function create(req, res) {
    // console.log(req.body.id);
    return createDB(req.body.id)
    .then(function () {
        // console.log(req.user);
        var channel = Channel.build({
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            'logo-url': req.body['logo-url'],
            categories: req.body.categories,
            owner_id: req.user._id,
            state: req.body.public ? 'public' : 'private'
        });
        return channel.save();
    }, handleError(res))
    .then(respondWithResult(res, 201), handleError(res))
    .catch(handleError(res));
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

function respondWithResult(res, statusCode) {
    statusCode = statusCode || HttpStatus.OK;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(HttpStatus.NOT_FOUND).end();
            return null;
        }
        return entity;
    };
}

function handleEntityNotBelonging(res, user_id, owner_field) {
    return function (entity) {
        if (entity[owner_field] !== user_id) {
            res.status(HttpStatus.UNAUTHORIZED).send('This is not your channel, can not update it');
            return null;
        }
        return entity;
    }
}

function saveUpdates(updates) {
    return function(entity) {
        console.log(entity);
        console.log('Will save');
        console.log(updates);
        return entity.updateAttributes(updates)
        .then(updated => {
            return updated;
        });
    };
}


function createDB(name) {
    // var defer = Q.defer();
    // var cmds;
    // cmds = 'mysqldump -u' + dbConfig.station.username + ' -p' + dbConfig.station.password + ' -d channel_structure > /tmp/channel.structure.sql';
    // cmds += ' && ';
    // cmds += 'mysqladmin -u' + dbConfig.station.username + ' -p' + dbConfig.station.password + ' create ' + name;
    // cmds += ' && ';
    // cmds += 'mysql -u' + dbConfig.station.username + ' -p' + dbConfig.station.password + ' ' + name + ' < /tmp/channel.structure.sql';

    // exec(cmds, function (error, stdout, stderr) {
    //     if (error) {
    //         defer.reject(error);
    //     }
    //     else {
    //         defer.resolve(stdout);
    //     }
    // });
    // return defer.promise;
    return Q.resolve();
}

