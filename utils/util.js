const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// const formatRentInfo = postDetail => {
//   let postDetail = {
//     rentId: '',
//     openId: userInfo.openId,
//     nickName: userInfo.nickName,
//     gender: userInfo.gender, //man:0, woman:1
//     avatarUrl: userInfo.avatarUrl,
//     area: userInfo.area,
//     areaNum: userInfo.areaNum,
//     weixin: '', //填写
//     message: this.data.note,
//     money: this.data.price,
//     manned: parseInt(this.data.carType), //0:可载人 1：不可 2：不限
//     rent: 1,
//     carImage: this.data.imageUrl,
//     rentTime: this.data.rentTime,
//     rent: 1, //1：发布展示 2：发布未展示
//   };
//   let weekdayArray = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
//   let rent = {
//     openId: postDetail.openId,
//     nickName: postDetail.nickName,
//     gender: postDetail.gender,
//     avatarUrl: postDetail.avatarUrl,
//     area: postDetail.area,
//     areaNum: postDetail.areaNum,
//     weixin: postDetail.weixin,
//     message: postDetail.message,
//     money: postDetail.money,
//     manned: postDetail.manned,
//     rent: postDetail.rent,
//     carImage: postDetail.carImage,
//     time: postDetail.time
//   }
//   let rentTime = postDetail.rentTime;
  
// }

module.exports = {
  formatTime: formatTime
}