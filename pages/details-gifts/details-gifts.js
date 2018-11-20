import { getPrizeDetail } from "../../servers/server";
const app = getApp()

Page({
  data: {
    prizeId:"",
    image_array:[]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    this.setData({
      prizeId:options.prizeId
    })

    this.get_PrizeDetail()  
  },
  returnIndex() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  onReady(){
    wx.hideLoading()
  },
  get_PrizeDetail(){
    getPrizeDetail({
      prize_id:this.data.prizeId
    })((err,success)=>{
      if (err) {
        return
      }
      if (success) {
        let array = Object.keys(success.data.result).sort().map(key => success.data.result[key])
        this.setData({ image_array: array})
      }
    })
  },
  previewImage: function (e) { 
    let index = e.currentTarget.dataset.index;
    wx.previewImage({  
      current:this.data.image_array[index] ,
      urls:  this.data.image_array
    })  
    wx.getImageInfo({// 获取图片信息（此处可不要）  
      src: this.data.image_array[index] ,  
      success: function (res) {  
         
      }  
    })
  }

})