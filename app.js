//app.js
App({
  onLaunch: function () {

  },
  // serverUrl: "http://127.0.0.1:8081",
  serverUrl: "https://zudianlv.club:8443",

  setGlobalUserInfo: function (user) {
    wx.setStorageSync("userInfo", user)
  },

  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo")
  },
  globalData: {
    userInfo: null,
    mainColor: "#ff78ae", //！需要
    rentPost:{},
    wantedPost:{},
    usedPost:{},
    newPostAdded:false,
    /* 收藏列表 */
    collectList:[]
  }
})