// pages/collect/collect.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],//收藏列表
    Base_Request_Url:app.Base_Request_Url
  },

  /**
   * 获取商品信息
   */
  getItems(){
    var collectList = wx.getStorageSync('collectList');
  //  for(let i=0;i<collectList.length;i++){

  //  }
    this.setData({
      items:collectList
    })
    // for(var i=0;i<item.length;i++){
    //   if(item[i].itemId==collectList.item_id){
    //     this.setData({
    //       items:item[i]
    //     })
    //   }
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   
    // wx:wx.request({
    //   url: 'url',
    //   complete: (res) => {},
    //   data: data,
    //   dataType: dataType,
    //   fail: (res) => {},
    //   header: header,
    //   method: method,
    //   responseType: responseType,
    //   success: (result) => {},
    // })
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
    this.getItems();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})