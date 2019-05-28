  const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    passUrl: '../../assert/icons/pass.png',
    postDetail:'',
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.serverUrl + '/user/rent/list?openId=' + app.getGlobalUserInfo().openId,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("我的出租：", res.data)
        let postDetail = utils.restoreRentItem(res.data)
        that.setData({
          postDetail: postDetail,
        });
      }
    })
  },
  checkClick(){
    wx.navigateTo({
      url: '../rentDetail/rentDetail?postDetail=' + JSON.stringify(this.data.postDetail) + '&type=2'
    })
  },
  /* 撤回发布 */
  deleteClick() {
    var that = this
    let postDetail = this.data.postDetail;
    console.log(postDetail)
    wx.showModal({
      title: '提示',
      content: '此贴将不再对其他用户可见',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.serverUrl + '/user/rent/rent?rentId=' + postDetail.rentId + '&rent=' + 2,
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '已撤回发布',
                icon: 'success',
                duration: 1000
              })
              postDetail.rent = 2
              that.setData({
                postDetail: postDetail
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  rePubClick() {
    var that = this
    let postDetail = this.data.postDetail;
    console.log(postDetail)
    wx.showModal({
      title: '提示',
      content: '此贴将重新发布并对其他用户可见',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.serverUrl + '/user/rent/rent?rentId=' + postDetail.rentId + '&rent=' + 1,
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 1000
              })
              postDetail.rent = 1
              that.setData({
                postDetail: postDetail
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})