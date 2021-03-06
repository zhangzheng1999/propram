//app.js

App({
 
  onLaunch: function () {
    wx.cloud.init({
      env:"cloud-n5wgp"
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId            
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    if(this.globalData.userInfo !== null){
      //跳转到商品列表页
      wx.switchTab({
        url: '/pages/list/list',
      })
    }
  },
  globalData: {
    userInfo: null,//用户信息
    queryItems:null,//所有商品信息
    myItem:[],//发布的商品
    collectList:[],//收藏的商品
    Base_RequestItem_Url:'http://localhost:8080/itemPic/', //图片地址
    openid:null
  }
})