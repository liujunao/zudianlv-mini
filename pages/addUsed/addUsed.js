const app = getApp()
Page({
  data: {
    note: '',  //二手车描述
    price: '',
    priceArray: [300, 500, 600, 700, 800, 900, 1000, 1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000],
    imageUrl: '',
    weixin: '',
    changeWeixin: false,
  },

  onLoad: function(options) {
    if (app.getGlobalUserInfo().weixin) {
      this.setData({
        weixin: app.getGlobalUserInfo().weixin
      })
    }
  },
  
  compliteClick() {
    if (!this.data.imageUrl) {
      wx.showToast({
        title: '请添加电动车图片',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.note) {
      wx.showToast({
        title: '请添加二手车描述',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.price) {
      wx.showToast({
        title: '请选择二手车出售价格',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.weixin && !app.getGlobalUserInfo().weixin) {
      wx.showToast({
        title: '请填写联系方式(微信)',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      let postDetail = {
        usedId: '',
        openId: app.getGlobalUserInfo().openId,
        nickName: app.getGlobalUserInfo().nickName,
        avatarUrl: app.getGlobalUserInfo().avatarUrl,
        gender: app.getGlobalUserInfo().gender, //man:0, woman:1
        area: app.getGlobalUserInfo().area,
        areaNum: app.getGlobalUserInfo().areaNum,
        weixin: this.data.weixin,
        usedImage: this.data.imageUrl,
        message: this.data.note,
        money: this.data.price,
        createTime: '刚刚'
      };
      wx.navigateTo({
        url: '../usedDetail/usedDetail?postDetail=' + JSON.stringify(postDetail) + '&type=1'
      })
    }
  },

  weixinInput(e) {
    console.log(e.detail.value);
    this.setData({
      changeWeixin: true,
      weixin: e.detail.value
    })
  },
  addPicClick() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({ imageUrl: tempFilePaths[0] })
      }
    })
  },
  noteInput(e) {
    console.log(e.detail.value);
    this.setData({
      note: e.detail.value
    })
  },
  priceChange(e) {
    let index = e.detail.value;
    let price = this.data.priceArray[index];
    this.setData({
      price: price
    })
    console.log(price);
  },
})