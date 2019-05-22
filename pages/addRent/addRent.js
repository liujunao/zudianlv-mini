const app = getApp()
Page({
  data: {   
    carType:'-1',  //车型：未选择：'-1'，小车型：0，大车型：1,不限：2
    note: '',  //备注
    rentTime:[],
    weekdayArray:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    price: '',
    priceArray: [0, 0.1, 0.5, 1, 2, 3, 4, 5],
    imageUrl:''
  },

  onLoad: function(options) {
    
  },
  compliteClick() { 
    //!完善帖子信息，准备发布  基本全局信息还未填写
    let userInfo = app.getGlobalUserInfo()
    console.log(userInfo)
    let postDetail = {
      rentId: '',
      openId: userInfo.openId,
      nickName: userInfo.nickName,
      gender: userInfo.gender, //man:0, woman:1
      avatarUrl: userInfo.avatarUrl,
      area: userInfo.area,
      areaNum: userInfo.areaNum,
      weixin: '',  //填写
      message: this.data.note,
      money: this.data.price,
      manned: parseInt(this.data.carType), //0:可载人 1：不可 2：不限
      rent: 1,
      carImage: this.data.imageUrl,
      rentTime:this.data.rentTime,
      rent: 1, //1：发布展示 2：发布未展示
    };
    console.log("new postdetail",postDetail);
    wx.navigateTo({
      url: '../rentDetail/rentDetail?postDetail=' + JSON.stringify(postDetail) +'&type=1'
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
        that.setData({imageUrl:tempFilePaths[0]})
      }
    })
  },

  carTyepClick(e) {
    console.log(e);
    let carType = e.currentTarget.dataset.type;
    this.setData({carType:carType});
    console.log("type:",this.data.carType);
  },

  freeTimeChange(e) {
    let index = e.detail.value;
    let week = this.data.weekdayArray[index];
    let rentTime = this.data.rentTime;
    let item = {
      week: week,
      beginTime: '', //hh:mm
      endTime: ''
    };
    rentTime.push(item);
    this.setData({
      rentTime:rentTime
    })
    console.log("rentTime ", this.data.rentTime);
  },
  noteInput(e) {
    console.log(e.detail.value);
    this.setData({
      note: e.detail.value
    })
  },
  pickBeginChange(e) {
    let beginTime = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let rentTime = this.data.rentTime;
    rentTime[index].beginTime = beginTime;
    this.setData({
      rentTime: rentTime
    })
  },
  pickEndChange(e) {
    let endTime = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let rentTime = this.data.rentTime;
    rentTime[index].endTime = endTime;
    this.setData({
        rentTime: rentTime
    })
  },

  deleteTime(e) {
    let index = e.currentTarget.dataset.index;
    let rentTime = this.data.rentTime;
    rentTime.splice(index, 1);
    this.setData({
      rentTime: rentTime
    })
    console.log(this.data.rentTime)
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