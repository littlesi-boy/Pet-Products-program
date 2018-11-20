import { getRank ,getSingleDog,getLuckyAndShareTime} from "../../servers/server";

Page({
  data: {
    dogIndex:0,
    rankData:{},
    dogByInfoData:[],
    luckyAndShareData:{},
    center_MoreChange:"center_BtnOkMoreChange",
    centerBtnText:"",
    widths:'550'
  },
  onLoad: function (options) {
    this.setData({ dogIndex: parseInt(options.dogIndex)})
  },
  onShareAppMessage: function () {
    return {
      title: "快来养狗吧!!!",
      path: '/pages/my-dog/my-dog',
      imageUrl: "https://www.yanggouleme.com/static/pet_dog/scene/share_cover.png",
      success: (res) => {
        
      },
      fail: (res) => {
        
      }
    }
  },
  onShow: function () {
    wx.showLoading({
      title: '正在加载',
      mask:true
    }) 
    this.get_SingleDog()
    this.get_Rank()
    this.get_LuckyAndShareTime()
  },
  swiperLeft(){
    if (this.data.dogIndex == 0) {
      this.setData({
        dogIndex:this.data.dogByInfoData.length-1
      })
      return
    }else{
      this.setData({
        dogIndex:this.data.dogIndex-1
      })
    }
  },
  swiperRight(){
    if (parseInt(this.data.dogIndex)+1 == this.data.dogByInfoData.length) {
      this.setData({
        dogIndex:0
      })
      return
    }
    if ( this.data.dogIndex == 7) {
      this.setData({
        dogIndex:7
      })
      return
    }else{
      this.setData({
        dogIndex:parseInt(this.data.dogIndex)+1
      })
    }
  },
  get_Rank(){
    getRank()((err,success)=>{
      if (err) {
        return
      }
      if (success) {
        this.setData({
          rankData:success.data.result
        })
      }
    })
  },
  get_SingleDog(){
    getSingleDog({})((err,success)=>{
      if (err) {
        return
      }
      if (success) {
        this.setData({
          dogByInfoData:success.data.result
        })
      }
    })
  },
  get_LuckyAndShareTime(){
    getLuckyAndShareTime()((err,success)=>{
      if (err) {
        return
      }
      if (success) {
        this.setData({
          luckyAndShareData:success.data.result
        })
        if (success.data.result.lucky_equip_time == 0) {
          this.setData({
            center_MoreChange:'center_BtnNoMoreChange',
            centerBtnText:"今日抽取机会以用完",
          })
        }else{
          this.setData({
            center_MoreChange:'center_BtnOkMoreChange',
            centerBtnText:"抽取狗狗周边",
          })
        }
        wx.hideLoading()
      }
    })
  },
  returnIndex(){
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  updatenName(){
    wx.navigateTo({
      url: '/pages/updaten-name/updaten-name?dogName=' + this.data.dogByInfoData[this.data.dogIndex].dog_type.type_name + "&textareaValue=" + this.data.dogByInfoData[this.data.dogIndex].dog_type.brief_introduction + "&id=" + this.data.dogByInfoData[this.data.dogIndex].id,
    })
  },
  share(e){
    wx.navigateTo({ url: "/pages/share-dog/share-dog?dogtypeid="+e.currentTarget.dataset.dogtypeid+"&dogid="+e.currentTarget.dataset.dogid})
  },
  shareDog(){
    if (this.data.luckyAndShareData.lucky_equip_time == 0) {
      return
    }else{
      wx.navigateTo({
        url: '/pages/disguised-dog/disguised-dog?dogId='+this.data.dogByInfoData[this.data.dogIndex].id+"&dogIndex="+this.data.dogIndex
      })
    }
  }
})