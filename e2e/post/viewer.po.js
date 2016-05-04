/*
* @Author: yglin
* @Date:   2016-05-02 15:43:48
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 17:38:48
*/

'use strict';

var util = require('../util');

module.exports = new ViewPage();

function ViewPage() {
    this.root = element(by.css('#post-view-root'));
    this.title = this.root.element(by.css('.s99-post-title'));
    this.content = this.root.element(by.css('.s99-post-content'));
    this.author = this.root.element(by.css('.s99-post-author'));
    this.latitude = this.root.element(by.css('span#latitude'));
    this.longitude = this.root.element(by.css('span#longitude'));

    this.equalToPost = equalToPost;
};

function equalToPost(post) {
    expect(this.title.getText()).toEqual(post.title);
    expect(this.content.getInnerHtml()).toEqual(post.content);
    expect(this.author.getText()).toEqual(post.author);
    expect(this.latitude.getText()).toEqual(post.latitude.toFixed(6).toString());
    expect(this.longitude.getText()).toEqual(post.longitude.toFixed(6).toString());
}

