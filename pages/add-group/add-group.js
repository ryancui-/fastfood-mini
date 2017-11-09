// add-group.js
const formatHHmm = require('../../utils/util').formatHHmm;
const formatDate = require('../../utils/util').formatDate;
const formatTime = require('../../utils/util').formatTime;
const host = require('../../config').host;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupForm: {
      name: '',
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
        name: this.generateGroupName()
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

  // 生成订单团名称
  generateGroupName: function () {
    return formatTime(new Date()).substr(0, 16) + ' 团';
  },

  // 确认新建订单团
  confirm: function () {
    const query = {
      groupName: this.data.groupForm.name
    };

    query.dueTime = formatDate(new Date()) + ' ' + this.data.groupForm.dueTime + ':00';

    wx.showLoading({
      mask: true,
      title: '建团中...'
    });

    wx.request({
      url: `${host}/api/group/add`,
      method: 'POST',
      data: query,
      header: {
        'authorization': app.globalData.token
      },
      success: ({data}) => {
        wx.hideLoading();

        wx.navigateTo({
          url: '/pages/group-detail/group-detail?id=' + data.data
        });
      }
    })


  }
})