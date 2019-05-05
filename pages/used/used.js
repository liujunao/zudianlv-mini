Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    posts: [{
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
    }, {
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
    }, ]
  },
  onLoad: function(options) {


  },
  postClick(e) {
    console.log(e);
    let postDetail = e.currentTarget.dataset.postdetail;
    wx.navigateTo({
      url: '../usedDetail/usedDetail?postDetail=' + JSON.stringify(postDetail)
    })
  },
  addClick() {
    wx.navigateTo({
      url: '../addUsed/addUsed'
    })
  }
})