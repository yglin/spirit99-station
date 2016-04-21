/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Q = require('q');
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.User;
var Channel = sqldb.Channel;

Thing.sync()
    .then(() => {
        return Thing.destroy({ where: {} });
    })
    .then(() => {
        Thing.bulkCreate([{
            name: 'Development Tools',
            info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
                         'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
                         'Stylus, Sass, and Less.'
        }, {
            name: 'Server and Client integration',
            info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
                         'AngularJS, and Node.'
        }, {
            name: 'Smart Build System',
            info: 'Build system ignores `spec` files, allowing you to keep ' +
                         'tests alongside code. Automatic injection of scripts and ' +
                         'styles into your index.html'
        }, {
            name: 'Modular Structure',
            info: 'Best practice client and server structures allow for more ' +
                         'code reusability and maximum scalability'
        }, {
            name: 'Optimized Build',
            info: 'Build process packs up your templates as a single JavaScript ' +
                         'payload, minifies your scripts/css/images, and rewrites asset ' +
                         'names for caching.'
        }, {
            name: 'Deployment Ready',
            info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
                         'and openshift subgenerators'
        }]);
    });

var testUserCreated = Q.defer();

User.sync()
.then(() => User.destroy({ where: {} }))
.then(() => {
    User.bulkCreate([{
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
    }])
    .then(() => {
        console.log('finished populating users');
        User.findOne({where: {email: 'test@example.com'}}).then(function (user) {
            if (user) {
                testUserCreated.resolve(user);
            }
            else {
                testUserCreated.reject('Can not find user test@example.com');
            }
        });
    });
});

Channel.sync()
.then(() => Channel.destroy({ where: {} }))
.then(() => {
    testUserCreated.promise.then(function (user) {
        Channel.bulkCreate([
            {
                id: 'nuclear-test-field',
                title: '核子試爆場',
                description: '測試新功能，以及給使用者隨便亂搞，資料不定時會清除',
                'logo-url': 'https://i.warosu.org/data/sci/img/0073/32/1434439598515.jpg',
                'categories': [
                    {
                        title: 'sweat',
                        icon: {
                            url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/sweat.png'
                        }
                    },
                    {
                        title: '哭哭',
                        icon: {
                            url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/cry.png'
                        }
                    },
                    {
                        title: 'love',
                        icon: {
                            url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/love.png'
                        }
                    },
                    {
                        title: 'startle',
                        icon: {
                            url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/startle.png'
                        }
                    },
                    {
                        title: '龜藍波火',
                        icon: {
                            url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/fire.png'
                        }
                    }
                ],
                owner_id: user._id,
                state: 'public'
            }
        ])
        .then(() => {
            console.log('finished populating channels');
        });
    });
});
