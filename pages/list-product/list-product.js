// pages/list-product/list-product.js
const host = require('../../config').host;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: null,
    products: []
  },
  still: true,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('ListProduct.onLoad');
    if (!options.groupId) {
      wx.navigateBack();
    }

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
    if (this.still) {
      this.getProductData();
    }
  },

  // 加载产品列表
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

    wx.request({
      url: `${host}/api/product/list`,
      method: 'POST',
      data: {
        page: this.data.page
      },
      header: {
        'authorization': app.globalData.token
      },
      success: ({data}) => {
        if (data.data.length === 0) {
          this.still = false;
        }

        let result;
        if (init) {
          result = data.data;
        } else {
          result = this.data.products.concat(data.data);
        }

        this.setData({
          products: result
        });

        wx.hideLoading();
      }
    });
  },

  // 添加产品到订单团
  selectProduct: function (e) {
    const product = e.currentTarget.dataset.product;

    const query = {
      groupId: this.data.groupId,
      productId: product.id
    };

    wx.showModal({
      title: '提示',
      content: `是否下订${product.name}`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            mask: true,
            title: '处理中'
          });

          wx.request({
            url: `${host}/api/order/create`,
            method: 'POST',
            data: query,
            header: {
              'authorization': app.globalData.token
            },
            success: ({data}) => {
              console.log(data.data);
              wx.hideLoading();
              wx.navigateBack();
            }
          });
        }
      }
    });
  }
})