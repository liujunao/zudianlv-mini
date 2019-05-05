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
    let postDetail = {
      rentId: '',
      openId: '',
      nickName: 'Oka',
      avatarUrl: '../../assert/icons/avater.jpg',
      gender: 0, //man:0, woman:1
      area: '韵苑',
      areaNum: 16,
      weixin: '',
      message: '',
      money: 1,
      carImage: '../../assert/icons/mobile.jpg',
      manned: 0, //0:可载人 1：不可 2：不限
      rentTime: [{
        week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
        beginTime: '12:00', //hh:mm
        endTime: '18:00'
      }, {
        week: '周二', //求租周几： 1->周一,2-->周二
        beginTime: '12:00', //hh:mm
        endTime: '18:00'
      }
      ],
      time: '3小时前',
      rent: 1, //1：发布展示 2：发布未展示
    };
    postDetail.manned = this.data.carType;
    postDetail.message = this.data.note;
    postDetail.rentTime = this.data.rentTime;
    postDetail.money = this.data.price;
    postDetail.carImage = this.data.imageUrl;
    postDetail.time = '1分钟前';
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
        that.setData({imageUrl:tempFilePaths})
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