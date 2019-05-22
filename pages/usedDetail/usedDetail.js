const app = getApp()
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    postDetail: null,
    collectIconSrc: '../../assert/icons/collect.png',
    type: '', //类型 '':联系Ta , 1:确认发布 
  },

  onLoad: function(options) {
    let postDetail = JSON.parse(options.postDetail);
    this.setData({
      postDetail: postDetail
    });
    if (options.type) {
      this.setData({
        type: options.type
      });
    }
    console.log("this postDetail", this.data.postDetail)
    console.log("type", this.data.type)
  },
  publishClick() {
    let data = {
      openId: app.getGlobalUserInfo().openId,
      nickName: app.getGlobalUserInfo().nickName,
      gender: app.getGlobalUserInfo().gender,
      avatarUrl: app.getGlobalUserInfo().avatarUrl,
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: app.getGlobalUserInfo().weixin,
      usedImage: this.data.hustImage,
      message: this.data.postDetail.message,
      money: this.data.postDetail.money,
      used: 1,
      usedId: '1'
    }
    var that = this
    wx.request({
      url: app.serverUrl + '/user/rent/add',
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("上传成功", res)
      }
    })
    console.log("上传照片")
    wx.uploadFile({
      url: app.serverUrl + '/user/rent/addCar?openId=' + app.getGlobalUserInfo().openId,
      filePath: data.rent.carImage,
      name: 'car',
      success: function(res) {
        var data = JSON.parse(res.data)
        console.log(data.carImage)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: function() {
            setTimeout(function() {
              //要延时执行的代码
              wx.switchTab({
                url: '../rent/rent'
              });
            }, 1000) //延迟时间
          },
        })
      }
    })
  },
  rentClick() {

  }
})