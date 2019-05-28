const app = getApp()

const getCurrTime = () => {
  return new Date().getTime();
}

/* 收藏贴 */
const transformCollect = collect => {
  let rentList = collect.rent;
  let publishList = publishList;
  let usedList = usedList;
}


/* rent出租贴 */
const restoreRentInfo = list => {
  let postList = [];
  for (let i = 0; i < list.length; i++) {
    postList.push(restoreRentItem(list[i]))
  }
  return postList
}
const restoreRentItem = data => {
  let postDetail = {
    openId:data.rent.openId,
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
    rentId: data.rent.rentId,
    carImage: app.serverUrl + data.rent.carImage,
    time: getStringTime(data.rent.time),
    rentTime: transfromRentTime(data.rentTime[0]),
    count:data.rent.count
  }

  return postDetail
}
const formatRentInfo = postDetail => {
  let weekdayArray = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  let rent = {
    // rentId: postDetail.rentId,
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
    carImage: postDetail.carImage,
    time: getCurrTime(),
    count:1
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
/* rentTime: {
      week: '',
      beginTime: '',
      endTime: ''
    } ->2019年 5月1日-6月1日 */
const transfromRentTime = rentTime => {
  if (rentTime) {
    let begin = rentTime.beginTime;
    let end = rentTime.endTime;
    begin = begin.split('-');
    end = end.split('-');
    let beginMon = String(parseInt(begin[1]));
    let beginDay = String(parseInt(begin[2]));
    let endMon = String(parseInt(end[1]));
    let endDay = String(parseInt(end[2]));
    if (begin[0] === end[0]) {
      let year = begin[0];
      return beginMon + "月" + beginDay + "日-" + endMon + "月" + endDay + "日";
    } else {
      let beginYear = begin[0];
      let endYear = end[0];
      return beginYear + "年" + beginMon + "月" + beginDay + "日-" + endYear + "年" + endMon + "月" + endDay + "日";
    }
  }
}
/* wanted求租贴 */
const formatWantedPostList = list => {
  let newList = []
  for (let i = 0; i < list.length; i++) {
    newList.push(formatWantedPost(list[i]))
  }
  return newList
}
const formatWantedPost = data => {
  let postDetail = {
    publishId:data.publish.publishId,
    openId: data.publish.openId,
    nickName: data.publish.nickName,
    gender: data.publish.gender, //man:0, woman:1
    avatarUrl: data.publish.avatarUrl,
    area: data.publish.area,
    areaNum: data.publish.areaNum,
    weixin: data.publish.weixin, //填写
    message: data.publish.message,
    money: data.publish.money,
    count: data.publish.count,
    createTime: getStringTime(data.publish.createTime),
    timeString: '',
    status: data.publish.status,
    favorate: data.favorate,
  }
  let time = data.publish.yyyy.split('-')
  let mon = String(parseInt(time[1]));
  let day = String(parseInt(time[2]));
  postDetail.timeString = mon + '月' + day + '日' + ' ' + data.publish.beginTime + '-' + data.publish.endTime;
  return postDetail
}

/* 格式化多久前发布 */
const getStringTime = (dateTimeStamp) => {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var result;
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}


/* 二手车数据处理 */
const formatUsedItem = data => {
  let postDetail = {
    usedId:data.used.usedId,
    openId:data.used.openId,
    nickName: data.used.nickName,
    gender: data.used.gender, //man:0, woman:1
    avatarUrl: data.used.avatarUrl,
    area: data.used.area,
    areaNum: data.used.areaNum,
    weixin: data.used.weixin, //填写
    message: data.used.message,
    money: data.used.money,
    usedImage: app.serverUrl + data.used.usedImage,
    count: data.used.count,
    createTime: getStringTime(data.used.createTime)
  }
  return postDetail
}

const formatUsedpostList = list => {
  let postList = []
  for (let i = 0; i < list.length; i++) {
    postList.push(formatUsedItem(list[i]))
  }
  return postList
}

module.exports = {
  getCurrTime: getCurrTime,
  formatRentInfo: formatRentInfo,
  restoreRentInfo: restoreRentInfo,
  transfromRentTime: transfromRentTime,
  restoreRentItem: restoreRentItem,
  formatWantedPostList: formatWantedPostList,
  formatWantedPost: formatWantedPost,
  formatUsedpostList: formatUsedpostList,
  formatUsedItem: formatUsedItem,
  getStringTime: getStringTime
}