/*
* @Author: yglin
* @Date:   2016-04-11 11:36:03
* @Last Modified by:   yglin
* @Last Modified time: 2016-04-11 19:35:17
*/

'use strict';

var ChannelListPage = function() {
  this.divRoot = element(by.css('#s99st-div-channel-list'));
  this.buttonCreate = element(by.css('#s99st-button-create'));
};

module.exports = new ChannelListPage();
