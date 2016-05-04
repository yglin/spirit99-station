/*
* @Author: yglin
* @Date:   2016-04-21 13:05:34
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 19:33:01
*/

'use strict';

module.exports = {
    channels: [
        {
            id: 'ggyy',
            title: '唧唧歪歪',
            description: '唧唧歪歪雞雞歪歪',
            'logo-url': 'https://emos.plurk.com/92fe2c75e52cd5dc99f6e98f6f50d5aa_w48_h48.jpeg',
            categories: {
                1: {
                    title: 'sweat',
                    icon: {
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/sweat.png'
                    }
                },
                2: {
                    title: '哭哭',
                    icon: {
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/cry.png'
                    }
                },
                3: {
                    title: 'love',
                    icon: {
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/love.png'
                    }
                },
                5: {
                    title: 'startle',
                    icon: {
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/startle.png'
                    }
                },
                7: {
                    title: '龜藍波火',
                    icon: {
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/fire.png'
                    }
                }
            },
            state: 'public',
        }
    ],
    users: [
        {
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        }
   ],
    posts: [
        {
            title: '作者的家',
            content: '<p>這裡是窮光蛋作者的家...</p>',
            category: 2,
            author: 'YGG@ygmail.tw',
            latitude: 24.081111,
            longitude: 120.548569
        }
   ]
};