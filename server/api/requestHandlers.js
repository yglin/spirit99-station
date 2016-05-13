/*
* @Author: yglin
* @Date:   2016-05-04 15:54:17
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-13 10:11:57
*/

'use strict';

var Q = require('q');
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
            return Q.resolve(entity);
        }
        else {
            return Q.reject({
                errorMsg: 'Nothing to be responsed, entity = ' + entity,
                statusCode: HttpStatus.NOT_FOUND
            });
        }
    };
}

function handleError(res, statusCode) {
    return function(error) {
        console.error(error);
        statusCode = statusCode || error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send(error);
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity || entity.length == 0) {
            var errorMsg = 'Not found any, entity = ' + entity.toString();
            return Q.reject({
                message: errorMsg,
                statusCode: HttpStatus.NOT_FOUND
            });
        }
        else {
            return Q.resolve(entity);
        }
    };
}

function handleEntityNotBelonging(res, user_id, owner_field) {
    return function (entity) {
        if (entity[owner_field] !== user_id) {
            var errorMsg = 'Permission denied';
            return Q.reject({
                message: errorMsg,
                statusCode: HttpStatus.UNAUTHORIZED
            });
        }
        return Q.resolve(entity);
    }
}

function saveUpdates(updates) {
    return function(entity) {
        return entity.updateAttributes(updates)
        .then(updated => {
            return Q.resolve(updated);
        });
    };
}
