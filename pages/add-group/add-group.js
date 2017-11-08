// add-group.js
const formatHHmm = require('../../utils/util').formatHHmm;
const formatDate = require('../../utils/util').formatDate;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupForm: {
      name: '111',
      dueTime: null
    },
    now: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const today = new Date();
    this.setData({
      now: formatHHmm(today),
      groupForm: {
        dueTime: formatHHmm(today),
        name: formatDate(today) + ' 订单团'
      }
    });
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

  onInputChange: function (e) {
    this.setData({
      'groupForm.name': e.detail.value
    });
  },

  onDateChange: function (e) {
    this.setData({
      'groupForm.dueTime': e.detail.value
    });
  },

  // 确认新建订单团
  confirm: function () {
    console.log(this.data.groupForm);

    const id = 1;
    wx.navigateTo({
      url: '/pages/group-detail/group-detail?id=' + id
    });
  }
})