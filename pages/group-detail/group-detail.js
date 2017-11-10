// pages/group-detail/group-detail.js
const app = getApp();
const host = require('../../config').host;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: null,
    group: null,
    orders: [],
    expired: true,
    isOwner: false
  },
  loggingSuccessSubp: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupId: options.id
    });

    // TODO 这样会有两次请求，再优化
    this.loggingSuccessSubp = app.eventBus.on('LOGGING-SUCCESS', this.getGroupDetail.bind(this));
  },
  onShow: function () {
    this.getGroupDetail();
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.loggingSuccessSubp.off();
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

    // 过期订单团和非本人没有效果
    if (this.data.expired || selectOrder.user_id !== app.globalData.userInfo.id) {
      return;
    }

    wx.showModal({
      title: '提示',
      content: `是否从该团中删除${selectOrder.product_name}`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          });

          wx.request({
            url: `${host}/api/order/remove`,
            method: 'POST',
            header: {
              'authorization': app.globalData.token
            },
            data: {
              id: selectOrder.id
            },
            success: ({data}) => {
              wx.hideLoading();
              this.getGroupDetail();
            }
          });
        }
      }
    });
  },

  // 设置团组状态为已完成
  setGroupFinish: function () {
    wx.showModal({
      title: '提示',
      content: `是否完成订单团`,
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: `${host}/api/group/status`,
            method: 'POST',
            header: {
              'authorization': app.globalData.token
            },
            data: {
              id: this.data.groupId,
              status: 2
            },
            success: ({data}) => {
              wx.showToast({
                title: '操作成功',
                icon: 'success',
              });
              this.getGroupDetail();
            }
          });
        }
      }
    });
  },

  // 设置团组状态为已取消
  setGroupCancel: function () {
    wx.showModal({
      title: '提示',
      content: `是否取消订单团`,
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: `${host}/api/group/status`,
            method: 'POST',
            header: {
              'authorization': app.globalData.token
            },
            data: {
              id: this.data.groupId,
              status: 3
            },
            success: ({data}) => {
              wx.showToast({
                title: '操作成功',
                icon: 'success',
              });
              this.getGroupDetail();
            }
          });
        }
      }
    });
  },

  // 跳转到添加订单页面
  navigateToAddOrder: function () {
    wx.navigateTo({
      url: '/pages/list-product/list-product?groupId=' + this.data.groupId
    });
  },

  // 加载订单团信息
  getGroupDetail: function () {
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
          orders: data.data.orders,
          group: data.data
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