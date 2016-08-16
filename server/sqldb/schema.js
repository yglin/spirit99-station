/*
* @Author: yglin
* @Date:   2016-08-16 11:38:31
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-16 17:22:37
*/

'use strict';

var Q = require('q');

module.exports = {
    sync: sync
}

function sync(sequelize) {
    var done = Q.defer();
    var models = {};
    models.user = sequelize.import('../api/user/user.model');
    models.channel = sequelize.import('../api/channel/channel.model');
    models.place = sequelize.import('../api/place/place.model');
    models.story = sequelize.import('../api/story/story.model');
    models.comment = sequelize.import('../api/comment/comment.model');

    associate(models);

    sequelize.sync()
    .then(function () {
        console.info('Synced with database, create tables below if not exist:');
        console.info(Object.keys(models));
        done.resolve();
    })
    .catch(function (error) {
        console.error('Failed to sync with database');
        console.error(error);
        done.reject(error);
    });

    return done.promise;
}

function associate(models) {
    //  User => Channels
    models.channel.belongsTo(models.user, {
        foreignKey: 'user__id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'Owner'
    });
    models.user.hasMany(models.channel, { foreignKey: 'user__id', as: 'Channels' });

    // Channel => Places
    models.place.belongsTo(models.channel, {
        foreignKey: 'channel_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'Channel'
    });
    models.channel.hasMany(models.place, { foreignKey: 'channel_id', as: 'Places' });

    // Channel => Stories
    models.story.belongsTo(models.channel, {
        foreignKey: 'channel_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'Channel'
    });
    models.channel.hasMany(models.story, { foreignKey: 'channel_id', as: 'Stories' });
    
    // User => Places
    models.place.belongsTo(models.user, {
        foreignKey: 'user__id',
        constraints: false,
        as: 'Author'
    });
    models.user.hasMany(models.place, {
        foreignKey: 'user__id',
        constraints: false,
        as: 'Places'
    });

    // User => Stories
    models.story.belongsTo(models.user, {
        foreignKey: 'user__id',
        constraints: false,
        as: 'Author'
    });
    models.user.hasMany(models.story, {
        foreignKey: 'user__id',
        constraints: false,
        as: 'Stories'
    });    

    // Places <=> Stories
    models.place.belongsToMany(models.story, {
        as: 'Stories',
        through: 'PlaceStory',
        foreignKey: 'story__id'
    });
    models.story.belongsToMany(models.place, {
        as: 'Places',
        through: 'PlaceStory',
        foreignKey: 'place__id'
    });

    // Place, Story => Comments
    models.comment.belongsTo(models.story, {
        foreignKey: 'commentable_id',
        constraints: false,
        as: 'Story'
    });
    models.story.hasMany(models.comment, {
        foreignKey: 'commentable_id',
        constraints: false,
        as: 'Comments',
        scope: {
            commentable: 'story'
        }
    });
    models.comment.belongsTo(models.place, {
        foreignKey: 'commentable_id',
        constraints: false,
        as: 'Place'
    });
    models.place.hasMany(models.comment, {
        foreignKey: 'commentable_id',
        constraints: false,
        as: 'Comments',
        scope: {
            commentable: 'place'
        }
    });
}
