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
      //登录校验
      wx.login({
        success: function(res) {
          var code = res.code //获取临时凭证
          console.log("code: " + code)
          //校验用户信息是否改变，如： 昵称、头像等
          wx.request({
            url: app.serverUrl + '/user/wxLogin?code=' + code,
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              console.log(res.data)
              var openId = app.getGlobalUserInfo().openId
              //若用户信息改变，则需用户再次进行权限认证 getUserInfo
              if (res.data.openId == openId) { //用户信息未改变
                //页面自动跳转到主页面
                wx.reLaunch({
                  url: '../rent/rent',
                })
              }
            }
          })
        }
      })
    }
  },
  getUserInfo: function(e) { //允许获取权限
    var userInfo = e.detail.userInfo
    wx.login({
      success: function(res) {
        var code = res.code //获取临时凭证
        wx.request({
          url: app.serverUrl + '/user/wxRegister',
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
            if (res.data.openId) {
              app.setGlobalUserInfo(res.data)
            }
            //页面自动跳转到主页面
            wx.reLaunch({
              url: '../user/user',
            })
          }
        })
      }
    })
  }
})