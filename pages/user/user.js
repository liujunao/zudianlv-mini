// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hustImage: "../../resource/img/noneface.png"
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
            console.log(res)
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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