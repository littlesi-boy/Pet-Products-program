import { setDeleteUselessPoster} from "../../servers/server";

Page({
  data: {
    images: "",
    posterDataId: ""
  },
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({ images: options.img, posterDataId: options.posterDataId, title: options.title })
  },
  bindleftBtn: function () {
    wx.showLoading({
      title: '正在保存',
      mask: true
    })
    wx.downloadFile({
      url: this.data.images,
      success:  (res)=> {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success:  (res)=> {
            this.set_DeleteUselessPoster((err,success)=>{
              if (err) {
                return
              }
              if (success) {
                wx.hideLoading()
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000,
                  mask: true
                })
              }
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        })
      },
      fail: function (err) {
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })

  },
  onShareAppMessage: function () {
    let _this = this;
    return {
      title: _this.data.title,
      path: '/pages/shareAfter/shareAfter?id=' + _this.data.posterDataId + "&openID=" + wx.getStorageSync('openID'),
      imageUrl: "https://www.yanggouleme.com/static/pet_dog/scene/share_cover.png",
      success: (res) => {
        _this.set_DeleteUselessPoster((err,success)=>{
          if (err) {
            return
          }
          if (success) {
            
          }
        })
      },
      fail: (res) => {
        // 转发失败
        // _this.set_DeleteUselessPosterFalse()
      }
    }
  },
  set_DeleteUselessPoster(cb){
    setDeleteUselessPoster({ poster_id: this.data.posterDataId })((err, success) => {
      if (err) {
        cd(err,null)
        return
      }
      if (success) {
        cb(null,success)
      }
    })
  }

})