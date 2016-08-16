var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var Sequelize = require('sequelize');
var Q = require('q');
var sqldb = require('../server/sqldb');
var ChannelDBs = require('../server/sqldb/channels');

exports.up = up;
exports.down = down;

function up(db, callback) {
    return sqldb.init()
    .then(function () {
        return sqldb.sequelize.sync();
    })
    .then(ChannelDBs.connectAll)
    .then(function () {
        var startup = Q.defer();
        var chain = startup.promise;
        for (var channel_id in ChannelDBs.dbs) {
            chain = chain.then(migratePosts.bind(undefined, channel_id));
        }
        startup.resolve();
        return chain;
    })
    .then(callback);
};

function down(db, callback) {
    return sqldb.init()
    // .then(sqldb.sequelize.sync)
    .then(function () {
        return sqldb.sequelize.sync();
    })
    .then(ChannelDBs.connectAll)
    .then(function () {
        var startup = Q.defer();
        var chain = startup.promise;
        for (var channel_id in ChannelDBs.dbs) {
            chain = chain.then((function (channelID) {
                var done = Q.defer();
                var sequelize = ChannelDBs.dbs[channelID].sequelize;
                var sql = "ALTER TABLE post DROP FOREIGN KEY post_ibfk_place__id, DROP COLUMN place_id;";
                sequelize.query(sql)
                .then(sequelize.query.bind(sequelize, "DROP TABLE place;"))
                .then(function () {
                    done.resolve();
                })
                .catch(function () {
                    done.reject();
                });

                return done.promise;
            })(channel_id));
        }
        startup.resolve();
        return chain;        
    })
    .then(callback);
};

function migratePosts(channelID) {
    var done = Q.defer();
    
    var Post = ChannelDBs.getModel(channelID, 'post');
    var Place = ChannelDBs.getModel(channelID, 'place');
    var sequelize = ChannelDBs.dbs[channelID].sequelize;

    var sql = 'ALTER TABLE post ADD COLUMN place_id INTEGER, ADD CONSTRAINT post_ibfk_place__id FOREIGN KEY (place_id) REFERENCES place(_id) ON DELETE SET NULL ON UPDATE CASCADE;';
    sequelize.query(sql)
    .then(function () {
        return Post.findAll();
    })
    .then(function (posts) {
        if (posts.length && posts.length > 0) {
            var startup = Q.defer();
            var chain = startup.promise;
            for (var i = 0; i < posts.length; i++) {
                chain = chain.then(createPlaceFromPost.bind(undefined, posts[i], Place));
            }

            chain.then(function () {
                done.resolve();
            })
            .catch(function (error) {
                console.error(error);
                done.reject(error);
            });

            startup.resolve();
        }
        else {
            done.resolve();
        }
    })
    .catch(function (error) {
        console.error(error);
        done.reject(error);
    });

    return done.promise;
}

function createPlaceFromPost(post, Place) {
    var done = Q.defer();
    if (post && post.latitude && post.longitude) {
        Place.findOrCreate({where: { latitude: post.latitude, longitude: post.longitude}})
        .spread(function (place, created) {
            if (place && place._id) {
                post.place_id = place._id;
                return post.save()
                .then(function () {
                    return done.resolve();
                });
            }
            else {
                return done.reject('Not found _id in created place');
            }
        })
        .catch(function (error) {
            console.error(error);
            done.reject(error);
        });
    }
    else {
        console.log('Post has no coordinates, latitude or longitude');
        done.resolve();
    }
    return done.promise;
}

