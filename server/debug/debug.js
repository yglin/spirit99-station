/*
* @Author: yglin
* @Date:   2016-04-27 20:22:04
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-27 20:41:15
*/

'use strict';

var HttpStatus = require('http-status-codes');

module.exports = {
    timeout: timeout
}

function timeout(req, res) {
    setTimeout(function() {
        res.status(HttpStatus.OK).end();
    }, 5000);
}