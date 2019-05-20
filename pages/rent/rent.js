const app = getApp()
Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    posts: [ //帖子数组
      {
        rentId: '',
        openId: '',
        nickName: 'Oka',
        avatarUrl: '../../assert/icons/avater.jpg',
        gender: 0, //man:0, woman:1
        area: '韵苑',
        areaNum: 16,
        weixin: '',
        message: '车比较旧，但可以正常使用，充一次电可以连续骑5,6个小时',
        money: 1,
        carImage: '../../assert/icons/mobile.png',
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
      },
      {
        rentId: '',
        openId: '',
        nickName: 'Oka',
        avatarUrl: '../../assert/icons/avater.jpg',
        gender: 0, //man:0, woman:1
        area: '韵苑',
        areaNum: 16,
        weixin: '',
        message: '车比较旧，但可以正常使用，充一次电可以连续骑5,6个小时',
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
      },
    ]
  },
  onLoad: function() {},
  filterClick(){
    wx.navigateTo({
      url: '../filter/filter'
    })
  },
  postClick(e) {
    console.log(e);
    let postDetail = e.currentTarget.dataset.postdetail;
    wx.navigateTo({
      url: '../rentDetail/rentDetail?postDetail=' + JSON.stringify(postDetail)
    })
  },
  filterClick() {
    wx.navigateTo({
      url: '../filter/filter',
    })
  },
  addClick() {
    wx.showActionSheet({
      itemList: ['我想出租', '我想租车'],
      itemColor: app.globalData.mainColor,
      success(res) {
        let index = res.tapIndex;
        if(index==0){
          wx.navigateTo({
            url: '../addRent/addRent?'
          })
        }
        if(index==1){
          wx.navigateTo({
            url: '../addWanted/addWanted?'
          })
        }
      },
      fail(res) {
        console.log("fail", res.errMsg)
      }
    })
  }
})