'use strict';

export default function(sequelize, DataTypes) {
    return sequelize.define('channel', {
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
        categories: DataTypes.TEXT
    }, {
        freezeTableName: true
    });
}
