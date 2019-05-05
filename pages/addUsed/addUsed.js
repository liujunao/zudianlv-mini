Page({
  data: {
    note: '',  //二手车描述
    price: '',
    priceArray: [300, 500, 600, 700, 800, 900, 1000, 1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000],
    imageUrl: ''
  },

  onLoad: function(options) {
   
  },
  compliteClick() {
    let postDetail = {
      usedId: '',
      openId: '',
      nickName: 'Oka',
      avatarUrl: '../../assert/icons/avater.jpg',
      gender: 0, //man:0, woman:1
      area: '韵苑',
      areaNum: 16,
      weixin: '',
      usedImage: '../../assert/icons/mobile.png',
      message: '毕业出车，五成新，用了两年；电瓶还比较好，充一次电可骑7,8个小时',
      money: 1000,
      createTime: '3小时前'
    };
    postDetail.message = this.data.note;
    postDetail.money = this.data.price;
    postDetail.usedImage = this.data.imageUrl;
    postDetail.time = '1分钟前';
    console.log("new postdetail", postDetail);
    wx.navigateTo({
      url: '../usedDetail/usedDetail?postDetail=' + JSON.stringify(postDetail) + '&type=1'
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
        that.setData({ imageUrl: tempFilePaths })
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