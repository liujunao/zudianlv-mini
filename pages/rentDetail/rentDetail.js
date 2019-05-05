Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    collectIconSrc: '../../assert/icons/collect.png',
    postDetail: null,
    type:'', //类型 '':联系Ta , 1:确认发布 
  },

  onLoad: function(options) {
    let postDetail = JSON.parse(options.postDetail);
    this.setData({
      postDetail: postDetail
    });
    if(options.type){
      this.setData({
        type: options.type
      });
    }
    console.log("this postDetail", this.data.postDetail)
    console.log("type",this.data.type)
  },
  /* 添加接口！--------------------------- */
  /* 发布成功后跳转出租首页 */
  publishClick(){
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })
    wx.switchTab({
      url: '../rent/rent'
    })
  },

  contactClick(){
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