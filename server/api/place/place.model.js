/*
* @Author: yglin
* @Date:   2016-08-09 11:03:37
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-16 14:08:42
*/

'use strict';

module.exports = function (sequelize, DataTypes) {
    var Place = sequelize.define('place', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING,
        },
        latitude: DataTypes.DECIMAL(11, 8),
        longitude: DataTypes.DECIMAL(11, 8),
        category: DataTypes.INTEGER(2),
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        thumbnail: {
            type: DataTypes.STRING(1024),
            validate: {
                isUrl: true
            }
        },
        state: {
            type: DataTypes.ENUM,
            values: ['private', 'public', 'deleted'],
            defaultValue: 'private'
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['latitude', 'longitude']
            }
        ]
    });

    return Place;
};