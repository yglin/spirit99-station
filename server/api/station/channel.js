/*
* @Author: yglin
* @Date:   2016-04-02 14:34:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-12 11:45:26
*/

'use strict';

var dbConfig = require('../../config/db');
var Q = require('q');
var exec = require('child_process').exec;
var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
import {Channel} from './model/database.js'

router.post('/validate-id', validateID);
router.post('/', create);

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function create(req, res) {
    // console.log(req.body.id);
    return createDB(req.body.id)
    .then(function () {
        return Channel.create(req.body);
    }, handleError(res))
    .then(respondWithResult(res, 201), handleError(res))
    .catch(handleError(res));
}

function createDB(name) {
    var defer = Q.defer();
    var cmds;
    cmds = 'mysqldump -u' + dbConfig.station.username + ' -p' + dbConfig.station.password + ' -d channel_structure > /tmp/channel.structure.sql';
    cmds += ' && ';
    cmds += 'mysqladmin -u' + dbConfig.station.username + ' -p' + dbConfig.station.password + ' create ' + name;
    cmds += ' && ';
    cmds += 'mysql -u' + dbConfig.station.username + ' -p' + dbConfig.station.password + ' ' + name + ' < /tmp/channel.structure.sql';

    exec(cmds, function (error, stdout, stderr) {
        if (error) {
            defer.reject(error);
        }
        else {
            defer.resolve(stdout);
        }
    });
    return defer.promise;
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

module.exports = router;
