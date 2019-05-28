const app = getApp()
const updateUserInfo = weixin => {
  wx.request({
    url: app.serverUrl + '/user/append',
    method: "POST",
    data: {
      openId: app.getGlobalUserInfo().openId,
      college: app.getGlobalUserInfo().college,
      grade: app.getGlobalUserInfo().grade,
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: weixin 
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      if (res.data.openId) {
        app.setGlobalUserInfo(res.data)
      }
      console.log("update success")
    }
  })
}

module.exports = {
  updateUserInfo: updateUserInfo
}