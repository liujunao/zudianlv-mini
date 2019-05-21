const app = getApp()
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    collectIconSrc: '../../assert/icons/collect.png',
    postDetail: null,
    type: '', //类型 '':联系Ta , 1:确认发布 
  },

  onLoad: function(options) {
    let userInfo = app.getGlobalUserInfo()
    let postDetail = {
      rent:{
        openId: userInfo.openId,
        nickName: userInfo.nickName,
        gender: userInfo.gender, //man:0, woman:1
        avatarUrl: userInfo.avatarUrl,
        college:userInfo.college,
        grade:userInfo.grade,
        area: userInfo.area,
        areaNum: userInfo.areaNum,
        weixin: '12', //填写
        message: 'asdas',
        money: 1,
        manned: 1, //0:可载人 1：不可 2：不限
        rent: 1,
        carImage: 'asda',
      },
      rentTime: [{
        week: 1,
        beginTime: 'a',
        endTime: 'b'
      }]
    };
    this.setData({
      postDetail: postDetail
    });

    // let postDetail = JSON.parse(options.postDetail);
    // this.setData({
    //   postDetail: postDetail
    // });
    // if(options.type){
    //   this.setData({
    //     type: options.type
    //   });
    // }
    // console.log("this postDetail", this.data.postDetail)
    // console.log("type",this.data.type)
  },
  /* 添加接口！--------------------------- */
  /* 发布成功后跳转出租首页 */
  publishClick() {
    var that = this
    console.log("postDetal info",that.data.postDetail)
    wx.request({
      url: app.serverUrl + '/user/rent/add',
      method: "POST",
      data: that.data.postDetail,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log("发布成功：", res.data)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000
        })
      },
      complete: () => {

      }
    })
    wx.switchTab({
      url: '../rent/rent'
    })
  },

  contactClick() {
    wx.showModal({
      title: '提示',
      content: '联系方式（微信ID）已复制到剪贴板',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})