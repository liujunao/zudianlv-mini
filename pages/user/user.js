// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hustImage: "../../resource/img/noneface.png",
    carImage: "../../resource/img/noneface.png"
  },
  //补全用户信息
  appendUser: function(e) {
    var formObject = e.detail.value
    //对各个字段进行简单验证

    //验证通过，请求后台
    wx.request({
      url: app.serverUrl + '/user/append',
      method: "POST",
      data: {
        openId: app.getGlobalUserInfo().openId,
        college: formObject.college,
        grade: formObject.grade,
        area: formObject.area,
        areaNum: formObject.areaNum,
        weixin: formObject.weixin
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.openId) {
          app.setGlobalUserInfo(res.data)
        }
        console.log("append success")
      }
    })
  },
  //上传学生证照片
  changeHust: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: app.serverUrl + '/user/upload?openId=' + app.getGlobalUserInfo().openId,
          filePath: tempFilePaths[0],
          name: 'hust',
          success: function(res) {
            var data = JSON.parse(res.data)
            that.setData({
              hustImage: app.serverUrl + data.hustImage
            })
          }
        })
      },
    })
  },
  //出租信息添加
  addRent: function(e) {
    var formObject = e.detail.value
    var that = this

    console.log("money: " + formObject.money)

    wx.request({
      url: app.serverUrl + '/user/rent/add',
      method: "POST",
      data: {
        rent: {
          openId: app.getGlobalUserInfo().openId,
          nickName: app.getGlobalUserInfo().nickName,
          gender: app.getGlobalUserInfo().gender,
          avatarUrl: app.getGlobalUserInfo().avatarUrl,
          college: app.getGlobalUserInfo().college,
          grade: app.getGlobalUserInfo().grade,
          area: app.getGlobalUserInfo().area,
          areaNum: app.getGlobalUserInfo().areaNum,
          weixin: app.getGlobalUserInfo().weixin,
          message: formObject.message,
          rent: formObject.rent,
          manned: formObject.manned,
          carImage: that.data.carImage,
          money: formObject.money
        },
        rentTime: [{
            week: "1",
            beginTime: "1",
            endTime: "1"
          },
          {
            week: "2",
            beginTime: "2",
            endTime: "2"
          }
        ]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        // var data = JSON.parse(res.data)
        // console.log(data)
      }
    })
  },

  //求租信息添加
  addPublish: function(e) {
    var formObject = e.detail.value
    var that = this

    console.log("money: " + formObject.money)

    wx.request({
      url: app.serverUrl + '/publish/add',
      method: "POST",
      data: {
        openId: app.getGlobalUserInfo().openId,
        nickName: app.getGlobalUserInfo().nickName,
        gender: app.getGlobalUserInfo().gender,
        avatarUrl: app.getGlobalUserInfo().avatarUrl,
        area: app.getGlobalUserInfo().area,
        areaNum: app.getGlobalUserInfo().areaNum,
        weixin: app.getGlobalUserInfo().weixin,
        message: formObject.message,
        status: formObject.status,
        money: formObject.money,
        yyyy: "2019-05-26",
        beginTime: "10:00",
        endTime: "20:00"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
      }
    })
  },

  //选择车辆图片
  changeCar: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: app.serverUrl + '/user/rent/addCar?openId=' + app.getGlobalUserInfo().openId,
          filePath: tempFilePaths[0],
          name: 'car',
          success: function(res) {
            var data = JSON.parse(res.data)
            console.log(data.carImage)
            that.setData({
              carImage: app.serverUrl + data.carImage
            })
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.getGlobalUserInfo())
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