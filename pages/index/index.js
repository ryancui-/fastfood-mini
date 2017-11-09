//index.js
//获取应用实例
const app = getApp();
const host = require('../../config').host;

Page({
  data: {
    groups: []
  },
  loggingSubs: null,
  onLoad: function () {
    this.loggingSubs = app.eventBus.on('LOGGING-SUCCESS', this.listGroups.bind(this));
  },
  onUnload: function () {
    this.loggingSubs.off();
  },
  onShow: function () {
    this.listGroups();
  },
  // 跳转到添加订单团
  navigateToAddGroup: function () {
    wx.navigateTo({
      url: '/pages/add-group/add-group'
    });
  },
  // 跳转到订单团详情
  navigateToGroup: function (e) {
    const group = e.currentTarget.dataset.group;

    wx.navigateTo({
      url: '/pages/group-detail/group-detail?id=' + group.id,
      success: () => {
        app.eventBus.emit('REFRESH-GROUP-DETAIL');
      }
    });
  },
  // 获取订单团信息
  listGroups: function () {
    if (!app.globalData.token) {
      return;
    }

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    wx.request({
      url: `${host}/api/group/list`,
      header: {
        'authorization': app.globalData.token
      },
      success: ({data}) => {
        this.setData({
          groups: data.data
        })
        wx.hideLoading();
      }
    })
  }
})
