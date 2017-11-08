// pages/list-product/list-product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: null,
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    });

    this.getProductData(true);
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

  // 到达底部，获取更多数据
  onReachBottom: function () {
    this.getProductData();
  },

  getProductData: function (init) {
    if (init) {
      this.setData({
        page: 1
      });
    } else {
      this.setData({
        page: this.data.page+1
      });
    }

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    setTimeout(() => {
      let result;
      if (init) {
        result = new Array(10).fill({
          name: '盐焗手撕鸡',
          price: 17
        });
      } else {
        result = this.data.products.concat(new Array(10).fill({
          name: '盐焗手撕鸡',
          price: 17
        }));
      }

      this.setData({
        products: result
      });

      wx.hideLoading();
    }, 1000);
  },

  selectProduct: function (e) {
    const product = e.currentTarget.dataset.product;

    console.log(product);

    wx.showModal({
      title: '提示',
      content: `是否下订${product.name}`,
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateBack();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  }
})