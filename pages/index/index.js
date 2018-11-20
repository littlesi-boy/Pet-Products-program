import { getAllDog, getSingleDog, updateMasterInfo,getActivityLate, getRank, getPosterNotSee, dogCongfig } from "../../servers/server";

const app = getApp()

Page({
  data: {
    userInfo: {},
    showModalStatus: false,
    singleDog: [],
    allDog: [],
    allDogPages: 0,
    activityLate: {},
    swiperViewIndex: 5,
    rankData: "",
    posterNotSee: '',
  },
  onLoad(){
    if (!wx.getStorageSync("toKen")) {
      app.ee.on("LOGIN_SUCCESS",()=>{
        this.get_ActivityLate()
        this.get_Rank()
      })
    }else{
      this.get_ActivityLate()
      this.get_Rank()
    }
  },
  onShow() {
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',
      mask:true
    })
    if (!wx.getStorageSync("toKen")) {
      app.ee.on("LOGIN_SUCCESS",()=>{
        this.get_initData()
      })
      wx.hideLoading()
    }else{
      this.get_initData()
    }
  },
  get_initData(){
    this.setData({
      allDogPages: 0,
      swiperViewIndex: 0,
    })
    this.get_SingleDog()
    this.get_AllDog()
    this.get_PosterNotSee()
    wx.hideLoading()
  },
  onPullDownRefresh() {
    this.get_ActivityLate()
    this.get_SingleDog()
    this.get_AllDog()
    this.get_Rank()
  },
  myKnapsack(){
    wx.navigateTo({ url: "/pages/my-knapsack/my-knapsack" })
  },
  dynamic() {
    wx.navigateTo({ url: "/pages/disguised-case/disguised-case" })
  },
  share(e) {
    wx.navigateTo({ url: "/pages/share-dog/share-dog?dogtypeid=" + e.currentTarget.dataset.dogtypeid + "&dogid=" + e.currentTarget.dataset.dogid })
  },
  swiperLeft() {
    if (this.data.swiperViewIndex === 0) {
      return
    }
    this.setData({
      swiperViewIndex: this.data.swiperViewIndex - 1
    })

  },
  swiperRight() {
    if (this.data.swiperViewIndex == this.data.singleDog.length) {
      return
    }
    if (this.data.swiperViewIndex == 7) {
      this.setData({
        swiperViewIndex: 7
      })
      return
    } else {
      this.setData({
        swiperViewIndex: this.data.swiperViewIndex + 1
      })
    }
  },
  get_AllDog() {
    getAllDog()((err, success) => {
      if (err) {
        wx.showToast({
          title: '网络超时',
          icon: "none",
          duration: 2000,          
        })
        wx.stopPullDownRefresh() //停止下拉刷新
        return
      }
      if (success.data.result.length != 0) {
        this.setData({
          allDog: success.data.result
        })
      }
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
  get_SingleDog() {
    getSingleDog()((err, success) => {
      if (err) {
        wx.showToast({
          title: '网络超时',
          icon: "none",
          duration: 2000,           
        })
        return
      }
      if (success.data.result.length != 0) {
        this.setData({
          singleDog: success.data.result
        })
      }
    })
  },
  get_ActivityLate() {
    getActivityLate()((err, success) => {
      if (err) {
        wx.showToast({
          title: '网络超时',
          icon: "none",
          duration: 2000,          
        })
        return
      }
      if (success) {
        this.setData({ activityLate: success.data.result })
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
      }
    })
  },
  get_PosterNotSee() {
    getPosterNotSee()((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({ posterNotSee: success.data.result.number })
      }
    })
  },
  userInfoHandler(data){
    if (data.detail.errMsg == 'getUserInfo:ok') {
      this.set_updateMasterInfo(data.detail.userInfo);
    }else{
      app.getIsShowUserInfo()
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
        wx.navigateTo({
          url: '/pages/add-dog/add-dog?bonenum=' + this.data.rankData.dog_bone_num
        })
      }
    })
  },
  exchangeClick(e) {
    wx.navigateTo({
      url: '/pages/exchange/exchange?getactivitylateid=' + e.currentTarget.dataset.getactivitylateid
    })
  },
  addDog(e) {
    wx.navigateTo({
      url: '/pages/add-dog/add-dog?bonenum=' + e.currentTarget.dataset.bonenum
    })
  },
  myDog(e) {
    wx.navigateTo({
      url: '/pages/my-dog/my-dog?dogIndex=' + e.currentTarget.dataset.dogindex
    })
  },
  onShareAppMessage: function () {
    return {
      title: "快来养狗吧!!!",
      path: '/pages/index/index',
      imageUrl: "https://www.yanggouleme.com/static/pet_dog/scene/share_cover.png",
      success: (res) => {
        
      },
      fail: (res) => {
        
      }
    }
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
