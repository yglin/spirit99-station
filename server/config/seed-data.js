/*
* @Author: yglin
* @Date:   2016-04-25 14:35:53
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-25 14:51:03
*/

'use strict';

module.exports = {
    users: [
        {
            provider: 'local',
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        }, 
        {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin'
        }
    ],
    channels: [
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
            owner_id: null,
            state: 'public'
        }
    ],
    things: [
        {
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
        }
    ]
}