/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var config = browser.params;

var LoginPage = function() {
    var self = this;

    var form = self.form = element(by.css('.form'));
    form.email = form.element(by.model('vm.user.email'));
    form.password = form.element(by.model('vm.user.password'));
    form.submit = form.element(by.css('.btn-login'));
    form.oauthButtons = require('../../components/oauth-buttons/oauth-buttons.po').oauthButtons;

    self.login = function(data) {
        for (var prop in data) {
            var formElem = form[prop];
            if (data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
                formElem.sendKeys(data[prop]);
            }
        }

        return form.submit.click();
    };

    self.loginAsNeeded = function (data, returnPath) {
        // Login as needed
        browser.getCurrentUrl().then(function (url) {
            if (url == config.baseUrl + '/login') {
                self.login(data);
                // Wait browser to redirect back to returnPath
                browser.wait(function () {
                    return browser.getCurrentUrl().then(function (url) {
                        return url == config.baseUrl + returnPath;
                    });
                }, 5000);
            }
        });
    }
};

module.exports = new LoginPage();

