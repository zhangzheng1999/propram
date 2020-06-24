var app = getApp();
var Base_RequestItem_Url = app.globalData.Base_RequestItem_Url;
let time = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topNum: 0,
    //搜索框
    inputShowed: false,
    inputVal: "",
    requestDatas:[],//请求的商品数据
  },

  //--------------------------------事件监听函数-----------------------
//搜索框
showInput: function () {
  this.setData({
      inputShowed: true
  });
},
hideInput: function () {
    this.setData({
        inputVal: "",
        inputShowed: false,
        requestDatas:getApp().globalData.queryItems
    });
},
clearInput: function () {
    this.setData({
        inputVal: ""
    });
},
inputTyping: function (e) {
    this.setData({
        inputVal: e.detail.value
    });
},
//监听搜索商品
seachItems:function(even){
  console.log(even)
  wx.request({
    url: 'http://localhost:8080/minipropram/selectItemByName.action',
    method:"GET",
    data:{
      itemName:this.data.inputVal
    },
    header: {
      'content-type': 'application/json;utf-8' 
    },
    fail(res){
      wx.showToast({
        title: '网络出现错误，请稍后重试',
        icon:"none",
        duration:2000
      })
    },
    success:res=>{
      console.log(res)
      if(res.data.length == 0){
        wx.showToast({
          title: '没有找到相关商品，请试试别的内容',
          icon:"none",
          duration:2000
        })
      }else{
        for(let i = 0;i<res.data.length;i++){
          let itemCreateTime = res.data[i].itemCreateTime;   
          res.data[i].itemPic = Base_RequestItem_Url+res.data[i].itemPic
          res.data[i].itemCreateTime = time.formatTime(itemCreateTime);
        }     
        this.setData({
          requestDatas:res.data
        })
      }
    }
  })
},
// 获取滚动条当前位置
scrolltoupper:function(e){
  let t =  e.detail.scrollTop;
  if (t > 100 && !this.data.floorstatus) {
    // 避免重复setData
    this.setData({
       floorstatus: true 
    });
  } 
  
   if(t <= 100 && this.data.floorstatus){
    this.setData({
      floorstatus: false
    });
   }
},

//回到顶部
goTop: function (e) {  // 一键回到顶部
  this.setData({
    topNum: this.data.topNum = 0
  });
},


//------------------------------------加载函数----------------------------

//请求商品列表
  _requestItemList:function(){
    wx.request({
      url: 'http://localhost:8080/minipropram/queryItems.action',
      method:'GET',
      // application/x-www-form-urlencoded
      //application/json;utf-8
      header: {
        'content-type': 'application/json;utf-8' 
      },
      
      fail: (res) => {
        wx.showToast({
          title: '网络超时，请检查您的网络',
          icon:"none"
        })
      },
  
      success: (res) => {
        let that = this;
        for(var i = 0;i<res.data.length;i++){
          let itemCreateTime = res.data[i].itemCreateTime;   
          let itemBuyTime = res.data[i].itemBuyTime;
          res.data[i].itemPic = Base_RequestItem_Url+res.data[i].itemPic
          res.data[i].itemCreateTime = time.formatTime(itemCreateTime);
          res.data[i].itemBuyTime = time.formatTime(itemBuyTime,"YY-MM-DD");         
        } 
        that.setData({
          requestDatas:res.data,
        }),
        //将请求的商品信息放到全局变量app里
        getApp().globalData.queryItems = that.data.requestDatas;
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.请求商品列表
    this._requestItemList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("到底了")
    this._requestItemList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  
})