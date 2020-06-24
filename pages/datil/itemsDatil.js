// pages/datil/itemsDatil.js
// let datas = require('../../datas/item-datil.js');
var datas = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemsId:"",//商品id
    isCollected:false,//收藏图状态
    collectItem:  {
                    itemsId:"",
                    isCollected:null,
                    itemName:"",
                    itemPrice:null,
                    itemPic:""
                  },//收藏的商品对象
    
    detail:{},//商品详情
    collect:[],//收藏夹 
    DetailImg:datas.globalData.Base_Request_Url, //详情图片基础地址
    
  },
  //----------------------------------监听函数------------------------------------
  //监听放大商品图片
  openImg(){
    wx.previewImage({
      urls:[this.data.detail.itemPic]
    })
  },
  //收藏图更换
  handleChange(){   
    //获取收藏状态
    let isCollected=!this.data.isCollected;
    //获取收藏夹信息
    let collectAll = this.data.collect; 
    let collectItem = this.data.collectItem;
    //从本地缓存获取收藏夹信息
    let collectList = wx.getStorageSync('collectList');
    collectAll = collectList?collectList:[];
    collectItem.itemsId = this.data.itemsId; 
    collectItem.itemName = this.data.detail.itemName;
    collectItem.itemPrice = this.data.detail.itemPrice;
    collectItem.itemPic = this.data.detail.itemPic;
  
    //对当前商品的收藏状态进行判断
    if(!isCollected){
      wx.showToast({
        title:'取消收藏',
        icon:'success'
      });
     collectAll = collectList.filter(item => item.itemsId!==this.data.itemsId)
      //更新收藏夹(删除当前商品)
      wx.setStorageSync('collectList', collectAll);
    }else{     
      collectItem.isCollected = isCollected;
      this.setData({
        collectItem:collectItem
      })
      collectAll.unshift(collectItem); 
      console.log(collectAll);
      //更新收藏夹(添加当前商品)
      wx.setStorageSync('collectList', collectAll);
      wx.showToast({
        title:'收藏成功',
        icon:'success'
      });
    }
    //更新状态
    this.setData({
      isCollected
    });    
  },
    
    
    //分享
    handleShare(){
      wx.showActionSheet({
        itemList: ["分享到朋友圈","分享到微信好友","分享到QQ空间"],
      })
    },

  //-----------------------------加载函数----------------------------------
  //获取数据
  getItems(options){
    var itemsAll=datas.globalData.queryItems;
      for(var i=0;i<itemsAll.length;i++){
        if(itemsAll[i].itemId==options.item_id){
          this.setData({
            itemsId:options.item_id,
            detail:itemsAll[i]
          })          
        }
      }   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){   
    //调用  获取商品数据函数
    this.getItems(options);  
    //从本地缓存中获取收藏夹信息
    let getCollectItem = wx.getStorageSync('collectList')
    //遍历收藏夹并记录当前商品的isCollected
    if(getCollectItem.length>0){
      for(let i = 0;i<getCollectItem.length;i++){
        if(getCollectItem[i].itemsId==options.item_id){
          console.log("当前商品是：",getCollectItem[i]);
          this.setData({
            isCollected:getCollectItem[i].isCollected
          })
        }
      }
    }
  },

  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(){

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