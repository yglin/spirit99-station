'use strict';

function getJSON(field) {
    return function () {
        var jsonString = this.getDataValue(field);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        else {
            return null;
        }
    };
}

function setJSON(field) {
    return function (value) {
        this.setDataValue(field, JSON.stringify(value));
    };
}

module.exports = function(sequelize, DataTypes) {
    var Channel = sequelize.define('channel', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        'logo-url': {
            type: DataTypes.STRING,
            field: 'logo_url',
            validate: {
                isUrl: true
            }
        },
        categories: {
            type: DataTypes.TEXT,
            get: getJSON('categories'),
            set: setJSON('categories')
        },
        state: {
            type: DataTypes.ENUM,
            values: ['private', 'public', 'closed'],
            defaultValue: 'private'
        }
    }, {
        freezeTableName: true,
        timestamps: true
    });

    return Channel;
}
