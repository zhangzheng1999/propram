const formatTime = (date,option) => {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  var hour = function () {
    return date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  }
 
  var minute = function () {
    return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  }
 
  var second = function () {
    return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  }
 
  //获取 年月日
  if (option == 'YY-MM-DD') return year + "-" + month + "-" + day;
 
  //获取年月
  if (option == 'YY-MM') return " " + year + "-" + month;
 
  //获取年
  if (option == 'YY') return " " + year;
 
  //获取月
  if (option == 'MM') return  " " + month;
 
  //获取日
  if (option == 'DD') return " " +  day;
 
  //获取昨天
  if (option == 'yesterday') return " " + day - 1;
 
  //获取时分秒
  if (option == 'hh-mm-ss') return " " + hour() + ":" + minute() + ":" + second();
 
  //获取时分
  if (option == 'hh-mm') return " " + hour() + ":" + minute();
 
  //获取分秒
  if (option == 'mm-ss') return minute() + ":" + second();
 
  //获取分
  if (option == 'mm')  return minute();
 
  //获取秒
  if (option == 'ss') return second();

  return year+"-"+month+"-"+day+" "+hour()+":"+minute()+":"+second();
}
//获取当前日期，以“/”连接
const formatDate = date => {
  var date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const replace = str=> {
  return str.replace(/-/g, "/")
}
module.exports = {
  formatTime: formatTime,
  formatNumber:formatNumber,
  replace : replace,
  formatDate:formatDate
}
