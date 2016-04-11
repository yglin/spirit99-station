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
        description: DataTypes.STRING,
        'intro-url': {
            type: DataTypes.STRING,
            field: 'intro_url',
            validate: {
                isUrl: true
            }
        },
        'logo-url': {
            type: DataTypes.STRING,
            field: 'logo_url',
            validate: {
                isUrl: true
            }
        }
    }, {
        freezeTableName: true
    });
}
