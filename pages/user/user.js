// pages/user/user.js
const app = getApp()

Page({
  data: {
    hustImage: "../../assert/icons/mobile.jpg",
    carImage: "../../assert/icons/mobile.jpg",
  },
  onLoad: function(options) {

  },
  //补全用户信息
  appendUser: function(e) {
    var formObject = e.detail.value
    //对各个字段进行简单验证
    var that = this
    //验证通过，请求后台
    wx.request({
      url: app.serverUrl + '/user/append',
      method: "POST",
      data: {
        openId: app.getGlobalUserInfo().openId,
        college: "软件学院",
        grade: "大二",
        area: "韵苑公寓",
        areaNum: "16",
        weixin: '' //不应强行填写发布时进行提醒填写
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
        console.log("图片路径", tempFilePaths)
        that.setData({
          hustImage: tempFilePaths[0]
        })
      },
    })
  },
  uploadHust() {
    var that = this
    wx.uploadFile({
      url: app.serverUrl + '/user/upload?openId=' + app.getGlobalUserInfo().openId,
      filePath: that.data.hustImage,
      name: 'hust',
      success: function(res) {
        console.log(res.data)
        var data = JSON.parse(res.data)
        console.log("data", data)
        app.setGlobalUserInfo(data)
      }
    })
  },
  //出租信息添加
  addRent() {
    var that = this
    let data = {
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
        message: "111message000",
        rent: 0,
        manned: 0,
        money: 0,
        carImage: that.data.hustImage
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
    };
    console.log("data: ", data)
    wx.request({
      url: app.serverUrl + '/user/rent/add',
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("上传了", res)
      }
    })
    console.log("上传照片")
    wx.uploadFile({
      url: app.serverUrl + '/user/rent/addCar?openId=' + app.getGlobalUserInfo().openId,
      filePath: that.data.hustImage,
      name: 'car',
      success: function(res) {
        var data = JSON.parse(res.data)
        console.log(data.carImage)
        // that.setData({
        //   hustImage: app.serverUrl + data.carImage
        // })
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
  //二手车信息添加
  addUsed(){
    let data = {
      openId: app.getGlobalUserInfo().openId,
      nickName: app.getGlobalUserInfo().nickName,
      gender: app.getGlobalUserInfo().gender,
      avatarUrl: app.getGlobalUserInfo().avatarUrl,
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: app.getGlobalUserInfo().weixin,
      usedImage:this.data.hustImage,
      message: 'ershouershou',
      money: '1',
      used:1,
      usedId:'1'
    }
    console.log("data: ", data)
    wx.request({
      url: app.serverUrl + '/user/used/change',
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("上传租车信息", res.data)
      }
    })
  },

  //租车信息添加
  addWanted() {
    let data = {
      openId: app.getGlobalUserInfo().openId,
      nickName: app.getGlobalUserInfo().nickName,
      gender: app.getGlobalUserInfo().gender,
      avatarUrl: app.getGlobalUserInfo().avatarUrl,
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: app.getGlobalUserInfo().weixin,
      message: 'zuche',
      money: '1',
      yyyy: '1999-12-12',
      week: 1,
      beginTime: '01:00',
      endTime: '00:00',
    }
    console.log("data: ", data)
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
        message: 'zuche',
        money: '1',
        yyyy: '1999-12-12',
        week: 1,
        beginTime: '01:00',
        endTime: '00:00',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("上传租车信息", res.data)
      }
    })

  },
  //发布二手车照片
  addUsedCarPic(){
    var that = this
    wx.uploadFile({
      url: app.serverUrl + '/user/used/addCar?openId=' + app.getGlobalUserInfo().openId,
      filePath: that.data.hustImage,
      name: 'car',
      success: function (res) {
        console.log("请求成功",res.data)
        // var data = JSON.parse(res.data)
        // console.log(data.carImage)
        // that.setData({
        //   hustImage: app.serverUrl + data.carImage
        // })
      }
    })
  },

  //请求出租车列表数据
  getRentListClick() {
    var that = this
    wx.request({
      url: app.serverUrl + '/rent/list',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("出租列表：", res.data)
        console.log("出租车图片：", res.data[1].rent.carImage)
        that.setData({
          hustImage: app.serverUrl + res.data[1].rent.carImage
        })
      }
    })

  },


  getPublishListClick() {
    wx.request({
      url: app.serverUrl + '/publish/list',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("租车列表：", res.data)
      }
    })
  },

  getUsedListClick(){
    wx.request({
      url: app.serverUrl + '/used/list',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("二手车列表：", res.data)
      }
    })
  },
  getMyRent(){
    let data = { openId: app.getGlobalUserInfo().openId}
    console.log("data:",data)
    wx.request({
      url: app.serverUrl + '/user/rent/list',
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("我的出租：", res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */


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