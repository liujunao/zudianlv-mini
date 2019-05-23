// pages/wantedPost/wantedPost.js
const app = getApp()
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    collectIconSrc: '../../assert/icons/collect.png',
    postDetail: null,
    type: '', //类型 '':联系Ta , 1:确认发布
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
  publishClick() {
    let weekdayArray = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    let data = {
      openId: app.getGlobalUserInfo().openId,
      nickName: app.getGlobalUserInfo().nickName,
      gender: app.getGlobalUserInfo().gender,
      avatarUrl: app.getGlobalUserInfo().avatarUrl,
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: '',
      message: this.data.postDetail.message,
      money: this.data.postDetail.money,
      yyyy: this.data.postDetail.yyyy,
      week: weekdayArray.indexOf(this.data.postDetail.week) + 1,
      beginTime: this.data.postDetail.beginTime,
      endTime: this.data.postDetail.endTime,
      time: '' //未处理
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
        console.log("上传租车信息", res.data)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: function() {
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