/*
* @Author: yglin
* @Date:   2016-04-26 14:20:38
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 10:57:46
*/

'use strict';

var Q = require('q');
var jsdom = require("jsdom");

function grabFirstImgUrl(html) {
    var gotit = Q.defer();
    jsdom.env(
        html,
        function (error, window) {
            if (error) {
                console.error('Failed to grab first img url from ' + html);
                gotit.reject(error);
            }
            var imgs = window.document.getElementsByTagName('img');
            var src = null;
            for (var i = 0; i < imgs.length; i++) {
                src = imgs[i].getAttribute('src');
                if (src) {
                    // console.log(src);
                    gotit.resolve(src)
                    break;
                }
            }
            if (!src) {
                console.error('Failed to grab first img url from ' + html);
                gotit.reject();
            }
        }
    );
    return gotit.promise;
}

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define('post', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: DataTypes.TEXT,
        latitude: DataTypes.DECIMAL(10, 7),
        longitude: DataTypes.DECIMAL(10, 7),
        category: DataTypes.INTEGER(2),
        thumbnail: {
            type: DataTypes.STRING,
            set: function (value) {
                if (!value) {
                    grabFirstImgUrl(this.getDataValue('content'))
                    .then(function (url) {
                        this.setDataValue('thumbnail', url);
                    });
                }
                else {
                    this.setDataValue('thumbnail', value);
                }
            }
        },
        author: DataTypes.STRING,
        owner_id: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        timestamps: true,
        indexes: [
            {
                fields: ['latitude'],
                method: 'BTREE'
            },
            {
                fields: ['longitude'],
                method: 'BTREE'                
            },
            {
                fields: ['owner_id'],
                method: 'BTREE'
            }
        ]
    });

    return Post;
}