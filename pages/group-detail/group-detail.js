// pages/group-detail/group-detail.js
const app = getApp();
const host = require('../../config').host;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: null,
    orders: [],
    expired: true,
    isOwner: false
  },
  loggingSuccessSubp: null,
  refreshGroupDetailSubp: null,
  runOnce: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupId: options.id
    });

    // TODO 这样会有两次请求，再优化
    this.loggingSuccessSubp = app.eventBus.on('LOGGING-SUCCESS', this.getGroupDetail.bind(this));
    this.refreshGroupDetailSubp = app.eventBus.on('REFRESH-GROUP-DETAIL', this.getGroupDetail.bind(this));
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.loggingSuccessSubp.off();
    this.refreshGroupDetailSubp.off();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '团组名称',
      path: '/pages/group-detail/group-detail?id=' + this.data.groupId
    };
  },

  // 删除订单
  removeOrder: function (e) {
    const selectOrder = e.currentTarget.dataset.order;
    console.log(selectOrder);

    wx.showModal({
      title: '提示',
      content: `是否从该团中删除${selectOrder.product_name}`,
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  // 设置团组状态为已完成
  setGroupFinish: function () {

  },

  // 设置团组状态为已取消
  setGroupCancel: function () {

  },

  // 跳转到添加订单页面
  navigateToAddOrder: function () {
    wx.navigateTo({
      url: '/pages/list-product/list-product?groupId=' + this.data.groupId
    });
  },

  // 加载订单团信息
  getGroupDetail: function (force) {
    if (!app.globalData.token) {
      return;
    }

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    wx.request({
      url: `${host}/api/group/get?id=${this.data.groupId}`,
      header: {
        'authorization': app.globalData.token
      },
      success: ({data}) => {
        this.setData({
          orders: data.data.orders
        });

        // 是否过期
        const dueTime = new Date(data.data.due_time);
        this.setData({
          expired: dueTime.getTime() < Date.now()
        });

        // 是否创建者
        this.setData({
          isOwner: data.data.composer_user_id === app.globalData.userInfo.id
        });

        wx.hideLoading();
      }
    });
  }
})