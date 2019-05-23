//app.js
App({
  serverUrl: "http://127.0.0.1:8081",
  // serverUrl: "https://zudianlv.club:8443",

  setGlobalUserInfo: function(user) {
    wx.setStorageSync("userInfo", user)
  },

  getGlobalUserInfo: function() {
    return wx.getStorageSync("userInfo")
  }
})