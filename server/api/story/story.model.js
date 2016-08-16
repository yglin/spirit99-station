/*
* @Author: yglin
* @Date:   2016-04-26 14:20:38
* @Last Modified by:   yglin
* @Last Modified time: 2016-08-16 16:57:14
*/

'use strict';

var Q = require('q');
// var jsdom = require("jsdom");

// function grabFirstImgUrl(html) {
//     var gotit = Q.defer();
//     jsdom.env(
//         html,
//         function (error, window) {
//             if (error) {
//                 // console.error('Failed to grab first img url from ' + html);
//                 gotit.reject(error);
//             }
//             var imgs = window.document.getElementsByTagName('img');
//             var src = null;
//             for (var i = 0; i < imgs.length; i++) {
//                 src = imgs[i].getAttribute('src');
//                 if (src) {
//                     // console.log(src);
//                     gotit.resolve(src)
//                     break;
//                 }
//             }
//             if (!src) {
//                 // console.error('Failed to grab first img url from ' + html);
//                 gotit.reject();
//             }
//         }
//     );
//     return gotit.promise;
// }

module.exports = function(sequelize, DataTypes) {
    var Story = sequelize.define('story', {
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
        thumbnail: {
            type: DataTypes.STRING(1024),
            validate: {
                isUrl: true
            }
            // set: function (value) {
            //     if (!value) {
            //         grabFirstImgUrl(this.getDataValue('content'))
            //         .then(function (url) {
            //             this.setDataValue('thumbnail', url);
            //         });
            //     }
            //     else {
            //         this.setDataValue('thumbnail', value);
            //     }
            // }
        },
        startAt: {
            type: DataTypes.DATE
        },
        endAt: {
            type: DataTypes.DATE
        },
        state: {
            type: DataTypes.ENUM,
            values: ['private', 'public', 'deleted'],
            defaultValue: 'private'
        }
    }, {
        freezeTableName: true,
        timestamps: true
    });

    // var Place = require('../place/place.model')(sequelize, DataTypes);
    // Story.belongsTo(Place, {
    //     foreignKey: 'place_id',
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE',
    //     as: 'Location'
    // });
    // Place.hasMany(Story, { foreignKey:'place_id', as:'Storys' });

    return Story;
}