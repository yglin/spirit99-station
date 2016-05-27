/*
* @Author: yglin
* @Date:   2016-04-27 17:10:58
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-22 11:42:36
*/

'use strict';
var Q = require('q');
var exec = require('child_process').exec;

module.exports = function () {
    var done = Q.defer();
    var cmdCleanupDatabase = 'mysql -uyglin -pturbogan -e "DROP DATABASE IF EXISTS ggyy;"';
    exec(cmdCleanupDatabase, function (error, stdout, stderr) {
        if(error) {
            // grunt.log.error('Fail to clean up database!!');
            // grunt.log.error(cmdCleanupDatabase);
            // grunt.log.error('Error ==========================');
            // grunt.log.error(error);
            // grunt.log.error('Stdout =========================');
            // grunt.log.error(stdout);
            // grunt.log.error('Stderr =========================');
            // grunt.log.error(stderr);
            // grunt.log.error('================================');
            done.reject(error);
        }
        else{
            done.resolve();
        }
    });
    return done.promise;
};