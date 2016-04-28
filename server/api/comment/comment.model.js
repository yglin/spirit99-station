/*
* @Author: yglin
* @Date:   2016-04-27 09:26:00
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-28 08:56:53
*/

'use strict';

module.exports = function(sequelize, DataTypes) {
    
    var Comment = sequelize.define('comment', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: DataTypes.TEXT,
        author: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        }
    }, {
        freezeTableName: true,
        timestamps: true
    });

    var Post = require('../post/post.model')(sequelize, DataTypes);
    Comment.belongsTo(Post, {foreignKey: 'post_id'});

    return Comment;
}