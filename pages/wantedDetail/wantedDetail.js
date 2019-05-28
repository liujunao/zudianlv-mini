const app = getApp()
var utils = require('../../utils/util.js')
var config = require('../../utils/config.js')
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    collectIconSrc: '../../assert/icons/collect.png',
    postDetail: null,
    type: '', //类型 '':联系Ta , 1:确认发布
    collected: false,
  },
  onLoad: function(options) {
    let postDetail = JSON.parse(options.postDetail);
    this.setData({
      postDetail: postDetail
    });
    if (options.type) {
      this.setData({
        type: options.type
      });
    }
    console.log("this postDetail", this.data.postDetail)
    console.log("type", this.data.type)
  },

  /* 收藏 */
  collectClick() {
    let collected = this.data.collected;
    this.setData({
      collected: !collected
    })

    let publishId = this.data.postDetail.publishId
    wx.request({
      url: app.serverUrl + '/user/favorite/change',
      method: "POST",
      data: {
        otherId: publishId,
        openId: app.getGlobalUserInfo().openId,
        type: 2
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("收藏", res.data)
      }
    })

  },

  publishClick() {
    wx.showNavigationBarLoading();
    let data = {
      openId: app.getGlobalUserInfo().openId,
      nickName: app.getGlobalUserInfo().nickName,
      gender: app.getGlobalUserInfo().gender,
      avatarUrl: app.getGlobalUserInfo().avatarUrl,
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: this.data.postDetail.weixin,
      message: this.data.postDetail.message,
      money: this.data.postDetail.money,
      yyyy: this.data.postDetail.yyyy,
      week: '',
      beginTime: this.data.postDetail.beginTime,
      endTime: this.data.postDetail.endTime,
      createTime: utils.getCurrTime(),
      status:0,
    }
    /* 缓存中没有微信信息则更新微信信息 */
    if (!app.getGlobalUserInfo().weixin) {
      config.updateUserInfo(data.weixin)
    }
    console.log("data: ", data)
    wx.request({
      url: app.serverUrl + '/publish/add',
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        /* 在全局变量里设置新的post信息 */
        app.globalData.wantedPost = data
        app.globalData.newPostAdded = true

        console.log("上传租车信息", res.data)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: function() {
            wx.hideNavigationBarLoading()
            setTimeout(function() {
              //要延时执行的代码
              wx.switchTab({
                url: '../wanted/wanted'
              });
            }, 1000) //延迟时间
          },
        })
      }
    })

  },
  modifyClick() {
    wx.navigateTo({
      url: '../addWanted/addWanted'
    })
  },
  contactClick() {
    let weixin = this.data.postDetail.weixin
    wx.setClipboardData({
      data: weixin,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
    wx.showModal({
      title: '提示',
      content: '联系方式（微信ID）已复制到剪贴板',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})