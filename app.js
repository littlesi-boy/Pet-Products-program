import { setToken } from "./servers/server";

import urlConfig from "./servers/url-config";

import eventEmitter from "./utils/eventEmitter";


App({
  ee:new eventEmitter(),
  onLaunch: function () {
    wx.setStorageSync('toKen', '')
    wx.setStorageSync('openID', '')
    this.getInitLogin((err,success)=>{
      if (err) {
        return
      }
      if (success) {
        wx.setStorageSync('toKen', success.data.result.token)
        setToken()
        wx.setStorageSync('openID', success.data.result.open_id)
        this.ee.emit("LOGIN_SUCCESS")
      }
    })
  },
  getInitLogin(cd){
    wx.login({
      success: res => {
        wx.request({
          url: urlConfig.loginGetToken,
          data: { code: res.code },
          method: 'POST',
          header: {
            "Content-Type": 'application/x-www-form-urlencoded',
          },
          success:  (success)=> {
           cd(null,success)
          }
        })
      }
    })
  },
  getIsShowUserInfo: function () {
    wx.openSetting({
      success: (resopen) => {
        // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
        wx.getSetting({
          success: function success(res) {
            let authSetting = res.authSetting;
            // 没有授权需要弹框
            if (authSetting["scope.userInfo"] === false) {
              // 成功之后会调用设置授权列表去勾选 使用信息
              wx.showModal({
                title: "用户未授权",
                content: "如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。",
                showCancel: false,
                success: (res) => {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (resopen) => {
                        
                      }
                    });
                  }
                }
              })
            } else if (authSetting["scope.userInfo"] === true) {

            }
          }
        })
      }
    });

  },
  globalData: {
    userInfo: null
  }
})