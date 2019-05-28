const app = getApp()
var utils = require('../../utils/util.js')
var config = require('../../utils/config.js')
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    postDetail: null,
    collectIconSrc: '../../assert/icons/collect.png',
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

    let usedId = this.data.postDetail.usedId
    wx.request({
      url: app.serverUrl + '/user/favorite/change',
      method: "POST",
      data: {
        otherId: usedId,
        openId: app.getGlobalUserInfo().openId,
        type: 3
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
      // usedImage: this.data.postDetail.usedImage,
      createTime: utils.getCurrTime(),
      message: this.data.postDetail.message,
      money: this.data.postDetail.money,
      used: 1,
      usedId: '1'
    }
    /* 缓存中没有微信信息则更新微信信息 */
    if (!app.getGlobalUserInfo().weixin) {
      config.updateUserInfo(data.weixin)
    }
    wx.request({
      url: app.serverUrl + '/user/used/change',
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("上传二手车信息", res.data)
      }
    })
    console.log("上传照片")
    var that = this
    wx.uploadFile({
      url: app.serverUrl + '/user/used/addCar?openId=' + app.getGlobalUserInfo().openId,
      filePath: that.data.postDetail.usedImage,
      name: 'car',
      success: function (res) {
        console.log("上传照片成功", res.data)
        
        /* 在全局变量里设置新的post信息 */
        data.usedImage = JSON.parse(res.data).usedImage
        app.globalData.usedPost = data
        app.globalData.newPostAdded = true

        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../used/used'
              });
            }, 1000) //延迟时间
          },
        })
      }
    })
  },
  modifyClick() {
    wx.navigateTo({
      url: '../addUsed/addUsed'
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
})