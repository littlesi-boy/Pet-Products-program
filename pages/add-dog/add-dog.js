import { getAogInformation, setAddDog, getRank } from "../../servers/server";

Page({
  data: {
    dogInformation: {},
    pages: 1,
    rankData: {},
    addDog_bone: '10rpx'
  },
  onShow: function () {
    wx.showLoading({
      title: '正在加载',
    })
    wx.getSystemInfo({
      success: (res) => {
        if (res.windowWidth === 375) {
          this.setData({ addDog_bone: '9rpx' })
        }
      }
    })
    this.getAogInformation();
    this.get_Rank();
  },
  swiperLeft() {
    if (this.data.pages == 1) {
      this.setData({
        pages: 8
      })
    }else{
      this.setData({
        pages: this.data.pages - 1
      })
    }
    this.getAogInformation();
  },
  swiperRight() {
    if (this.data.pages == this.data.dogInformation.total) {
      this.setData({
        pages: 1
      })
    }else{
      this.setData({
        pages: this.data.pages + 1
      })
    }
    this.getAogInformation();
  },
  set_AddDog() {
    wx.showLoading({
      title: '加载中',
    })

    setAddDog({
      dog_type_id: this.data.dogInformation.id
    })((err, success) => {
      if (err) {
        wx.hideLoading()
        return
      }
      if (success.data.status.code != 0) {
        wx.hideLoading()
        wx.showToast({
          title: success.data.status.desc,
          duration: 2000,
          icon: 'none',
          mask: true
        })
        return
      }
      if (success.data.status.code == 0) {
        wx.reLaunch({
          url: '/pages/index/index'
        })
        wx.hideLoading()
      }
    })
  },
  getAogInformation() {
    getAogInformation({ page: this.data.pages })((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          dogInformation: success.data.result
        })
      }
    })
  },
  get_Rank() {
    getRank()((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          rankData: success.data.result
        })
        wx.hideLoading()
      }
    })
  },
  returnIndex() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

})