/*
* @Author: yglin
* @Date:   2016-05-06 20:15:36
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-10 13:34:57
*/

'use strict';

module.exports = new ViewerPage();

var Q = require('q');

function ViewerPage() {
  this.root = element(by.css('#s99-comment-list'));
  this.has = has;
};

function has(comment) {
    var comments = element.all(by.css('.s99-comment-item'));
    var matched = comments.filter(function (element, index) {
        var content = element.element(by.css('.s99-comment-content'));
        var author = element.element(by.css('.s99-comment-author'));
        return Q.all([
            content.getInnerHtml().then(function (html) {
                return html == comment.content;
            }),
            author.getText().then(function (text) {
                return text == comment.author;
            })
        ]);
    });
    // console.log(matched.count());
    expect(matched.count()).toBeGreaterThan(0);
}
