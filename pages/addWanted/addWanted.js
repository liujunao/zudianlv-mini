const app = getApp()
Page({
  data: {
    note: '',  //租车原因
    date: '',  
    week: '',  
    begin: '',
    end: '',
    price: '',
    priceArray: [0, 0.1, 0.5, 1, 2, 3, 4, 5],
  },
 
  onLoad: function (options) {

  },
  compliteClick() {
    //!完善帖子信息，准备发布  基本全局信息还未填写
    let postDetail = {
      openId: app.getGlobalUserInfo().openId,
      nickName: app.getGlobalUserInfo().nickName,
      avatarUrl: app.getGlobalUserInfo().avatarUrl,
      gender: app.getGlobalUserInfo().gender, //man:0, woman:1
      area: app.getGlobalUserInfo().area,
      areaNum: app.getGlobalUserInfo().areaNum,
      weixin: app.getGlobalUserInfo().weixin,
      message: this.data.note,
      money: this.data.price,
      yyyy: this.data.date, //求租年月日： yyyy-MM-dd
      week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
      beginTime: this.data.begin, //hh:mm
      endTime: this.data.end,
      createTime: '1分钟前'
    };
    console.log("new postdetail", postDetail);
    wx.navigateTo({
      url: '../wantedDetail/wantedDetail?postDetail=' + JSON.stringify(postDetail) + '&type=1'
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