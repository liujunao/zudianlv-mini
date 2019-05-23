const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    collectIconSrc: '../../assert/icons/collect.png',
    postDetail: null,
    type: '', //类型 '':联系Ta , 1:确认发布 ,2:修改
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
  /* 添加接口！--------------------------- */
  /* 发布成功后跳转出租首页 */
  publishClick() {
    let data = utils.formatRentInfo(this.data.postDetail)
    console.log("请求发送数据", data)
    var that = this
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
    console.log("上传照片")
    wx.uploadFile({
      url: app.serverUrl + '/user/rent/addCar?openId=' + app.getGlobalUserInfo().openId,
      filePath: data.rent.carImage,
      name: 'car',
      success: function(res) {
        var data = JSON.parse(res.data)
        console.log(data.carImage)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: function () {
            setTimeout(function () {
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
  modifyClick(){
    wx.navigateTo({
      url: '../addRent/addRent'
    })
  },

  contactClick() {
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