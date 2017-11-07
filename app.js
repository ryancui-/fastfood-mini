//app.js
App({
  onLaunch: function () {
    // 检查用户登录态是否过期，过期了重新登录
    wx.checkSession({
      success: () => {
        //session 未过期，并且在本生命周期一直有效
        this.globalData.token = wx.getStorageSync('token');
        this.globalData.userInfo = wx.getStorageSync('userInfo');
      },
      fail: () => {
        this.initLoginState();
      }
    });
    
  },
  globalData: {
    token: '',
    userInfo: null
  },
  // 重新登录
  initLoginState: () => {
    // 登录
    wx.login({
      success: res => {
        // 调用获取用户信息接口
        wx.getUserInfo({
          success: fullUserInfo => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: 'http://127.0.0.1:8360/api/auth/loginwx',
              method: 'POST',
              data: {
                code: res.code,
                userInfo: fullUserInfo
              },
              success: ({data}) => {
                wx.setStorageSync('token', data.data.token);
                wx.setStorageSync('userInfo', data.data.userInfo);
                this.globalData.token = data.data.token;
                this.globalData.userInfo = data.data.userInfo;
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
})