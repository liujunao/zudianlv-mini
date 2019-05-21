const app = getApp()
Page({
  data: {
    passUrl: '../../assert/icons/pass.png',
    ischanging:false,
    identified:false, //是否认证
    openIdentify:false, //打开校园卡图片选择
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
  onLoad(options) {
    if(app.getGlobalUserInfo().hustImage){
      console.log("已认证")
      this.setData({
        identified:true,
        college:app.getGlobalUserInfo().college,
        grade: app.getGlobalUserInfo().grade,
        apartment:app.getGlobalUserInfo().area,
        building:app.getGlobalUserInfo().areaNum
      })
    }
  },
 submitClick(){ 
    if(!this.data.college){
      console.log("请选择学院信息")
      wx.showToast({
        title: '请选择学院信息',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.grade){
      console.log("请选择年级信息")
      wx.showToast({
        title: '请选择年级信息',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.building) {
      console.log("请选择楼栋信息")
      wx.showToast({
        title: '请选择楼栋信息',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!this.data.imageUrl && !this.data.identified) {
      console.log("请上传学生证照片")
      wx.showToast({
        title: '请上传学生证照片',
        icon: 'none',
        duration: 1000
      })
    }
    else{  
      //验证通过，请求后台
      var that = this
      if(this.data.identified){  //已经验证
        wx.request({
          url: app.serverUrl + '/user/append',
          method: "POST",
          data: {
            openId: app.getGlobalUserInfo().openId,
            college: that.data.college,
            grade: that.data.grade,
            area: that.data.apartment,
            areaNum: that.data.building,
            weixin: '' //不应强行填写发布时进行提醒填写
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.openId) {
              app.setGlobalUserInfo(res.data)
            }
            that.setData({
              ischanging: false,
            })
            console.log("update success")
            wx.showToast({
              title: '更新成功',
              duration: 1000,
            })
          }
        })
      }
      else{
        wx.showLoading({
          title: '正在上传信息',
        })
        wx.request({
          url: app.serverUrl + '/user/append',
          method: "POST",
          data: {
            openId: app.getGlobalUserInfo().openId,
            college: that.data.college,
            grade: that.data.grade,
            area: that.data.apartment,
            areaNum: that.data.building,
            weixin: '' //不应强行填写,发布时进行提醒填写
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
          filePath: that.data.imageUrl,
          name: 'hust',
          success: function (res) {
            console.log(res.data)
            var data = JSON.parse(res.data)
            console.log("上传学生证照片成功！")
            app.setGlobalUserInfo(data)
            that.setData({
              identified: true,
              openIdentify: false,
              ischanging: false
            })
            wx.hideLoading()
            
          },
          complete: () => {
            
          }
        })
      }
    }
    
  },
  openIdentifyClick() {
    this.setData({
      openIdentify: !this.data.openIdentify
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
  gradeChange(e){
    let index = e.detail.value;
    let grade = this.data.gradeArray[index];
    this.setData({
      grade: grade,
      ischanging: true
    })
    console.log("年级", grade);
  },
  collegeChange(e) {
    let index = e.detail.value;
    let college = this.data.collegeArray[index];
    this.setData({
      college: college,
      ischanging: true
    })
    console.log("学院", college);
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var multiIndex = e.detail.value;
    this.setData({
      multiIndex: e.detail.value,
      apartment: this.data.multiArray[0][multiIndex[0]],
      building: this.data.multiArray[1][multiIndex[1]],
      ischanging: true
    })
  }
})