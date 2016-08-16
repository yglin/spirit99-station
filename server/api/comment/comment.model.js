/*
* @Author: yglin
* @Date:   2016-04-27 09:26:00
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-16 16:52:07
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
        commentable: DataTypes.STRING,
        commentable_id: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        timestamps: true
    });

    return Comment;
}