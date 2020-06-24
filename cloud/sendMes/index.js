// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const result = await cloud.openapi.subscribeMessage.send({
      touser:event.openid,//要推送给那个用户
      page:'pages/index/index',//要跳转到那个小程序页面
      data:{//要推送的内容
        date1:{
          value:"2020-5-28 12:00:00"
        },
        thing3:{
          value:"发布成功"
        },
        thing4:{
          value:"商品发布"
        }
      },
      template_id:"biBvx9O7wbH5bl91dopTIAtrbFC7KpZrOFp5ItDhfSU"//模板id
    })
    console.clear(result)
    return result;
  }catch(err){
    console.log(err)
    return err;
  }
}