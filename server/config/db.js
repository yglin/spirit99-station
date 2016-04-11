/*
* @Author: yglin
* @Date:   2016-04-02 09:49:33
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-02 10:16:27
*/

'use strict';

module.exports = {
    station: {
        database: 'station',
        username: 'yglin',
        password: 'turbogan',
        options: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    }
};