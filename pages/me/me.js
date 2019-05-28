const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    passUrl: '../../assert/icons/pass.png',
    nextUrl: '../../assert/icons/next.png',
    userUrl: '../../assert/icons/user.png',
    hasUserInfo: false,
    username: '',
    avatarUrl: '',
    baseInfo: false,
  },
  onShow() {
    console.log("me onshow")
    if (app.getGlobalUserInfo().hustImage) {
      this.setData({
        baseInfo: true
      })
    }
  },
  onLoad() {
    console.log("me onload")
    if (app.getGlobalUserInfo()) { //用户缓存信息存在
      console.log("huan存存在")
      this.setData({
        hasUserInfo: true,
        username: app.getGlobalUserInfo().nickName,
        avatarUrl: app.getGlobalUserInfo().avatarUrl
      })

      if (app.getGlobalUserInfo().hustImage) {
        this.setData({
          baseInfo: true
        })
      }
      //登录校验
      // wx.login({
      //   success: function(res) {
      //     var code = res.code //获取临时凭证
      //     console.log("code: " + code)
      //     //校验用户信息是否改变，如： 昵称、头像等
      //     wx.request({
      //       url: app.serverUrl + '/user/wxLogin?code=' + code,
      //       method: "POST",
      //       header: {
      //         'content-type': 'application/json' // 默认值
      //       },
      //       success: function(res) {
      //         console.log(res.data)
      //         // var openId = app.getGlobalUserInfo().openId
      //         // //若用户信息改变，则需用户再次进行权限认证 getUserInfo
      //         // if (res.data.openId == openId) { //用户信息未改变
      //         //   //页面自动跳转到主页面
      //         //   wx.reLaunch({
      //         //     url: '../meInfo/meInfo',
      //         //   })
      //         // }
      //       }
      //     })
      //   }
      // })
    }
  },
  getUserInfo: function(e) { //允许获取权限
    console.log("getUserINfo click!")
    var userInfo = e.detail.userInfo
    var that = this
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
            if (res.data.hustImage) {
              that.setData({
                baseInfo: true
              })
            }
            that.setData({
              hasUserInfo: true,
              username: app.getGlobalUserInfo().nickName,
              avatarUrl: app.getGlobalUserInfo().avatarUrl
            })
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },
  editInfo() {
    wx.navigateTo({
      url: '../meInfo/meInfo'
    })
  },
  myRentClick() {
    wx.navigateTo({
      url: '../myRent/myRent'
    })
  },
  myUsedClick() {
    wx.navigateTo({

      url: '../myUsed/myUsed'
    })
  },
  myWantedClick() {
    wx.navigateTo({
      url: '../myWanted/myWanted'
    })
  },
  myCollectClick(){
    wx.navigateTo({
      url: '../myCollect/myCollect'
    })
  }
})