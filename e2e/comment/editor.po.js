/*
* @Author: yglin
* @Date:   2016-05-05 11:25:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-06 20:08:04
*/

'use strict';

module.exports = new EditorPage();

function EditorPage() {
  this.form = element(by.css('form[name=commentForm]'));
  this.author = this.form.element(by.css('input[name=author]'));
  this.inputContent = inputContent;
  this.apply = apply;
  this.submit = submit;
}

function inputContent(content) {
    var textAngular = this.form.element(by.css('#comment-content-input'));
    var textAngularTextArea = textAngular.element(by.css('textarea'));
    expect(textAngular.isPresent()).toBe(true);
    textAngular.click();
    element(by.css('button[name=html]')).click();
    textAngularTextArea.clear();
    textAngularTextArea.sendKeys(content);
}

function apply(comment) {
    if (comment.content) {
        this.inputContent(comment.content);
    }
    if (comment.author) {
        this.author.sendKeys(comment.author);
    }
}

function submit() {
    this.form.element(by.css('button#submit')).click();
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 20000)
    .then(function () {
        browser.switchTo().alert().accept();    
    });    
}

