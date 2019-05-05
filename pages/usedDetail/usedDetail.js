Page({
  data: {
    orientedUrl: '../../assert/icons/oriented.png',
    manUrl: '../../assert/icons/man.png',
    womanUrl: '../../assert/icons/woman.png',
    postDetail: null,
    collectIconSrc: '../../assert/icons/collect.png',
    type: '', //类型 '':联系Ta , 1:确认发布 
  },

  onLoad: function (options) {
    let postDetail = JSON.parse(options.postDetail);
    this.setData({
      postDetail: postDetail
    });
    if (options.type) {
      this.setData({
        type: options.type
      });
    }
    console.log("this postDetail", this.data.postDetail)
    console.log("type", this.data.type)
  },
  rentClick() {  
   
  }
})