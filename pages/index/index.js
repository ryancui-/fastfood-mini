//index.js
//获取应用实例
const app = getApp();
const host = require('../../config').host;

Page({
  data: {
    groups: []
  },
  onLoad: function () {
    this.setData({
      groups: new Array(4).fill({
        composer: {
          nickname: 'DeLock'
        },
        status: 1,
        totalPrice: 49,
        dueTime: '2017-11-06 10:30:00',
        avatar_url: 'https://wx.qlogo.cn/mmopen/vi_32/JPcCJiabb9uMWCAdHvBxFIiaLGQDyxVDKegr9TgBY078N4z4vEFxaPGUfwicwg5m1eFq1hjtGb9wz6BCUkk4AmKxQ/0'
      })
    });
  }
})
