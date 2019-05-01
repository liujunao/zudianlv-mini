const app = getApp()

Page({
  data: {
    hasUserInfo: false //用于判断是否显示"获取权限"按钮
  },
  onLoad: function() {
    var that = this
    if (app.getGlobalUserInfo()) { //用户缓存信息存在
      that.setData({
        hasUserInfo: true
      })
      //页面自动跳转到主页面
      wx.reLaunch({
        url: '../rent/rent',
      })
    }
  },
  getUserInfo: function(e) { //允许获取权限
    var userInfo = e.detail.userInfo
    wx.login({
      success: function(res) {
        var code = res.code //获取临时凭证
        wx.request({
          url: app.serverUrl + '/user/wxLogin',
          method: "POST",
          data: {
            code: code,
            nickName: userInfo.nickName,
            gender: userInfo.gender,
            avatarUrl: userInfo.avatarUrl
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            console.log(res.data)
            // if (res.data.id) {
            //   app.setGlobalUserInfo(res.data)
            // }
            //页面自动跳转到主页面
            wx.reLaunch({
              url: '../rent/rent',
            })
          }
        })
      }
    })
  },
  click: function() {
    wx.request({
      url: app.serverUrl + '/user/wxLogin',
      method: "POST",
      data: {
        code: "code",
        nickName: "yinren",
        gender: 1,
        avatarUrl: "http"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        // if (res.data.id) {
        //   app.setGlobalUserInfo(res.data)
        // }
        //页面自动跳转到主页面
        wx.reLaunch({
          url: '../rent/rent',
        })
      }
    })
  }
})