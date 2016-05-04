/*
* @Author: yglin
* @Date:   2016-05-02 15:43:24
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-03 10:15:43
*/

'use strict';

var util = require('../util');

module.exports = new EditorPage();

function EditorPage() {
    this.root = element(by.css('#post-editor-root'));
    this.title = this.root.element(by.css('input[name=title]'));
    this.author = this.root.element(by.css('input[name=author]'));
    this.buttonSubmit = this.root.element(by.css('#submit'));

    this.selectCategory = selectCategory;
    this.inputContent = inputContent;
    this.apply = apply;
    this.submit = submit;
};

function inputContent(content) {
    var textAngular = this.root.element(by.css('#post-content-input'));
    expect(textAngular.isPresent()).toBe(true);
    textAngular.click();
    browser.actions().sendKeys(util.getTextFromHtml(content)).perform();
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
}

function submit () {
    this.buttonSubmit.click();
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 20000)
    .then(function () {
        browser.switchTo().alert().accept();    
    });     
}

