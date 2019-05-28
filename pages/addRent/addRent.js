const app = getApp()
Page({
  data: {
    carType: '-1', //车型：未选择：'-1'，小车型：0，大车型：1,不限：2
    note: '', //备注
    rentTime: [{
      week: '',
      beginTime: '',
      endTime: ''
    }],
    longRent: true, //
    beginDate: '',
    endDate: '',
    price: 0,
    priceArray: [0, 1, 2, 3, 4, 5,6,7,8,9,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,150,200,250,300,350,400,450,500,600,700,800,900,1000],
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
  weixinInput(e) {
    console.log(e.detail.value);
    this.setData({
      changeWeixin: true,
      weixin: e.detail.value
    })
  },
  compliteClick() {
    if (!this.data.imageUrl){
      wx.showToast({
        title: '请添加电动车图片',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.beginDate || !this.data.endDate) {
      wx.showToast({
        title: '请完善出租时段信息',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.price) {
      wx.showToast({
        title: '请选择租金',
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
      let userInfo = app.getGlobalUserInfo()
      let postDetail = {
        rentId: '',
        openId: userInfo.openId,
        nickName: userInfo.nickName,
        gender: userInfo.gender, //man:0, woman:1
        avatarUrl: userInfo.avatarUrl,
        area: userInfo.area,
        areaNum: userInfo.areaNum,
        weixin: this.data.weixin,
        message: this.data.note,
        money: this.data.price,
        manned: parseInt(this.data.carType), //0:可载人 1：不可 2：不限
        rent: 1,
        carImage: this.data.imageUrl,
        rentTime: this.data.rentTime,
        time: '刚刚'
      };
      console.log("new postdetail", postDetail);
      wx.navigateTo({
        url: '../rentDetail/rentDetail?postDetail=' + JSON.stringify(postDetail) + '&type=1'
      })
    }
    
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
        that.setData({
          imageUrl: tempFilePaths[0]
        })
      }
    })
  },

  carTyepClick(e) {
    console.log(e);
    let carType = e.currentTarget.dataset.type;
    this.setData({
      carType: carType
    });
    console.log("type:", this.data.carType);
  },
  /* 添加出租时段 */
  pickBeginDateChange(e) {
    console.log("起始日期：", e.detail.value)
    let rentTime = this.data.rentTime
    rentTime[0].beginTime = e.detail.value
    this.setData({
      beginDate: e.detail.value,
      rentTime: rentTime
    })
  },
  pickEndDateChange(e) {
    console.log("结束日期：", e.detail.value)
    let rentTime = this.data.rentTime
    rentTime[0].endTime = e.detail.value
    this.setData({
      endDate: e.detail.value,
      rentTime: rentTime
    })
  },

  /* 短期 */
  pickDateChange(e) {
    console.log("取车时间：", e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  pickBeginChange(e) {
    console.log("起始时间：", e.detail.value)
    this.setData({
      begin: e.detail.value
    })
  },
  pickEndChange(e) {
    console.log("结束时间：", e.detail.value)
    this.setData({
      end: e.detail.value
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