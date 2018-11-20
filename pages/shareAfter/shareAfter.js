import { getScatterByMaster, getPosterById, getShareDogBone, setAddScatter, getAppointmentActivity ,updateMasterInfo} from "../../servers/server";

var app = new getApp()
Page({

  data: {
    posterID: "",
    listArray: [],
    pages: 1,
    posterByData: {},
    shareDogBoneData: {},
    isType: 1,
    resuser: {},
    openID: "",
    pageLoading:false,
    pageError:false,
    pageEnd:false,
  },
  onLoad: function (options) {
    this.setData({
      posterID: options.id,
      openID: options.openID,
    })
  },
  onShow() {
    wx.showLoading({
      title: '正在加载',
    })
    this.setData({
      pages:1
    })
    if (!wx.getStorageSync("toKen") && !wx.getStorageSync("openID") ) {
      app.ee.on("LOGIN_SUCCESS",()=>{
        this.get_PosterById()
      })
    }else{
      this.get_PosterById()
    }
  },
  onPullDownRefresh: function () {
    this.setData({ pages: 1 })
    this.get_ScatterByMaster((err, success) => {
      if (err) {
        wx.stopPullDownRefresh() //停止下拉刷新
        return
      }
      if (success) {
        this.setData({ listArray: success.data.result })
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  onReachBottom: function () {
    this.setData({pageError:false,pageEnd:false,pageLoading:true, pages: this.data.pages + 1 })
    this.get_ScatterByMaster((err, success) => {
      if (err) {
        this.setData({pageLoading:false,pageEnd:false,pageError:true,})
        wx.stopPullDownRefresh() //停止下拉刷新
        return
      }
      if (success.data.result.length === 0) {
        this.setData({pageLoading:false,pageError:false,pageEnd:true,})
      }
      if (success.data.result.length != 0) {
        this.setData({ listArray: this.data.listArray.concat(success.data.result),pageLoading:false,pageError:false,pageEnd:false, })
      }
      wx.stopPullDownRefresh() //停止下拉刷新

    })
  },
  get_ScatterByMaster(cd) {
    getScatterByMaster({ page: this.data.pages, share_open_id: this.data.openID, })((err, success) => {
      cd(err, success)
    })
  },
  get_PosterById() {
    getPosterById({ poster_id: this.data.posterID })((err, success) => {
      if (err) {
        wx.showToast({
          title: '网络错误,请重试!',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }
      if (success) {
        this.setData({ posterByData: success.data.result })
        wx.setNavigationBarTitle({
          title: `${success.data.result.master.nick_name}的狗狗`
        })
        this.get_ScatterByMaster((err, success) => {
          if (err) {
            return
          }
          if (success) {
            this.setData({ listArray: success.data.result })
            this.get_ShareDogBone();
            wx.hideLoading()
          }
        })
      }
    })
  },
  get_ShareDogBone() {
    getShareDogBone({
      scatter_open_id: this.data.posterByData.master.open_id,
    })((err, success) => {
      if (err) {
        wx.showToast({
          title: '网络错误,请重试!',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }
      if (success) {
        this.setData({
          shareDogBoneData: success.data.result
        })
        if (success.data.result.occupy == "0.0%") {
          this.setData({
            isType: 3
          })
          this.data.shareDogBoneData.occupy = '100.0%'
        }
        if (success.data.result.not_occupy == "0.0%") {
          this.setData({
            isType: 2
          })
          this.data.shareDogBoneData.not_occupy = '100.0%'
        }
      }
    })
  },
  set_AddScatter(res) {
    if (res.detail.errMsg == 'getUserInfo:ok') {
      this.setData({
        resuser: res.detail.userInfo
      })
      setAddScatter({
        scatter_open_id: wx.getStorageSync('openID'),
        share_open_id: this.data.openID,
        scatter_name: this.data.resuser.nickName,
        scatter_url: this.data.resuser.avatarUrl
      })((err, success) => {
        if (err) {
          wx.showToast({
            title: '网络错误,请重试!',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          return
        }
        if (success) {
          if (success.data.status.code == 1) {
            wx.showToast({
              title: success.data.status.desc,
              icon: 'none',
              duration: 2000,
              mask: true
            })
            return
          } else {
            wx.showToast({
              title: success.data.status.desc,
              icon: 'success',
              duration: 2000,
              mask: true
            })
          }
          this.get_ShareDogBone()
          this.setData({ pages: 1 })
          this.get_ScatterByMaster((err, success) => {
            if (err) {
              return
            }
            if (success) {
              this.setData({ listArray: success.data.result })
            }
          })
        }
      })
    }
    else if (res.detail.errMsg == 'getUserInfo:fail auth deny') { // 当用户点击拒绝时
      wx.showModal({
        title: "用户未授权",
        content: "如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。",
        showCancel: false,
        success: (resbtn) => {
          if (resbtn.confirm) {
            app.getIsShowUserInfo()
          }
        }
      })
    }
  },
  backShareAfter(e){
    if (e.currentTarget.dataset.id === 0){
      wx.showToast({
        title: '宝宝还没有分享过哦!',
        icon: 'none',
        duration: 2000,
        mask: true
      })
        return
    }
    wx.navigateTo({
      url: '/pages/shareAfter/shareAfter?id=' + e.currentTarget.dataset.id + "&openID=" + e.currentTarget.dataset.openid
    })
  },
  bindrightBtn(data) {
    if (data.detail.errMsg == 'getUserInfo:ok') {
      this.set_updateMasterInfo(data.detail.userInfo);
    }
    else if (data.detail.errMsg == 'getUserInfo:fail auth deny') { // 当用户点击拒绝时
      wx.showModal({
        title: "用户未授权",
        content: "如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。",
        showCancel: false,
        success: (resbtn) => {
          if (resbtn.confirm) {
            app.getIsShowUserInfo()
          }
        }
      })
    }
  },
  set_updateMasterInfo(data){
    updateMasterInfo({
      nick_name:data.nickName,
      head_image:data.avatarUrl,
      gender:data.gender
    })((err,success)=>{
      if (err) {
        return
      }
      if (success) {
        wx.redirectTo({
          url: "/pages/add-dog/add-dog"
        })
      }
    })
  },
  bindleftBtn() {
    wx.redirectTo({
      url: "/pages/index/index"
    })
  },
})

