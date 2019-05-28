const app = getApp()
Page({
  data: {
    note: '',  //租车原因
    date: '',  
    week: '',  
    begin: '',
    end: '',
    price: '',
    weixin:'',
    changeWeixin:false,
    priceArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  },
 
  onLoad: function (options) {
    if (app.getGlobalUserInfo().weixin){
      this.setData({
        weixin: app.getGlobalUserInfo().weixin
      })
    }
  },
  compliteClick() {
    if (!this.data.note) {
      wx.showToast({
        title: '请填写租车原因',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.date || !this.data.begin || !this.data.end) {
      wx.showToast({
        title: '请完善租车时段信息',
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
    else {
      let postDetail = {
        openId: app.getGlobalUserInfo().openId,
        nickName: app.getGlobalUserInfo().nickName,
        avatarUrl: app.getGlobalUserInfo().avatarUrl,
        gender: app.getGlobalUserInfo().gender, //man:0, woman:1
        area: app.getGlobalUserInfo().area,
        areaNum: app.getGlobalUserInfo().areaNum,
        weixin: this.data.weixin,
        message: this.data.note,
        money: this.data.price,
        yyyy: this.data.date, //求租年月日： yyyy-MM-dd
        week: '', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
        beginTime: this.data.begin, //hh:mm
        endTime: this.data.end,
        createTime: '刚刚',
        timeString:''
      };
      let time = postDetail.yyyy.split('-')
      let mon = String(parseInt(time[1]));
      let day = String(parseInt(time[2]));
      postDetail.timeString = mon + '月' + day + '日' + ' ' + postDetail.beginTime + '-' + postDetail.endTime;
      console.log("new postdetail", postDetail);
      wx.navigateTo({
        url: '../wantedDetail/wantedDetail?postDetail=' + JSON.stringify(postDetail) + '&type=1'
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
  noteInput(e) {
    console.log(e.detail.value);
    this.setData({
      note: e.detail.value
    })
  },

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
  priceChange(e) {
    let index = e.detail.value;
    let price = this.data.priceArray[index];
    this.setData({
      price: price
    })
    console.log(price);
  },


  
})