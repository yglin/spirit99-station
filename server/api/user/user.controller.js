'use strict';

import {User} from '../../sqldb';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import {respondWithResult, handleError, handleEntityNotFound, handleEntityNotBelonging, saveUpdates} from '../requestHandlers';

var HttpStatus = require('http-status-codes');
var Q = require('q');
var nodemailer = require('nodemailer');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

function encrypt(text){
    var cipher = crypto.createCipher(algorithm, config.secrets.session);
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
 
function decrypt(text){
    var decipher = crypto.createDecipher(algorithm, config.secrets.session)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        res.status(statusCode).json(err);
    }
}

// function handleError(res, statusCode) {
//     statusCode = statusCode || 500;
//     return function(err) {
//         res.status(statusCode).send(err);
//     };
// }

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
    return User.findAll({
        attributes: [
            '_id',
            'name',
            'email',
            'role',
            'provider'
        ]
    })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
    var newUser = User.build(req.body);
    newUser.provider = 'local';

    return newUser.save()
    .then(function(user) {
        var token = jwt.sign({ _id: user._id }, config.secrets.session, {
            expiresIn: 60 * 60 * 5
        });
        res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
    var userId = req.params.id;

    return User.find({
        where: {
            _id: userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
    return User.destroy({ _id: req.params.id })
        .then(function() {
            res.status(204).end();
        })
        .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    return User.find({
        where: {
            _id: userId
        }
    })
        .then(user => {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.save()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            }
            else {
                res.status(403);
                res.send({
                    oldPassword: 'Incorrect password'
                }).end();
                return;
            }
        });
}

/**
 * Get my info
 */
export function me(req, res, next) {
    var userId = req.user._id;
    
    return User.find({
        where: {
            _id: userId
        },
        attributes: [
            '_id',
            'name',
            'email',
            'role',
            'provider',
            'provider_id',
            'google',
            'facebook',
            'twitter',
            'github'
        ]
    })
        .then(user => { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
    res.redirect('/');
}

export function validate(req, res) {
    if (req.params.field == 'email') {
        var result = {};
        var email = req.body.value.toLowerCase();
        User.count({where: {email: email}})
        .then(function (count) {
            if (count > 0) {
                result.isValid = false;
            }
            else {
                result.isValid = true;
            }
            result.value = count;
            res.status(200).json(result);
        });
    }
}

export function verify(req, res) {
    var userId = req.user._id;

    User.find({where: { _id: userId }})
    .then(handleEntityNotFound(res))
    .then(function (user) {
        if (user.role == 'unverified') {
            if (user.meta && user.meta.verify_code == req.body.code) {
                user.role = 'user';
                user.meta = null;
                return user.save()
                .then(function (user) {
                    res.status(HttpStatus.OK).json(user);
                    return Q.resolve();
                });
            }
            else {
                res.status(HttpStatus.CONFLICT).send('Verify code not match');
                return Q.reject();
            }
        }
        else {
            res.status(HttpStatus.OK).json(user);
            return Q.resolve();
        }
    })
    .catch(handleError(res));
}


// send email with verify code to user
export function sendVerifyMail(req, res) {
    var userId = req.user._id;

    User.find({where: { _id: userId }})
    .then(handleEntityNotFound(res))
    .then(function (user) {
        var done = Q.defer();
        var verifyCode = crypto.randomBytes(32).toString('hex');
        var mailContent = '認證碼：' + verifyCode;

        // Configure nodemailer transporter
        var transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            // host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_LOGIN,
                pass: process.env.SMTP_PASSWORD
            }
        });

        user.meta = { verify_code: verifyCode };
        user.save()
        .then(function (user) {
            transporter.sendMail({
                from: 'spirit99@mg.9493.tw',
                to: user.email,
                subject: 'User Verification 註冊認證碼，from www.9493.tw',
                text: mailContent
            }, function (error, info) {
                if (error) {
                    console.error(error);
                    done.reject(error);
                }
                else {
                    console.log(info);
                    res.status(HttpStatus.OK).json(info);
                    done.resolve();
                }
            });
        }, function (error) {
            console.error(error);
            done.reject(error);
        });

        return done.promise;
    })
    .catch(handleError(res));
}
