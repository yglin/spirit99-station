/*
* @Author: yglin
* @Date:   2016-05-04 15:54:17
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 16:16:24
*/

'use strict';

var HttpStatus = require('http-status-codes');

module.exports = {
    respondWithResult: respondWithResult,
    handleError: handleError,
    handleEntityNotFound: handleEntityNotFound,
    handleEntityNotBelonging: handleEntityNotBelonging,
    saveUpdates: saveUpdates
}

function respondWithResult(res, statusCode) {
    statusCode = statusCode || HttpStatus.OK;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
        else {
            return Q.reject('Nothing to be responsed, entity = ' + entity);
        }
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    return function(err) {
        console.error(err);
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
        return entity.updateAttributes(updates)
        .then(updated => {
            return updated;
        });
    };
}
