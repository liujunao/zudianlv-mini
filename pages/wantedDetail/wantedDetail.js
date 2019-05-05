// pages/wantedPost/wantedPost.js
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    collectIconSrc: '../../assert/icons/collect.png',
    postDetail: null,
    type: '', //类型 '':联系Ta , 1:确认发布
  },


  onLoad: function (options) {
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