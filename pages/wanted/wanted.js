const app = getApp()
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    posts:[],
    // posts:[
    //   {
    //     publishId: '',
    //     openId: '',
    //     nickName: 'Oka',
    //     avatarUrl: '../../assert/icons/avater.jpg',
    //     gender: 0, //man:0, woman:1
    //     area: '韵苑',
    //     areaNum: 16,
    //     weixin: '',
    //     message: '上午科技楼实验，求租一辆电动车，可载人;有人可载一程也行上午科技楼实验，求租一辆电动车，可载人',
    //     money: 1,
    //     yyyy:'2019-05-21', //求租年月日： yyyy-MM-dd
    //      week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
    //     beginTime: '8:00', //hh:mm
    //     endTime: '12:00',
    //     createTime: '3小时前'
    //   }, {
    //     publishId: '',
    //     openId: '',
    //     nickName: 'Oka',
    //     avatarUrl: '../../assert/icons/avater.jpg',
    //     gender: 0, //man:0, woman:1
    //     area: '韵苑',
    //     areaNum: 16,
    //     weixin: '',
    //     message: '上午科技楼实验，求租一辆电动车，可载人;有人可载一程也行上午科技楼实验，求租一辆电动车，可载人',
    //     money: 1,
    //     yyyy: '2019-05-21', //求租年月日： yyyy-MM-dd
    //     week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
    //     beginTime: '8:00', //hh:mm
    //     endTime: '12:00',
    //     createTime: '3小时前'
    //   }, {
    //     publishId: '',
    //     openId: '',
    //     nickName: 'Oka',
    //     avatarUrl: '../../assert/icons/avater.jpg',
    //     gender: 0, //man:0, woman:1
    //     area: '韵苑',
    //     areaNum: 16,
    //     weixin: '',
    //     message: '上午科技楼实验，求租一辆电动车，可载人;有人可载一程也行上午科技楼实验，求租一辆电动车，可载人',
    //     money: 1,
    //     yyyy: '2019-05-21', //求租年月日： yyyy-MM-dd
    //     week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
    //     beginTime: '8:00', //hh:mm
    //     endTime: '12:00',
    //     createTime: '3小时前'
    //   }, 
    // ]
  },

  onLoad: function () {
    var that = this
    wx.request({
      url: app.serverUrl + '/publish/list',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("租车列表：", res.data)
        that.setData({
          posts: res.data
        })
      }
    })

  },
  getPublishListClick() {
    wx.request({
      url: app.serverUrl + '/publish/list',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("租车列表：", res.data)
        that.setData({
          posts:res.data
        })
      }
    })
  },
  postClick(e) {
    let postDetail = e.currentTarget.dataset.postdetail;
    wx.navigateTo({
      url: '../wantedDetail/wantedDetail?postDetail=' + JSON.stringify(postDetail)
    })
  },
  addClick() {
    wx.showActionSheet({
      itemList: ['我想租车', '我想出租'],
      itemColor: app.globalData.mainColor,
      success(res) {
        let index = res.tapIndex;
        if (index == 0) {
          wx.navigateTo({
            url: '../addWanted/addWanted?'
          })
        }
        if (index == 1) {
          wx.navigateTo({ 
             url: '../addRent/addRent?'
          })
        }
      },
      fail(res) {
        console.log("fail", res.errMsg)
      }
    })
  }
})
