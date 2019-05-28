const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectPosts: []
  },
  /* app data里无数据就请求，否则直接赋值 */
  onshow() {
    console.log("mycollect onshow")
  },
  onLoad: function(options) {
    let openId = app.getGlobalUserInfo().openId
    var that = this
    wx.request({
      url: app.serverUrl + '/user/favorite?openId=' + openId,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("我的收藏", res.data)
        that.setData({
          collectPosts: res.data
        })
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