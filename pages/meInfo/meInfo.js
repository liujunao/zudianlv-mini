const app = getApp()
Page({
  data: {
    openIdentify:false,
    college: null,
    collegeArray: ["软件学院", "新闻学院", "法学院"],
    grade: null,
    gradeArray:['大一','大二','大三','大四','研一','研二','研三'],
    apartment:null,
    building: null,
    multiArray: [["韵苑公寓", "紫菘公寓", "沁苑公寓"], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]],
    multiIndex: [0, 0, 0],
    imageUrl: ''
  },
  onLoad: function (options) {

  },
 submitClick(){ 
    if(!college){
      console.log("请选择学院信息")
    }
    else if(!grade){
      console.log("请选择年级信息")
    }
    else if (!building) {
      console.log("请选择楼栋信息")
    }
    else if (!imageUrl) {
      console.log("请上传学生证照片")
    }
    else{  
      //验证通过，请求后台
      wx.request({
        url: app.serverUrl + '/user/append',
        method: "POST",
        data: {
          openId: app.getGlobalUserInfo().openId,
          college: this.data.college,
          grade: this.data.grade,
          area: this.data.apartment,
          areaNum: formObject.building,
          /* weixin可以直接接口请求到？ */
          weixin: formObject.weixin
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.openId) {
            app.setGlobalUserInfo(res.data)
          }
          console.log("append success")
        }
      })

      //上传学生证图片
      wx.uploadFile({
        url: app.serverUrl + '/user/upload?openId=' + app.getGlobalUserInfo().openId,
        filePath: this.data.imageUrl,
        name: 'hust',
        success: function (res) {
          var data = JSON.parse(res.data)
          that.setData({
            imageUrl: app.serverUrl + data.hustImage
          })
        }
      })
    }
    
  },



  openIdentifyClick(){
    let openIdentify = this.data.openIdentify;
    this.setData({openIdentify: !openIdentify})
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
  gradeChange(e){
    let index = e.detail.value;
    let grade = this.data.gradeArray[index];
    this.setData({
      grade: grade
    })
    console.log("年级", grade);
  },
  collegeChange(e) {
    let index = e.detail.value;
    let college = this.data.collegeArray[index];
    this.setData({
      college: college
    })
    console.log("学院", college);
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