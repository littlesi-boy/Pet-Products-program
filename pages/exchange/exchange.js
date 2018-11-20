import { getActivityLate ,setAddWinner,getActivityState,getListWinnerActivity,getAppointmentActivity,setAddAppointmentActivity} from "../../servers/server";
const app = getApp()

Page({
  data: {
    center_Views:"",
    showDialogs:false,
    ActivityLate:{},
    ActivityState:{},
    widths:300,
    listWinnerActivity:[],
    addWinner:{},
    appointmentActivityData:{},
    appointmentActivityBg:'',
    formId:""
  },
  onLoad(){
    if (!wx.getStorageSync("toKen")) {
      app.ee.on("LOGIN_SUCCESS", () => {
        this.get_AppointmentActivity()
        this.get_ActivityState()
      })
    } else {
      this.get_AppointmentActivity()
      this.get_ActivityState()    }
  },
  onShow: function () {
    wx.showLoading({
      title: '正在加载',
    })
    if (!wx.getStorageSync("toKen")) {
      app.ee.on("LOGIN_SUCCESS", () => {
        this.get_ActivityLate()
      })
      wx.hideLoading()
    } else {
      this.get_ActivityLate()
    }
  },
  detailsGifts(){
    wx.navigateTo({
      url:"/pages/details-gifts/details-gifts?prizeId="+this.data.ActivityLate.prize.id
    })
  },
  //填收货地址
  receivingAddress(){
    this.util('close') 
    this.setData({showDialogs:false})
    wx.navigateTo({
      url:"/pages/receiving-address/receiving-address"
    })
  },
  confirmpay(){
    if (this.data.ActivityState.state === 1 || this.data.ActivityState.state === 2 || this.data.ActivityState.state === 3  ) {
      return
    }else{
      this.set_AddWinner()
    }
  },
  awardingRecords(){
    wx.navigateTo({
      url: '/pages/awarding-records/awarding-records',
    })
  },
  get_ActivityLate(){
    getActivityLate()((err,success)=>{
      if (err) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask:true
        })
        wx.hideLoading()    
        return
      }
      if (success) {
        this.setData({ActivityLate:success.data.result})
        this.get_ListWinnerActivity()
      }
    })
  },
  get_ActivityState(){
    getActivityState()((err,success)=>{
      if (err) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask:true
        })
        wx.hideLoading()    
        return
      }
      if (success) {
        this.setData({ActivityState:success.data.result})
        wx.hideLoading()    

        if (success.data.result.state === 1) {
          this.setData({center_Views:"center_BtnNoMoreChange"})
          return
        }
        else if (success.data.result.state === 2) {
          this.setData({center_Views:"center_BtnNoMoreChange"})
          return
        }        
        else if (success.data.result.state === 3) {
          this.setData({center_Views:"center_BtnNoMoreChange"})
          return
        }
        else if (success.data.result.state === 5) {
          this.setData({center_Views:"center_BtnNoMoreChange"})
          return
        }else{
          this.setData({center_Views:"center_BtnOkMoreChange"})
          return
        }    
      }
    })
    wx.hideLoading()    
  },
  set_AddWinner(){
    setAddWinner()((err,success)=>{
      if (err) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask:true
        })
        return
      }
      if (success) {
        if (success.data.status.code != 0 ) {
          this.get_ActivityState();
          wx.showToast({
            title: success.data.status.desc,
            icon: 'none',
            duration: 2000,
            mask:true
          })
          return
        }else{
          this.util('open') 
          this.setData({showDialogs:true})
          this.setData({addWinner:success.data.result})
          wx.setStorageSync('awardingID', success.data.result.id)
        }
      }
    })
  },
  get_ListWinnerActivity(){
    getListWinnerActivity({activity_id:this.data.ActivityLate.id})((err,success)=>{
      if (err) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask:true
        })
        wx.hideLoading()    
        return
      }
      if (success) {
        this.setData({listWinnerActivity:success.data.result})
        wx.hideLoading()    
      }
    })
  },
  get_AppointmentActivity(){
    getAppointmentActivity({})((err,success)=>{
      if (err) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask:true
        })
        wx.hideLoading()    
        return
      }
      if (success) {
        this.setData({appointmentActivityData:success.data})
        if (success.data.status.code == 1 || success.data.status.code == 2) {
          this.setData({appointmentActivityBg:"center_BtnNoMoreChange"})
          return
        }
        if (success.data.status.code == 0) {
          this.setData({appointmentActivityBg:"center_BtnOkMoreChange"})
          return
        }        
      }
    })
  },
  appointment(){
    this.set_AddAppointmentActivity()
  },
  set_AddAppointmentActivity(){
    if (this.data.appointmentActivityData.status.code == 1 || this.data.appointmentActivityData.status.code == 2) {
      return
    }else{
      setAddAppointmentActivity({
        lucky_activity_id:this.data.ActivityLate.id,
        form_id:this.data.formId
      })((err,success)=>{
        if (err) {
          wx.showToast({
            title: "网络超时,请稍后重试",
            icon: 'none',
            duration: 2000,
            mask:true
          })
          return
        }
        if (success) {
          this.get_AppointmentActivity()
        }
      })
    }
  },
  getFormID: function (e) {
    this.setData({formId:e.detail.formId})  
    this.set_AddAppointmentActivity()
  },
  onShareAppMessage: function () {
    return {
      title: "快来养狗吧!!!",
      path: '/pages/exchange/exchange',
      imageUrl: "https://www.yanggouleme.com/static/pet_dog/scene/share_cover.png",
      success: (res) => {
        
      },
      fail: (res) => {
        
      }
    }
  },
  exchangeClose(e){
    var currentStatu = e.currentTarget.dataset.statu;  
    this.util(currentStatu) 
    this.setData({showDialogs:false})
  },
  util: function(currentStatu){  
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
  returnIndex() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
})