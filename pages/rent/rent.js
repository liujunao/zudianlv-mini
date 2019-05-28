// pages/rent/rent.js
const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    switchUrl: '../../assert/icons/switch.png',
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    reminder: '',
    posts: [],
    neiborPosts: [],
    newestPosts: [],
    newest: false
  },
  onShow() {
    console.log(" rent onshow")
    console.log("new post", app.globalData.rentPost)
    console.log("new post", app.globalData.newPostAdded)
    console.log("old posts", this.data.posts)
    if (app.globalData.newPostAdded) {
      app.globalData.newPostAdded = false
      let newPost = utils.restoreRentItem(app.globalData.rentPost)
      let posts = this.data.posts
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].openId == newPost.openId) {
          posts.splice(i, 1);
          break;
        }
      }
      posts.unshift(newPost)
      this.setData({
        posts: posts,
        newestPosts: posts
      })
    }
  },
  onLoad: function() {
    console.log("rent onload")
    var that = this
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.serverUrl + '/rent/list',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        console.log("出租列表:", res.data)
        that.setData({
          posts: utils.restoreRentInfo(res.data),
          newestPosts: utils.restoreRentInfo(res.data)
        })
        if (res.data.length === 0) {
          that.setData({
            reminder: '最近没有用户发布出租信息哦~'
          })
        }
      }
    })
  },
  /* 切换到附近 */
  switchToNeibor() {
    wx.showNavigationBarLoading();
    setTimeout(function() {
      wx.hideNavigationBarLoading()
    }, 500)
    let posts = this.data.posts;
    let area = app.getGlobalUserInfo().area;
    let areaNum = app.getGlobalUserInfo().areaNum;
    let neiborPosts = [];
    /* 先添加同一公寓同一楼栋信息 */
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].area == area && posts[i].areaNum == areaNum) {
        neiborPosts.push(posts[i])
      }
    }
    /* 再添加同一公寓不同楼栋信息 */
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].area == area && posts[i].areaNum != areaNum) {
        neiborPosts.push(posts[i])
      }
    }
    console.log("附近的", neiborPosts)
    this.setData({
      posts: neiborPosts,
      newest: true,
      reminder: area + '暂没有用户发布出租信息哦~'
    })
  },
  /* 切换到最新 */
  switchToNewest() {
    wx.showNavigationBarLoading();
    setTimeout(function() {
      wx.hideNavigationBarLoading()
    }, 500)
    console.log("切换到最新：", this.data.newestPosts)
    this.setData({
      posts: this.data.newestPosts,
      newest: false,
      reminder: '最近没有用户发布出租信息哦~'
    })
  },


  postClick(e) {
    console.log(e);
    let postDetail = e.currentTarget.dataset.postdetail;
    wx.navigateTo({
      url: '../rentDetail/rentDetail?postDetail=' + JSON.stringify(postDetail)
    })
    /* 修改浏览次数 */
    console.log("点击：",postDetail)
    let count = postDetail.count || 0;
    count = parseInt(count) + 1;
    wx.request({
      url: app.serverUrl + '/rent/count?rentId=' + postDetail.rentId + '&count=' + count,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("修改count", res)
      }
    })


  },
  filterClick() {
    wx.navigateTo({
      url: '../filter/filter',
    })
  },
  addClick() {
    wx.showActionSheet({
      itemList: ['我想出租', '我想租车'],
      itemColor: app.globalData.mainColor,
      success(res) {
        let index = res.tapIndex;
        if (index == 0) {
          wx.navigateTo({
            url: '../addRent/addRent?'
          })
        }
        if (index == 1) {
          wx.navigateTo({
            url: '../addWanted/addWanted?'
          })
        }
      },
      fail(res) {
        console.log("fail", res.errMsg)
      }
    })
  },

  selectRent: function() {
    wx.request({
      url: app.serverUrl + '/rent/select',
      method: "POST",
      data: {
        area: "韵苑",
        areaNum: "",
        week: [],
        manned: "",
        gender: "1"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },
})