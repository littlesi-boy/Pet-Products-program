
import { getEquipById, singleSellEquip } from "../../servers/server";

Page({

  data: {
    menus: [
      { id: 0, name: '全部' },
      { id: 1, name: '衣服' },
      { id: 2, name: '项圈' },
      { id: 3, name: '垫子' },
      { id: 4, name: '狗粮' },
      { id: 5, name: '玩具' },
      { id: 6, name: '零食' },
      { id: 7, name: '喂食器' },
    ],
    currentTab: 0,
    id:"",
    equipByData:{}
  },
  navbarTap: function (e) {
    wx.navigateBack({
      delta: 1
    })    
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getEquipById()
  },
  onReady() {
    this.dialog = this.selectComponent("#backgroundLayer");
  },
  confirmpayLeftBtn(){
    this.dialog.showDialog();
  },
  confirmpayRightBtn(){
    wx.navigateTo({ url: "/pages/my-knapsack-disguised-dog/my-knapsack-disguised-dog?equip_id=" + this.data.equipByData.id })
  },
  _cancelEvent() {
    this.dialog.hideDialog();
  },
  _confirmEvent() {
    singleSellEquip({
      equip_id: this.data.equipByData.id
    })((err,success)=>{
      if (err) {
        return
      }
      if (success) {
        this.dialog.hideDialog();   
        wx.showToast({
          title: "卖出成功",
          icon: 'success',
          duration: 2000,
          mask:true,
          success(){
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })    
            },1*1500)
          }
        }) 
      }
    })
  },
  getEquipById(){
    getEquipById({equip_id :this.data.id})((err,success)=>{
      if(err){
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask:true
        })
        return
      }
      if(success.data.status.code === 0){
        this.setData({
          equipByData:success.data.result
        })
      }else{
        wx.showToast({
          title: success.data.status.desc,
          icon: 'none',
          duration: 2000,
          mask:true
        })
      }
    })
  }
})