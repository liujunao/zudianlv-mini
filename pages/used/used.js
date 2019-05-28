const app =getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    addUrl:'../../assert/icons/add2.png',
    posts:[],
    reminder: '',
  },
  onShow(){
    console.log("used onshow")
    console.log("new post", app.globalData.usedPost)
    console.log("new post", app.globalData.newPostAdded)
    console.log("old posts", this.data.posts)
    if (app.globalData.newPostAdded) {
      app.globalData.newPostAdded = false;
      let newPost = app.globalData.usedPost;
      newPost.createTime = utils.getStringTime(newPost.createTime);
      newPost.usedImage = app.serverUrl + newPost.usedImage;
      let posts = this.data.posts;
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].openId == newPost.openId) {
          posts.splice(i, 1);
          break;
        }
      }
      posts.unshift(newPost)
      this.setData({
        posts: posts
      })
    }
  },
  onLoad: function(options) {
    console.log("rent onload")
    var that = this
    var that = this
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.serverUrl + '/used/list',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log("二手车列表：", res.data)
        that.setData({
          posts: utils.formatUsedpostList(res.data)
        })
        if (res.data.length === 0) {
          reminder: '最近没有用户发布二手车信息哦~'
        }
      }
    })
  },
  postClick(e) {
    console.log(e);
    let postDetail = e.currentTarget.dataset.postdetail;
    wx.navigateTo({
      url: '../usedDetail/usedDetail?postDetail=' + JSON.stringify(postDetail)
    })

    /* 修改浏览次数 */
    console.log("点击：", postDetail)
    let count = postDetail.count || 0;
    count = parseInt(count) + 1;
    wx.request({
      url: app.serverUrl + '/used/count?usedId=' + postDetail.usedId + '&count=' + count,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("修改count", res)
      }
    })
  },
  addClick() {
    wx.navigateTo({
      url: '../addUsed/addUsed'
    })
  }
})