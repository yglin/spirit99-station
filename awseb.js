/*
* @Author: yglin
* @Date:   2016-06-14 13:30:46
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-14 15:08:27
*/

'use strict';

const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const Q = require('q');

module.exports = {
    deploy: deploy
}

function deploy(options) {
    options = typeof options == 'undefined' ? {} : options;
    options.envJSON = typeof options.envJSON == 'undefined' ? path.resolve(__dirname, '.credentials/production.env') : options.envJSON;
    options.distDir = typeof options.distDir == 'undefined' ? path.resolve(__dirname, 'dist') : options.distDir;

    console.log('Deploy to AWS Elastic Beanstalk ...');
    var doneUpdateEnvs = Q.defer();
    var done = Q.defer();

    // Update environment variables
    var envVars = require(options.envJSON);
    var optionSettings = { option_settings:[] };
    for (var key in envVars) {
        optionSettings.option_settings.push({
            option_name: key,
            value: envVars[key]
        });
    }
    var ebConfigFile = path.resolve(options.distDir, '.ebextensions', 'envvars.config');
    fs.mkdir(path.dirname(ebConfigFile), function (error) {
        if (error) {
            console.error(error);
            doneUpdateEnvs.reject(error);
        }
        else {
            fs.writeFile(ebConfigFile, JSON.stringify(optionSettings),
            function (error) {
                if (error) {
                    console.error(error);
                    doneUpdateEnvs.reject(error);
                }
                else {
                    doneUpdateEnvs.resolve();
                }
            });
        }
    });

    doneUpdateEnvs.promise
    .then(function () {
        // Run deploy
        var deployProcess = exec('eb deploy', {
            cwd: options.distDir
        }, function (error, stdout, stderr) {
            if (error) {
                console.error(`exec error: ${error}`);
                done.reject(error);
            }
            else {
                done.resolve();
            }
        });

        deployProcess.stdout.pipe(process.stdout);
        deployProcess.stderr.pipe(process.stderr);

    }, function (error) {
        done.reject(error);    
    })
    // var command = '';

    // // Change to dist directory
    // command = 'cd ' + options.distDir +';';

    // Set environment variables
    // var envVars = require(options.envJSON);
    // command += 'eb setenv';
    // for (var key in envVars) {
    //     command += ' ' + key + '=' + envVars[key];
    // }
    // command += ';';

    // Run deploy
    // command += 'eb deploy;';

    // exec('eb deploy', {
    //     cwd: options.distDir
    // }, function (error, stdout, stderr) {
    //     if (error) {
    //         console.error(`exec error: ${error}`);
    //         done.reject(error);
    //     }
    //     else {
    //         console.log(`stdout: ${stdout}`);
    //         console.log(`stderr: ${stderr}`);
    //         done.resolve();
    //     }
    // })

    return done.promise
    .then(function () {
        console.log('Deploy to AWS Elastic Beanstalk ... done');
        return Q.resolve();
    });
}