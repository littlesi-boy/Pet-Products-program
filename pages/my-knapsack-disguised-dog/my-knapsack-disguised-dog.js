import { getEquipById, getSingleDog, setUpdateDogBone, getCompareEquip, setChangeEquip } from "../../servers/server";

Page({
  data: {
    isShow: false,
    isSellOutInfo: false,
    switch1Checked: false,
    dogId: "",
    dogByInfo: {},
    equipData: {},
    compareEquipData: {},
    animInput:null,
    showDialogs:false,
    animationData:null,
    dogIndex:0
  },
  onLoad: function (options) {
    this.setData({ equip_id: options.equip_id })
    this.get_SingleDog()
    this.reward()
  },
  get_Equip() {
    getEquipById({
      equip_id: this.data.equip_id,
      dog_id:this.data.dogByInfo[this.data.dogIndex].id,
    })((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          equipData: success.data.result
        })
        this.get_CompareEquip()
      }
    })
  },
  swiperLeft(){
    if (this.data.dogIndex === 0) {
      this.setData({
        dogIndex: this.data.dogByInfo.length-1
      })
    }else{
      this.setData({
        dogIndex: this.data.dogIndex - 1
      })
    }
    this.get_Equip()
  },
  swiperRight(){
    if (this.data.dogIndex == (this.data.dogByInfo.length-1)) {
      this.setData({
        dogIndex: 0
      })
    } else {
      this.setData({
        dogIndex: this.data.dogIndex + 1
      })
    }
    this.get_Equip()
  },
  determine(){
    setChangeEquip({
      dog_id: this.data.dogByInfo[this.data.dogIndex].id,
      equip_id: this.data.equipData.id
    })((err,success)=>{
      if (err) {
        return
      }
      if (success) {
        wx.reLaunch({
          url: '/pages/my-dog/my-dog?dogIndex=' + this.data.dogIndex
        })
      }
    })
  },
  get_SingleDog() {
    getSingleDog({})((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          dogByInfo: success.data.result,
        })
        this.get_Equip()
      }
    })
  },
  get_CompareEquip() {
    getCompareEquip({
      dog_id: this.data.dogByInfo[this.data.dogIndex].id,
      equip_id: this.data.equipData.id
    })((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          compareEquipData: success.data.result
        })
      }
    })
  },
  switch1Change() {
    this.setData({
      switch1Checked: this.data.switch1Checked === false ? true : false
    })
  },
  reward() {
    if (this.data.showDialogs === true) {
      this.setData(
        {
          showDialogs:false,
          isSellOutInfo:true
        }
      );
      this.popp()
      return
    }
    // 显示
    if (this.data.showDialogs === false) {
      this.setData(
        {
          showDialogs:true,
          isSellOutInfo:false
        }
      );
      this.takeback()
      return
    }

  },

  //弹出动画  
  popp: function () {
    var animationInput = wx.createAnimation()
    animationInput.opacity(1).translate('-122%', '100%').scale(2.4).step({
      duration:250,
      timingFunction: 'ease-in-out'
    });
    var animationData = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease-in-out'
    }).opacity(0.3).opacity(0.6).opacity(0.8).step();
    this.setData({
      animInput: animationInput.export(),
      animationData:animationData.export(),
    })
  },
  //收回动画  
  takeback: function () {
    var animationInput = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease-in-out'
    })
    animationInput.translate(0, 0).scale(1).opacity(1).step();
    var animationData = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease-in-out'
    }).opacity(0.9).opacity(0.6).opacity(0).step();
    this.setData({
      animInput: animationInput.export(),
      animationData:animationData.export()
    })
  },
})