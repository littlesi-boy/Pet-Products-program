import { getDogListPoster, getBeautifulImage } from "../../servers/server";
const app = getApp()

Page({
  data: {
    DogListPoster: [],
    beautifulImage: [],
    pages: 1,
    pageEnd: false,
    pageLoading: false,
    pageError: false,
  },
  onLoad: function (options) {
    this.setData({ pageLoading: true })
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    if (!wx.getStorageSync("toKen")) {
      app.ee.on("LOGIN_SUCCESS", () => {
        this.get_DogListPoster((err, success) => {
          if (err) {
            this.setData({ pageLoading: false, pageError: true, pageEnd: false, })
            wx.hideLoading()
            return
          }
          if (success.data.result.length === 0) {
            this.setData({ pageLoading: false, pageError: false, pageEnd: true, })
          } else {
            this.setData({ DogListPoster: success.data.result, pageLoading: false, pageError: false, pageEnd: false, })
          }
          wx.hideLoading()
        })
        this.get_BeautifulImage();
      })
    } else {
      this.get_DogListPoster((err, success) => {
        if (err) {
          this.setData({ pageLoading: false, pageError: true, pageEnd: false, })
          wx.hideLoading()
          return
        }
        if (success.data.result.length === 0) {
          this.setData({ pageLoading: false, pageError: false, pageEnd: true, })
        } else {
          this.setData({ DogListPoster: success.data.result, pageLoading: false, pageError: false, pageEnd: false, })
        }
        wx.hideLoading()
      })
      this.get_BeautifulImage();
    }
  },
  onPullDownRefresh: function () {
    this.setData({
      pages: 1
    })
    this.get_DogListPoster((err, success) => {
      if (err) {
        this.setData({ pageLoading: false, pageError: true, pageEnd: false, })
        wx.stopPullDownRefresh() //停止下拉刷新
        return
      }
      if (success.data.result.length === 0) {
        this.setData({ pageEnd: true, pageLoading: false, pageError: false, })
      } else {
        this.setData({ DogListPoster: success.data.result, pageEnd: false, pageLoading: false, pageError: false, })
      }
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
  onReachBottom: function () {
    this.setData({
      pageLoading: true,
      pages: this.data.pages + 1
    })
    wx.showNavigationBarLoading()
    this.get_DogListPoster((err, success) => {
      if (err) {
        this.setData({ pageLoading: false, pageError: true, pageEnd: false, })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh() //停止下拉刷新
        return
      }
      if (success.data.result.length === 0) {
        this.setData({ pageEnd: false, pageLoading: false, pageError: true, })
      } else {
        this.setData({ DogListPoster: this.data.DogListPoster.concat(success.data.result), pageEnd: false, pageLoading: false, pageError: false, })
      }
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
  get_DogListPoster(cd) {
    getDogListPoster({ page: this.data.pages })((err, success) => {
      cd(err, success)
    })
  },
  get_BeautifulImage() {
    getBeautifulImage({})((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({ beautifulImage: success.data.result })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: "快来养狗吧!!!",
      path: '/pages/disguised-case/disguised-case',
      imageUrl: "https://www.yanggouleme.com/static/pet_dog/scene/share_cover.png",
      success: (res) => {

      },
      fail: (res) => {

      }
    }
  },
  returnIndex() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  topShare(e) {
    if (e.currentTarget.dataset.id === 0) {
      wx.showToast({
        title: "此用户还没有狗狗!",
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
  reward(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    this.setData({ showDialogs: true })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 350,  //动画时长  
      timingFunction: "ease-in", //线性  
      delay: 2  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0.3).opacity(0.6).opacity(0).rotateX(0).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(0.3).opacity(0.6).opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
})