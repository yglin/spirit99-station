var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var Q = require('q');
var sqldb = require('../server/sqldb');
var ChannelDBs = require('../server/sqldb/channels');

exports.up = function(db, callback) {
    return sqldb.init()
    .then(function () {
        return sqldb.sequelize.sync();
    })
    .then(ChannelDBs.connectAll)
    .then(function () {
        var startup = Q.defer();
        var chain = startup.promise;
        for (var channel_id in ChannelDBs.dbs) {
            // console.log('Add column category to ' + channel_id + '.place');
            chain = chain.then(addColumnCategory.bind(undefined, channel_id));
        }
        startup.resolve();
        return chain;        
    })
    .then(callback);
};

exports.down = function(db, callback) {
    return sqldb.init()
    .then(function () {
        return sqldb.sequelize.sync();
    })
    .then(ChannelDBs.connectAll)
    .then(function () {
        var startup = Q.defer();
        var chain = startup.promise;
        for (var channel_id in ChannelDBs.dbs) {
            chain = chain.then(removeColumnCategory.bind(undefined, channel_id));
        }
        startup.resolve();
        return chain;        
    })
    .then(callback);
};


function addColumnCategory(channelID) {
    var done = Q.defer();

    var Post = ChannelDBs.getModel(channelID, 'post');
    var Place = ChannelDBs.getModel(channelID, 'place');
    var sequelize = ChannelDBs.dbs[channelID].sequelize;

    var sql = 'ALTER TABLE place ADD COLUMN category INT(2)';
    sequelize.query(sql)
    .then(function () {
        return Place.findAll({
            where: {},
            include: [{
                model: Post,
                as: 'Posts'
            }]
        });
    })
    .then(function (places) {
        var startup = Q.defer();
        var chain = startup.promise;
        for (var i = 0; i < places.length; i++) {
            chain = chain.then(assignCategoryFromPosts.bind(undefined, places[i]));
        }
        startup.resolve();
        return chain;
    })
    .then(function () {
        done.resolve();
    })
    .catch(function (error) {
        console.error(error);
        done.reject(error);
    });

    return done.promise;
}

function assignCategoryFromPosts(place) {
    var done = Q.defer();
    // console.log(place.Posts);
    if (place.Posts && place.Posts.length > 0) {
        for (var i = 0; i < place.Posts.length; i++) {
            var post = place.Posts[i];
            // console.log(post);
            if (post.category) {
                place.category = post.category;
                place.save()
                .then(function () {
                    done.resolve();
                })
                .catch(function (error) {
                    console.warn(error);
                    done.resolve();
                });
                break;
            }
            else {
                done.resolve();
            }
        }
    }
    else {
        done.resolve();
    }
    return done.promise;
}

function removeColumnCategory(channelID) {
    var done = Q.defer();
    var sequelize = ChannelDBs.dbs[channelID].sequelize;
    var sql = 'ALTER TABLE place DROP COLUMN category';
    console.log('Drop column category from ' + channelID + '.place');
    sequelize.query(sql)
    .then(function () {
        done.resolve();
    })
    .catch(function (error) {
        console.error(error);
        done.reject(error);
    });
    return done.promise;
    // return Q.resolve();
}
