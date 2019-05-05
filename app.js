//app.js
App({
  onLaunch: function () {

  },
  serverUrl: "http://127.0.0.1:8081",

  setGlobalUserInfo: function (user) {
    wx.setStorageSync("userInfo", user)
  },

  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo")
  },
  globalData: {
    userInfo: null,
    mainColor: "#ff78ae", //！需要
    openId:'abc',
    hustImage:'hustImageUrl',
    college:'软件学院',
    grade:'大二',
    area:'韵苑公寓',
    areaNum:16,
    weixin:'weixin',
    rent:0, //出租信息展示 0：未发布 1：发布展示 2：发布未展示
    used:0 //二手车信息展示 0：未发布 1：发布未出售 2：发布未出售
  }
})