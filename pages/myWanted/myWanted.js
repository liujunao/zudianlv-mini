// pages/myWanted/myWanted.js
const app = getApp()
var utils = require('../../utils/util.js')
Page({

  data: {
    posts: null,
  },

  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.serverUrl + '/user/publish/list?openId=' + app.getGlobalUserInfo().openId,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("我的租车：", res.data)
        let postList = res.data
        for (let i = 0; i < postList.length; i++) {
          postList[i].createTime = utils.getStringTime(postList[i].createTime)
        }
        that.setData({
          posts: postList
        })
      }
    })
  },
  checkClick(e) {
    let postDetail = e.currentTarget.dataset.postdetail;
    let time = postDetail.yyyy.split('-')
    let mon = String(parseInt(time[1]))
    let day = String(parseInt(time[2]))
    postDetail.timeString = mon + '月' + day + '日' + ' ' + postDetail.beginTime + '-' + postDetail.endTime
    console.log("new postdetail", postDetail);
    wx.navigateTo({
      url: '../wantedDetail/wantedDetail?postDetail=' + JSON.stringify(postDetail) + '&type=2'
    })
  },
  deleteClick(e) {
    let postDetail = e.currentTarget.dataset.postdetail;
    var that = this
    console.log("点击", postDetail)
    wx.showModal({
      title: '提示',
      content: '此贴将被撤回发布并删除',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.serverUrl + '/user/publish/delete?publishId=' + postDetail.publishId + '&openId=' + postDetail.openId,
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              console.log("修改状态", res)
              /* 删除这条帖子 */
              let posts = that.data.posts;
              for(let i=0; i<posts.length; i++){
                if(posts[i].publishId === postDetail.publishId){
                  posts.splice(i, 1);
                  break;
                }
              }
              that.setData({
                posts:posts
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
            }
          })
          // wx.request({
          //   url: app.serverUrl + '/user/publish/delete',
          //   method: "POST",
          //   data: {
          //     publishId: postDetail.publishId,
          //     openId: postDetail.openId
          //   },
          //   header: {
          //     'content-type': 'application/json' // 默认值
          //   },
          //   success: function(res) {
          //     console.log(res.data)
          //     wx.showToast({
          //       title: '删除成功',
          //       icon: 'success',
          //       duration: 1000
          //     })
          //   }
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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