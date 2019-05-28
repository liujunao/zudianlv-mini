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
    timeString: '',
    type: '', //类型 '':联系Ta , 1:确认发布 ,2:修改
    collected: false,
  },
  onLoad: function(options) {
    let postDetail = JSON.parse(options.postDetail);
    this.setData({
      postDetail: postDetail,
    });
    if (options.type) {
      this.setData({
        type: options.type
      })
      if (options.type == 1) {
        this.setData({
          timeString: utils.transfromRentTime(postDetail.rentTime[0])
        })
      }
    }
    console.log("this postDetail", this.data.postDetail)
    console.log("type", this.data.type)
  },
  /* 收藏 */
  collectClick(){
    let collected = this.data.collected;
    this.setData({
      collected: !collected
    })

    let rentId = this.data.postDetail.rentId
    wx.request({
      url: app.serverUrl + '/user/favorite/change',
      method: "POST",
      data: {
        otherId: rentId,
        openId: app.getGlobalUserInfo().openId,
        type: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("收藏", res.data)
      }
    })

  },
  /* 发布成功后跳转出租首页 */
  publishClick() {
    wx.showNavigationBarLoading();
    let data = utils.formatRentInfo(this.data.postDetail)
    console.log("请求发送数据", data)
    var that = this
    /* 缓存中没有微信信息则更新微信信息 */
    if (!app.getGlobalUserInfo().weixin) {
      config.updateUserInfo(data.rent.weixin)
    }
    wx.request({
      url: app.serverUrl + '/user/rent/add',
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("上传成功", res)
      }
    })
    /* 上传照片 */
    wx.uploadFile({
      url: app.serverUrl + '/user/rent/addCar?openId=' + app.getGlobalUserInfo().openId,
      filePath: data.rent.carImage,
      name: 'car',
      success: function(res) {
        data.rent.carImage = JSON.parse(res.data).carImage
        /* 在全局变量里设置新的post信息 */
        app.globalData.rentPost = data
        app.globalData.newPostAdded = true

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
                url: '../rent/rent'
              });
            }, 1000) //延迟时间
          },
        })
      }
    })
  },
  modifyClick() {
    wx.navigateTo({
      url: '../addRent/addRent'
    })
  },

  contactClick() {
    let weixin = this.data.postDetail.weixin
    wx.setClipboardData({
      data: weixin,
      success(res) {
        // wx.getClipboardData({
        //   success(res) {
        //     console.log(res.data) // data
        //   }
        // })
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