Page({

  data: {
    week:'',
    weekdayArray: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    apartment: '',
    building: '',
    multiArray: [["韵苑公寓", "紫菘公寓", "沁园公寓"], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
    multiIndex: [0, 0, 0],
    carType:0, //0:可载人，1:不可载人（小，大车型）2：不限
    gender:1,  //0：女， 1：男 2:不限
  },
  onLoad: function (options) {
  },
   /* 添加接口！--------------------------- */
   /* 先根据筛选请求对应帖子，然后跳转*/
  confirmClick() {
    wx.switchTab({
      url: '../rent/rent'
    })
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var multiIndex = e.detail.value;
    this.setData({
      multiIndex: e.detail.value,
      apartment: this.data.multiArray[0][multiIndex[0]],
      building: this.data.multiArray[1][multiIndex[1]]
    })
  },
  genderClick(e) {
    console.log(e);
    let gender = e.currentTarget.dataset.type;
    this.setData({ gender: gender });
    console.log("gender:", this.data.gender);
  },
  carTypeClick(e) {
    console.log(e);
    let carType = e.currentTarget.dataset.type;
    this.setData({ carType: carType });
    console.log("carType:", this.data.carType);
  },
  apartmentChange(e) {
    let index = e.detail.value;
    let apartment = this.data.apartmentArray[index];
    this.setData({
      apartment: apartment
    })
    console.log("公寓", apartment);
  },
  buildingChange(e) {
    let index = e.detail.value;
    let building = this.data.buildingArray[index];
    this.setData({
      building: building
    })
    console.log("楼栋", building);
  },
  weekChange(e){
    let index = e.detail.value;
    let week = this.data.weekdayArray[index];
    this.setData({
      week:week
    })
    console.log(week);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})