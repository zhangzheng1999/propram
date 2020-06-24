// pages/self/self.js
let appDates = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip:true
  },
  //监听用户等级图标点击
  handleMedal(){
    wx.showToast({
      title: '有点Low的铜牌交易人',
      icon:'none',
      duration:2000
    })
  },
  //消息提醒


  /**
   * 跳转到商品管理
   */
  itemManage(){
    wx.navigateTo({
      url:'/pages/itemManage/itemManage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var isTip = wx.getStorageSync('isCollected');
    this.setData({   
        tip:isTip 
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})