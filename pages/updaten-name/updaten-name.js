import { updateDogName } from "../../servers/server";
Page({

  data: {
    dogName: "",
    textareaValue: "",
    textareaValues: "",

    id:""
  },

  onLoad: function(options) {
    this.setData({
      dogName: options.dogName,
      textareaValue: options.textareaValue,
      id:options.id
    })
  },
  dogNameInput(e) {
    this.setData({
      dogName: e.detail.value
    })
  },
  bindinput(e){
    this.setData({
      textareaValue: e.detail.value,
      textareaValues: e.detail.value
    })
  },
  confirmpay() {
    updateDogName({
      dog_id: this.data.id,
      dog_name: this.data.dogName,
      dog_brief_introduction: this.data.textareaValues || this.data.textareaValue
    })((err, success) => {
      if (err) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask:true
        })
        return
      }
      if (success.data.status.code != 0) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask:true
        })
      }
      if (success.data.status.code == 0) {
        wx.showToast({
          title: "修改完成",
          icon: 'success',
          duration: 2000,
          mask:true,success(){
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },1*1000)
          }
        })
      }
    })

  },
})