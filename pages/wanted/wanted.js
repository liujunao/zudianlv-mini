const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    switchUrl: '../../assert/icons/switch.png',
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    posts:[],
    neiborPosts:[],
    newestPosts:[],
    reminder: '',
    newest:false
  },
  onShow() {
    console.log(" rent onshow")
    console.log("new post", app.globalData.wantedPost)
    console.log("new post", app.globalData.newPostAdded)
    console.log("old posts", this.data.posts)
    if (app.globalData.newPostAdded) {
      app.globalData.newPostAdded = false
      let newPost = app.globalData.wantedPost
      let time = newPost.yyyy.split('-')
      let mon = String(parseInt(time[1]));
      let day = String(parseInt(time[2]));
      newPost.timeString = mon + '月' + day + '日' + ' ' + newPost.beginTime + '-' + newPost.endTime;
      newPost.createTime = utils.getStringTime(newPost.createTime);
      
      let posts = this.data.posts
      posts.unshift(newPost)
      this.setData({
        posts: posts,
        newestPosts: posts
      })
    }
  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.serverUrl + '/publish/list',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log("租车列表：", res.data)
        console.log("new list", utils.formatWantedPostList(res.data))
        that.setData({
          posts: utils.formatWantedPostList(res.data),
          newestPosts: utils.formatWantedPostList(res.data)
        })
        if (res.data.length === 0) {
         that.setData({
           reminder: '最近没有用户发布租车需求哦~~'
         })
        }
      }
    })

  },
  /* 切换到附近 */
  switchToNeibor(){
    wx.showNavigationBarLoading();
    setTimeout(function () {
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
    console.log("附近的",neiborPosts)
    this.setData({
      posts: neiborPosts,
      newest:true,
      reminder: area + '暂没有用户发布租车需求哦~'
    })
  },
  /* 切换到最新 */
  switchToNewest(){
    wx.showNavigationBarLoading();
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 500)
    console.log("切换到最新：",this.data.newestPosts)
    this.setData({
      posts: this.data.newestPosts,
      newest: false,
      reminder: '最近没有用户发布租车需求哦~~'
    })
    
  },
  
  postClick(e) {
    let postDetail = e.currentTarget.dataset.postdetail;
    wx.navigateTo({
      url: '../wantedDetail/wantedDetail?postDetail=' + JSON.stringify(postDetail)
    })

    /* 修改浏览次数 */
    console.log("点击：", postDetail)
    let count = postDetail.count || 0;
    count = parseInt(count) + 1;
    wx.request({
      url: app.serverUrl + '/publish/count?publishId=' + postDetail.publishId + '&count=' + count,
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
    wx.showActionSheet({
      itemList: ['我想租车', '我想出租'],
      itemColor: app.globalData.mainColor,
      success(res) {
        let index = res.tapIndex;
        if (index == 0) {
          wx.navigateTo({
            url: '../addWanted/addWanted?'
          })
        }
        if (index == 1) {
          wx.navigateTo({ 
             url: '../addRent/addRent?'
          })
        }
      },
      fail(res) {
        console.log("fail", res.errMsg)
      }
    })
  }
})
