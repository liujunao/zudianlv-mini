Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    posts:[
      {
        publishId: '',
        openId: '',
        nickName: 'Oka',
        avatarUrl: '../../assert/icons/avater.jpg',
        gender: 0, //man:0, woman:1
        area: '韵苑',
        areaNum: 16,
        weixin: '',
        message: '上午科技楼实验，求租一辆电动车，可载人;有人可载一程也行上午科技楼实验，求租一辆电动车，可载人',
        money: 1,
        yyyy:'2019-05-21', //求租年月日： yyyy-MM-dd
         week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
        beginTime: '8:00', //hh:mm
        endTime: '12:00',
        createTime: '3小时前'
      }, {
        publishId: '',
        openId: '',
        nickName: 'Oka',
        avatarUrl: '../../assert/icons/avater.jpg',
        gender: 0, //man:0, woman:1
        area: '韵苑',
        areaNum: 16,
        weixin: '',
        message: '上午科技楼实验，求租一辆电动车，可载人;有人可载一程也行上午科技楼实验，求租一辆电动车，可载人',
        money: 1,
        yyyy: '2019-05-21', //求租年月日： yyyy-MM-dd
        week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
        beginTime: '8:00', //hh:mm
        endTime: '12:00',
        createTime: '3小时前'
      }, {
        publishId: '',
        openId: '',
        nickName: 'Oka',
        avatarUrl: '../../assert/icons/avater.jpg',
        gender: 0, //man:0, woman:1
        area: '韵苑',
        areaNum: 16,
        weixin: '',
        message: '上午科技楼实验，求租一辆电动车，可载人;有人可载一程也行上午科技楼实验，求租一辆电动车，可载人',
        money: 1,
        yyyy: '2019-05-21', //求租年月日： yyyy-MM-dd
        week: '周一', //求租周几： 1->周一,2-->周二     ！！！需要写处理函数
        beginTime: '8:00', //hh:mm
        endTime: '12:00',
        createTime: '3小时前'
      }, 
    ]
  },

  onLoad: function () {},
  postClick(e) {
    let postDetail = e.currentTarget.dataset.postdetail;
    wx.navigateTo({
      url: '../wantedDetail/wantedDetail?postDetail=' + JSON.stringify(postDetail)
    })
  },
  addClick() {
    wx.showActionSheet({
      itemList: ['空闲贴(我是车主)', '出租帖(我是车主)', '用车贴(我想租车)'],
      itemColor: '#17B978',
      success(res) {
        let index = res.tapIndex + 1;
        wx.navigateTo({
          url: '../add/add?type=' + index,
        })
      },
      fail(res) {
        console.log("fail", res.errMsg)
      }
    })
  }
})