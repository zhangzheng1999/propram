//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    openid:null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function () {
    //获取用户openid
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(res=>{
      getApp().globalData.openid = res.result.openid
      console.log(getApp().globalData.openid)
      this.setData({
        openid:res.result.openid
      })
      console.log("赋值成功")
    }).catch(res=>{
      console.log(res)
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      //跳转到商品列表页
      wx.switchTab({
        url: '/pages/list/list',
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        //跳转到商品列表页
        wx.switchTab({
          url: '/pages/list/list',
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.getUserInfo(res);
          
        }
      })
    }
  },

  shouquan(){
      //用户授权
      wx.requestSubscribeMessage({
        tmplIds: ['biBvx9O7wbH5bl91dopTIAtrbFC7KpZrOFp5ItDhfSU'],//模板id
        success(res){
          console.log("授权成功",res);
        },
        fail(res){
          console.log("授权失败",res);
        }
      })
  },
  //发送推送消息给单个用户
  sendMessage(){
    wx.cloud.callFunction({
      name:"sendMes",
      data:{
        openid:"olzWn5B5lz7jIfd-dS7vAE6qTSYo"
      }
    }).then(res=>{
      console.log("发送成功",res)
    }).catch(res=>{
      console.log("发送失败",res)
    })
  },
  //获取用户信息
  getUserInfo: function(e) {
      
    this.setData({
      userInfo: e.detail.userInfo,  
      hasUserInfo: true
    })
      //下载文件
      wx.downloadFile({
        url: e.detail.userInfo.avatarUrl,
        success:res=>{
          console.log("下载成功")
         
          console.log("上传文件开始。。。。")
          //上传文件
          wx.uploadFile({
            filePath:res.tempFilePath,
            name: 'userInfo',
            url: 'http://localhost:8080/addUser.action',
            formData:{
              userName:e.detail.userInfo.nickName,
              userGender:e.detail.userInfo.gender,
              userProvince:e.detail.userInfo.province,
              userCountry:e.detail.userInfo.country,
              userCity:e.detail.userInfo.city,
              openId:this.data.openid
            },
            fail(res){
              wx.showToast({
                title: '请检查您的网络',
                icon:"none"
              })
            },
            success(result){
              let res = JSON.parse(result.data)
              wx.showToast({
                title: '获取成功，正在跳转...',
                icon:'success'
              })
              //跳转到商品列表页
              wx.switchTab({
                url: '/pages/list/list',
              })
               
            }
          })
        },
        fail(res){
          wx.showToast({
            title: '请检查您的网络',
            icon:"none"
          })
        }
      })
    }
})
