//index.js
//获取应用实例
const app = getApp();
const host = require('../../config').host;

Page({
  data: {
    groups: []
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    setTimeout(() => {
      this.setData({
        groups: new Array(4).fill({
          id: 1,
          composer: {
            nickname: 'DeLock'
          },
          status: 1,
          totalPrice: 49,
          dueTime: '2017-11-06 10:30:00',
          avatar_url: 'https://wx.qlogo.cn/mmopen/vi_32/JPcCJiabb9uMWCAdHvBxFIiaLGQDyxVDKegr9TgBY078N4z4vEFxaPGUfwicwg5m1eFq1hjtGb9wz6BCUkk4AmKxQ/0'
        })
      });
      wx.hideLoading();
    }, 1000);
  },
  navigateToAddGroup: function () {
    wx.navigateTo({
      url: '/pages/add-group/add-group'
    });
  },
  navigateToGroup: function (e) {
    const group = e.currentTarget.dataset.group;

    wx.navigateTo({
      url: '/pages/group-detail/group-detail?id=' + group.id
    });
  }
})
