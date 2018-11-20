import { getCompareEquip } from "../../servers/server";
Page({

  data: {
    compareEquipData:{}
  },

  onLoad: function (options) {
    this.setData({
      compareEquipData:JSON.parse(options.data)
    })
  },
  receivingAddress(){
    wx.navigateBack({
      delta: 2
    })
  }
})