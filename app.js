//app.js
const host = require('./config').host;
const EventBus = require('./pages/lib/event').EventBus;

App({
  onLaunch: function () {
    const that = this;

    // 检查用户登录态是否过期，过期了重新登录
    wx.checkSession({
      success: () => {
        //session 未过期，并且在本生命周期一直有效
        that.globalData.token = wx.getStorageSync('token');
        that.globalData.userInfo = wx.getStorageSync('userInfo');
        that.eventBus.emit('LOGGING-SUCCESS');
      },
      fail: () => {
        that.initLoginState();
      }
    });
  },
  eventBus: new EventBus(),
  globalData: {
    token: '',
    userInfo: null
  },
  // 重新登录
  initLoginState: function () {
    const that = this;

    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    // 登录
    wx.login({
      success: res => {
        // 调用获取用户信息接口
        wx.getUserInfo({
          success: fullUserInfo => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: `${host}/api/auth/loginwx`,
              method: 'POST',
              data: {
                code: res.code,
                userInfo: fullUserInfo
              },
              success: ({data}) => {
                wx.setStorageSync('token', data.data.token);
                wx.setStorageSync('userInfo', data.data.userInfo);
                that.globalData.token = data.data.token;
                that.globalData.userInfo = data.data.userInfo;

                wx.hideLoading();
                that.eventBus.emit('LOGGING-SUCCESS');
              }
            });
          },
          // TODO 不授权咋办，先不管
          fail: res => {
            console.log(res);
          }
        });
      }
    });
  }
});