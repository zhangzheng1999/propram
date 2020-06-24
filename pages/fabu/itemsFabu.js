// pages/fabu/itemsFabu.js
var app  = getApp();
var time = require("../../utils/util.js");
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    files: [] ,//存放图片的数组
    showUpload:true,//显隐选择图片框
    date:"2000-01-01",//购买时间
    itemCreateTime:"",//创建时间
    array1: ['北校区', '南校区', '西校区'],//选择校区
    value1:"",//学校索引
    itemSchool:"",//展示校区
    priceInput:0,//价格
    titleInput:"",//商品标题
    detailInput:"",//商品详情
    datailNum:0,//详情字数
    ItemsList:{},//所有信息
    myItemList: app.globalData.myItem,//全局变量（发布的商品）
    isAgree:false,//是否同意条款
    payImg:"http://localhost:8080/userAvatar/pay.jpg"//支付图片
  },
  //----------------------------事件监听函数------------------------------
  //监听是否同意条款
  agree(even){
    if(!this.data.isAgree){
      this.setData({
        isAgree:true
      })
    }else{
      this.setData({
        isAgree:false
      })
    }
    
  },
  //监听条款
  toProvision(even){
    console.log(even);
    wx.navigateTo({
      url: '/pages/provision/provision',
    })
  },
  //监听商品标题输入内容
  titleInput:function(even){
    this.setData({
      titleInput:even.detail.value
    })
  },
  //监听商品详情输入内容
  detailInput(event){
    this.setData({
      datailNum: event.detail.cursor,
      detailInput:event.detail.value
    })
  },
  //选择图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
        count:1,//最多6张
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
          if(tempFilesSize <= 2000000){   //图片小于或者等于2M时 可以执行获取图片

            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
              files: that.data.files.concat(res.tempFilePaths),
              showUpload:false
              //["data.ItemsList.itemPic"]:that.data.files.concat(res.tempFilePaths)
            });  
          }else{    //图片大于2M，弹出一个提示框
              wx.showToast({
                  title:'上传图片不能大于2M!',  //标题
                  icon:'none'
              })
          }               
                 
        }
    })
},
// 删除图片
deleteImage(event) {
  //获取数据绑定的data-index的数据
  const nowIndex = event.currentTarget.dataset.index;
  if(nowIndex==0){
    this.setData({
      showUpload:true
    })
  }
  const images = this.data.files;
  images.splice(nowIndex, 1);
  this.setData({
    files:images
  })
},
//预览图片
previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
},
//监听选择日期
bindDateChange: function (e) {
  console.log(e)
  this.setData({
      date: time.formatTime(e.detail.value,"YY-MM-DD")
  })
},
//选择校区
bindPicker3Change: function(e) {
  let index = e.detail.value
  this.setData({
      value1: e.detail.value,
      itemSchool:this.data.array1[index]  
  })
},
//商品价格
priceInput:function(even){
  this.setData({
    priceInput:even.detail.value
  })
},

//表单提交
formSubmit:function(res){
  console.log(res)
  this.setData({
    ItemsList:res.detail.value
  })
   //上传图片
   var that = this;
   wx.uploadFile({
     url: 'http://localhost:8080/minipropram/insertItem.action',
     filePath: that.data.files[0],
     name: 'pic',
     fail: (res) => {
       console.log("失败",res)
     },
     formData:{
      itemName:this.data.titleInput,
      itemPrice:this.data.priceInput,
      itemDetail:this.data.detailInput,
      itemSchool:this.data.itemSchool,
      itemBuyTime:this.data.date,
      itemCreateTime:time.formatTime(new Date()),
      userName:app.globalData.userInfo.nickName,
      itemState:0
     },
     success: (result) => {
      let myItemList = this.data.myItemList
      let item = JSON.parse(result.data) 
      myItemList.push(item);
      this.setData({
        myItemList:myItemList
      }) 
      wx.setStorageSync('myItem',myItemList)
      this.returnSuccess();
    },
  })      
},
  //跳转到成功页面
  returnSuccess(){
    wx.reLaunch({
      url: '/pages/success/success',
    })
  },
  //长按支付
  pay(){
    wx.previewImage({
      urls: [this.data.payImg],
      success(res){
        console.log(res)
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("openid:",app.globalData.openid)
    let getList = wx.getStorageSync('myItem');
    if(getList == null || getList==""){
      console.log("getList空")
      getList=[];
    }
    this.setData({
      myItemList:getList
    })
  },


})