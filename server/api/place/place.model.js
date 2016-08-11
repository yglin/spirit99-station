/*
* @Author: yglin
* @Date:   2016-08-09 11:03:37
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-10 14:20:04
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
        longitude: DataTypes.DECIMAL(11, 8)
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