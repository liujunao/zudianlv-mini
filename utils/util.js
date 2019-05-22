const app = getApp()

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

const formatRentInfo = postDetail => {
  // let postDetail = {
  //   rentId: '',
  //   openId: userInfo.openId,
  //   nickName: userInfo.nickName,
  //   gender: userInfo.gender, //man:0, woman:1
  //   avatarUrl: userInfo.avatarUrl,
  //   area: userInfo.area,
  //   areaNum: userInfo.areaNum,
  //   weixin: '', //填写
  //   message: this.data.note,
  //   money: this.data.price,
  //   manned: parseInt(this.data.carType), //0:可载人 1：不可 2：不限
  //   rent: 1,
  //   carImage: this.data.imageUrl,
  //   rentTime: this.data.rentTime,
  //   rent: 1, //1：发布展示 2：发布未展示
  // };
  let weekdayArray = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  let rent = {
    openId: postDetail.openId,
    nickName: postDetail.nickName,
    gender: postDetail.gender,
    avatarUrl: postDetail.avatarUrl,
    area: postDetail.area,
    areaNum: postDetail.areaNum,
    weixin: postDetail.weixin,
    message: postDetail.message,
    money: postDetail.money,
    manned: postDetail.manned,
    rent: postDetail.rent,
    carImage: postDetail.carImage
  }
  let rentTime = postDetail.rentTime;
  for (let i = 0; i < rentTime.length; i++) {
    rentTime[i].week = weekdayArray.indexOf(rentTime[i].week) + 1;
  }
  return {
    rent: rent,
    rentTime: rentTime
  }
}

//data为list
const restoreRentInfo = dataList => {
  let postList = [];
  let weekdayArray = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  for(let i=0; i<dataList.length; i++){
    let data = dataList[i]
    let rentTime = data.rentTime
    for (let i = 0; i < rentTime.length; i++) {
      rentTime[i].week = weekdayArray[parseInt(rentTime[i].week) - 1];
    }
    let postDetail = {
      nickName: data.rent.nickName,
      gender: data.rent.gender, //man:0, woman:1
      avatarUrl: data.rent.avatarUrl,
      area: data.rent.area,
      areaNum: data.rent.areaNum,
      weixin: data.rent.weixin, //填写
      message: data.rent.message,
      money: data.rent.money,
      manned: data.rent.manned, //0:可载人 1：不可 2：不限
      rent: data.rent.rent,
      carImage: app.serverUrl + data.rent.carImage,
      time: data.rent.time,
      rentTime: rentTime,
    }
    postList.push(postDetail)
  }
  return postList
}

module.exports = {
  formatTime: formatTime,
  formatRentInfo: formatRentInfo,
  restoreRentInfo: restoreRentInfo
}