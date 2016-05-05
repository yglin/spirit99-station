/*
* @Author: yglin
* @Date:   2016-05-02 15:43:48
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-05 09:12:53
*/

'use strict';

var util = require('../util');
var locateMap = require('../components/locate-map.po');

module.exports = new ViewPage();

function ViewPage() {
    this.root = element(by.css('#post-view-root'));
    this.title = this.root.element(by.css('.s99-post-title'));
    this.content = this.root.element(by.css('.s99-post-content'));
    this.author = this.root.element(by.css('.s99-post-author'));
    this.categoryIcon = this.root.element(by.css('img.s99-category-icon'));
    this.categoryTitle = this.root.element(by.css('span.s99-category-title'));

    this.equalTo = equalTo;
};

function equalTo(post, channel) {
    expect(this.title.getText()).toEqual(post.title);
    expect(this.content.getInnerHtml()).toEqual(post.content);
    expect(this.author.getText()).toEqual(post.author);
    if (post.category && channel.categories
    && post.category in channel.categories) {
        var category = channel.categories[post.category];
        expect(this.categoryIcon.getAttribute('src')).toEqual(category.icon.url);
        expect(this.categoryTitle.getText()).toEqual(category.title);
    }
    locateMap.equalTo(post);

}

