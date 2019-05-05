//test.js模板消息
//获取应用实例
const app = getApp()
Page({
  data: {

  },
  onLoad: function () {
    console.log("app onLoad");
    //获取openid
    var user = wx.getStorageSync('user') || {};
    if (!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) {//不要在30天后才更换openid-尽量提前10分钟更新
      wx.login({
        success: function (res) {
          // success
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.globalData.appId + '&secret=' + app.globalData.appSecret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET',
            // header: {}, // 设置请求的 header
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;

              wx.setStorageSync('user', obj);//存储openid
            }
          });
        }
      });
    } else {
      console.log(user);
    }
  },
  orderSign: function (e) {
    var fId = e.detail.formId;
    console.log("formId: ", fId);
    var fObj = e.detail.value;
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + app.globalData.access_token;
    var d = {
      touser: wx.getStorageSync('user').openid,
      template_id: 'iw_PjF7pL0-B0orRFTtTerVoaUovw8nA0-2fskgGDwM',//这个是1、申请的模板消息id，
      page: '/pages/index/index',
      form_id: fId,
      data: {
        "keyword1": {
          "value": "租车",
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": "今天是个好天气",
          "color": "#9b9b9b"
        },
        "keyword3": {
          "value": "回帖人",
          "color": "#9b9b9b"
        },
        "keyword4": {
          "value": "回帖内容",
          "color": "#9b9b9b"
        },
        "keyword5": {
          "value": "$300",
          "color": "red"
        },
        "keyword6": {
          "value": "$300",
          "color": "red"
        }
      },
      color: '#ccc',
      //emphasis_keyword: 'keyword1.DATA'
    }
    wx.request({
      url: l,
      data: d,
      method: 'POST',
      success: function (res) {
        console.log("push msg");
        console.log(res);
      },
      fail: function (err) {
        // fail
        console.log("push err")
        console.log(err);
      }
    });
  }

})
