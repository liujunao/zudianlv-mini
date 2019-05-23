// pages/me/me.js
const app = getApp()
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
  onShow(){
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
          },
          complete: () => {
           
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
    //需要先请求
    let userInfo = app.getGlobalUserInfo()
    let postDetail = {
      rentId: '',
      openId: userInfo.openId,
      nickName: userInfo.nickName,
      gender: userInfo.gender, //man:0, woman:1
      avatarUrl: userInfo.avatarUrl,
      area: userInfo.area,
      areaNum: userInfo.areaNum,
      weixin: '',  //填写
      message: '111',
      money: '1',
      manned: 1, //0:可载人 1：不可 2：不限
      rent: 1,
      carImage: userInfo.avatarUrl,
      rentTime: [{
        week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
        beginTime: '12:00', //hh:mm
        endTime: '18:00'
      }],
      rent: 1, //1：发布展示 2：发布未展示
    };
    wx.navigateTo({
      url: '../rentDetail/rentDetail?postDetail=' + JSON.stringify(postDetail) + '&type=2'
    })
  },
  myWantedClick(){
    let postDetail = {
      openId: app.getGlobalUserInfo().openId,
      nickName: app.getGlobalUserInfo().nickName,
      avatarUrl: app.getGlobalUserInfo().avatarUrl,
      gender: app.getGlobalUserInfo().gender, //man:0, woman:1
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: app.getGlobalUserInfo().weixin,
      message: '111',
      money: '1',
      yyyy: '1111', //求租年月日： yyyy-MM-dd
      week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
      beginTime: '00', //hh:mm
      endTime: '11',
      createTime: '1分钟前'
    };
    wx.navigateTo({
      url: '../wantedDetail/wantedDetail?postDetail=' + JSON.stringify(postDetail) + '&type=2'
    })
  },
  myUsedClick(){
    let postDetail = {
      usedId: '',
      openId: app.getGlobalUserInfo().openId,
      nickName: app.getGlobalUserInfo().nickName,
      avatarUrl: app.getGlobalUserInfo().avatarUrl,
      gender: app.getGlobalUserInfo().gender, //man:0, woman:1
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: app.getGlobalUserInfo().weixin,
      usedImage: app.getGlobalUserInfo().avatarUrl,
      message: '111',
      money: '1',
      createTime: '1分钟前'
    };
    wx.navigateTo({
      url: '../usedDetail/usedDetail?postDetail=' + JSON.stringify(postDetail) + '&type=2'
    })
  }
})