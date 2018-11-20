import { setReceivingAddress, getReceivingAddress } from "../../servers/server";
import { isJudgeInput } from "../../utils/isJudgeInput";
Page({
  data: {
    userName: "",
    phoneNumber: "",
    address: "",
    selectionArea: "",
    youZengCode: "",
  },
  onLoad: function (options) {
    this.get_ReceivingAddress()
  },
  selectionAreaInput(e) {
    this.setData({
      selectionArea: e.detail.value
    })
  },
  userNameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  phoneNumberInput(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  detailedAddressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },
  youZengCodeInput(e) {
    this.setData({
      youZengCode: e.detail.value
    })
  },
  confirmpay() {
    if (
      isJudgeInput(this.data.userName, "请确认信息") == 500 ||
      isJudgeInput(this.data.youZengCode, "请确认信息") == 500 ||
      isJudgeInput(this.data.address, "请确认信息") == 500 ||
      isJudgeInput(this.data.phoneNumber, "请确认信息") == 500 ||
      isJudgeInput(this.data.selectionArea, "请确认信息") == 500
    ) {
      return
    } else {
      setReceivingAddress({
        name: this.data.userName,
        zip_code: this.data.youZengCode,
        address: this.data.address,
        city: this.data.selectionArea,
        phone: this.data.phoneNumber,
        id:wx.getStorageSync('awardingID')
      })((err, success) => {
        if (err) {
          wx.showToast({
            title: '网络错误',
            icon: "none",
            duration: 2000,
            mask: true
          })
          return
        }
        if (success && success.data.status.code === 0) {
          wx.showToast({
            title: '兑换完成',
            icon: "success",
            duration: 2000,
            mask: true
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  get_ReceivingAddress() {
    getReceivingAddress()((err, success) => {
      if (err) {
        return
      }
      if (success && success.data.result.length != 0) {
        this.setData({
          youZengCode: success.data.result[0].zip_code,
          address: success.data.result[0].address,
          selectionArea: success.data.result[0].city,
          userName: success.data.result[0].name,
          phoneNumber: success.data.result[0].phone,
        })
      }
    })
  },
  get_authorization(){
    wx.chooseAddress({
      success:  (res)=> {
        this.setData({
          userName:res.userName,
          phoneNumber:res.telNumber,
          youZengCode:res.nationalCode,
          selectionArea:res.provinceName+res.cityName+res.countyName,
          address:res.detailInfo
        })
      }
    })
  }
})