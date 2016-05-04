/*
* @Author: yglin
* @Date:   2016-05-02 15:43:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 17:37:56
*/

'use strict';

var util = require('../util');

module.exports = new EditorPage();

function EditorPage() {
    this.root = element(by.css('#post-editor-root'));
    this.title = this.root.element(by.css('input[name=title]'));
    this.author = this.root.element(by.css('input[name=author]'));
    this.latitude = this.root.element(by.css('input[name=latitude]'));
    this.longitude = this.root.element(by.css('input[name=longitude]'));
    this.buttonSubmit = this.root.element(by.css('#submit'));

    this.selectCategory = selectCategory;
    this.inputContent = inputContent;
    this.apply = apply;
    this.submit = submit;
};

function inputContent(content) {
    var textAngular = this.root.element(by.css('#post-content-input'));
    var textAngularTextArea = textAngular.element(by.css('textarea'));
    expect(textAngular.isPresent()).toBe(true);
    textAngular.click();
    element(by.css('button[name=html]')).click();
    textAngularTextArea.clear();
    textAngularTextArea.sendKeys(content);
}

function selectCategory(id) {
    var categoryButton = this.root.element(by.css('#category-button-' + id));

    categoryButton.isDisplayed()
    .then(function (isDisplayed) {
        if (isDisplayed) {
            categoryButton.click();
        }
    });
}

function apply(post) {
    if (post.title) {
        this.title.clear();
        this.title.sendKeys(post.title);
    }
    if (post.content) {
        this.inputContent(post.content);
    }
    if (post.author) {
        this.author.clear();
        this.author.sendKeys(post.author);
    }
    if (post.category) {
        this.selectCategory(post.category);
    }
    if (post.latitude) {
        this.latitude.clear();
        this.latitude.sendKeys(post.latitude);
    }
    if (post.longitude) {
        this.longitude.clear();
        this.longitude.sendKeys(post.longitude);
    }
}

function submit () {
    this.buttonSubmit.click();
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 20000)
    .then(function () {
        browser.switchTo().alert().accept();    
    });     
}

