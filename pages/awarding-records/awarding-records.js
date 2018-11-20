import { getPrizeList, get_master,setReceivingAddress } from "../../servers/server";
Page({
  data: {
    prizeList: [],
    pages:1,
    emptyData:false
  },
  onLoad(){
    wx.showLoading({
      title: '正在加载',
    })
    this.get_SingleDog()
    this.get_PrizeList((err, success) => {

      if (err) {
        wx.hideLoading()
        return
      }
      if (success.data.result.length != 0) {

        this.setData({  prizeList: success.data.result })
      }
      wx.hideLoading()
    })
  },
  onShow(){
    this.get_SingleDog()
    this.get_PrizeList((err, success) => {
      if (err) {
        wx.hideLoading()
        return
      }
      if (success.data.result.length != 0) {
        this.setData({ prizeList: success.data.result })
      }
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({pages:1})
    this.get_PrizeList((err, success) => {
      if (err) {
        wx.hideLoading()
        return
      }
      if (success.data.result.length != 0 ) {
        this.setData({ prizeList: success.data.result})
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
  onReachBottom: function () {
    this.setData({pages:this.data.pages+1})

    wx.showNavigationBarLoading()

    this.get_PrizeList((err, success) => {
      if (err) {
        return
      }
      if (success.data.result.length != 0) {
        this.setData({prizeList: this.data.prizeList.concat(success.data.result) })
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
  get_PrizeList(cd) {
    getPrizeList({page:this.data.pages})((err, success) => {
      cd(err, success)
    })
  },
  get_SingleDog(cd) {
    get_master()((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({ dog_bone_num: success.data.result.dog_bone_num })
      }
    })
  },
  receivingAddress(){
    wx.chooseAddress({
      success:  (res)=> {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
          mask:true
        })
        setReceivingAddress({
          name:res.userName,
          phone:res.telNumber,
          zip_code:res.nationalCode,
          city:res.provinceName+res.cityName+res.countyName,
          address:res.detailInfo,
          id:wx.getStorageSync('awardingID')
        })((err,success)=>{
          if (err) {
            return
          }
          if (success && success.data.status.code === 0) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              mask:true
            })
          }else{
            wx.showToast({
              title: '修改失败',
              icon: 'none',
              duration: 2000,
              mask:true
            })
          }
        })
      },fail: (res)=>{
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 2000,
          mask:true
        })
      }
    })
  },
  awardingdetails(e){
    wx.navigateTo({
      url:"/pages/awarding-details/awarding-details?id="+e.currentTarget.dataset.id
    })
  }
})