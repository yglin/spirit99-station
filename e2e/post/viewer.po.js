/*
* @Author: yglin
* @Date:   2016-05-02 15:43:48
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-02 20:18:33
*/

'use strict';

var util = require('../util');

module.exports = new ViewPage();

function ViewPage() {
    this.root = element(by.css('#post-view-root'));
    this.title = this.root.element(by.css('.s99-post-title'));
    this.content = this.root.element(by.css('.s99-post-content'));
    this.author = this.root.element(by.css('.s99-post-author'));
    this.locateMap = this.root.element(by.css('#s99-locate-map-debug-div'));

    this.equalToPost = equalToPost;
};

function equalToPost(post) {
    expect(this.title.getText()).toEqual(post.title);
    this.content.getInnerHtml().then(function (html) {
        expect(util.getTextFromHtml(html)).toEqual(util.getTextFromHtml(post.content));
    });
    expect(this.author.getText()).toEqual(post.author);
    expect(this.locateMap.getAttribute('latitude')).toEqual(post.latitude.toString());
    expect(this.locateMap.getAttribute('longitude')).toEqual(post.longitude.toString());
}

