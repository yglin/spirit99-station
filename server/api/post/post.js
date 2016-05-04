/*
* @Author: yglin
* @Date:   2016-04-27 16:22:20
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 13:28:32
*/

'use strict';

var HttpStatus = require('http-status-codes');

module.exports = {
    get: get,
    create: create,    
}

function get(req, res) {
    var whereConditions = {};
    whereConditions._id = req.params.id;
    if (req.locals && req.locals.user_id) {
        whereConditions.owner_id = req.locals.user_id;
    }
    var Post = req.locals.Post;
    console.log(whereConditions);
    Post.findOne({where: whereConditions})
    .then(function (post) {
        console.log(post);
        if (post) {
            res.status(HttpStatus.OK).json(post);
        }
        else {
            res.status(HttpStatus.NOT_FOUND).end();
        }
    }, function (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(error);
    })
}

function create(req, res) {
    var Post = req.locals.Post;
    var post = Post.build({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        owner_id: req.user._id,
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