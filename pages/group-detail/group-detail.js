// pages/group-detail/group-detail.js
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupId: options.id
    });

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    setTimeout(() => {
      this.setData({
        orders: new Array(4).fill({
          product_name: '盐焗手撕鸡饭',
          total_price: '17',
          avatar_url: 'https://wx.qlogo.cn/mmopen/vi_32/JPcCJiabb9uMWCAdHvBxFIiaLGQDyxVDKegr9TgBY078N4z4vEFxaPGUfwicwg5m1eFq1hjtGb9wz6BCUkk4AmKxQ/0'
        }),
        expired: false,
        isOwner: true
      });
      wx.hideLoading();
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
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
      success: function(res) {
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

  }
})