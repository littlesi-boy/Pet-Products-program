import { getEquip, getDogByInfo, setUpdateDogBone, getCompareEquip, setUpdateDogEquip } from "../../servers/server";

Page({
  data: {
    isShow: true,
    isSellOutInfo: false,
    switch1Checked: false,
    dogId: "",
    titleInfo: "",
    dogByInfo: {},
    equipData: {},
    compareEquipData: {},
    animInput:null,
    showDialogs:true,
    isStatus:1,
    animationData:null,
    dogIndex:0
  },
  onLoad: function (options) {
    this.setData({ dogId: options.dogId,dogIndex:parseInt(options.dogIndex)})
    this.get_Equip()
    this.get_DogByInfo()
    this.reward()
    setTimeout(() => {
      this.setData({showDialogs:false,isStatus:2})
      this.reward()
    }, 3 *1000);
  },
  onReady() {
    this.dialog = this.selectComponent("#backgroundLayer");
  },
  _cancelEvent() {
    this.dialog.hideDialog();
  },
  _confirmEvent() {
    setUpdateDogBone({
      equip_id: this.data.equipData.id
    })((err, success) => {
      if (err) {
        return
      }
      if (success) {
        if (success.data.status.code === 1) {
          this.dialog.hideDialog();
          wx.showToast({
            title: success.data.status.desc,
            icon: 'none',
            duration: 2000,
            mask:true
          })
        }else{
          this.dialog.hideDialog();
          let data = JSON.stringify(success.data.result);
          wx.navigateTo({
            url: '/pages/sell-out-dog/sell-out-dog?data=' + data
          })
        }
      }
    })
  },
  confirmpayRightBtn() {
    wx.showLoading({
      title: '正在加载',
    })
    setUpdateDogEquip({
      equip_id: this.data.equipData.id,
      dog_id: this.data.dogId
    })((err, success) => {
      if (err) {
        wx.hideLoading()
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000,
          mask:true
        })
        return
      }
      if (success) {
        // let indexs = this.data.dogIndex
        wx.hideLoading()
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })

  },
  confirmpayLeftBtn() {
    this.dialog.showDialog();
  },
  get_Equip() {
    getEquip({
      dog_id: this.data.dogId
    })((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          equipData: success.data.result
        })
        this.get_CompareEquip()
        setTimeout(() => {
          this.setData({ isShow: false, })
        }, 1 * 1000)
      }
    })
  },
  get_DogByInfo() {
    getDogByInfo({ id: this.data.dogId })((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          dogByInfo: success.data.result,
          titleInfo: this.data.equipData.name
        })
      }
    })
  },
  get_CompareEquip() {
    getCompareEquip({
      dog_id: this.data.dogId,
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
    // animationInput.translate(-10, 100).scale(2.1).step({
    //   duration: 200,
    //   timingFunction: 'ease-in'
    // })
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