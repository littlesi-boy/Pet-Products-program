import {getWinnerByDetails} from '../../servers/server'
Page({
  data: {
    awarding_details_ID:"",
    awardingDetails:{},
    created_time:''
  },
  onLoad: function (options) {
    this.setData({
      awarding_details_ID:options.id
    })
  },
  onShow: function () {
    this.get_awardingDetails()
  },
  get_awardingDetails(){
    getWinnerByDetails({
      id:this.data.awarding_details_ID
    })((err,success)=>{
      if (err) {
        return
      }
      if (success && success.data.status.code === 0) {
        this.setData({
          awardingDetails:success.data.result,
          created_time:changeDate(success.data.result.created_time)
        })
      }
    })
  }
})

function changeDate(str) {
  var time;
  if (str) {
      var year = str.slice(0, 10);
      time = year
  } else {
      time = "";
  }
  return time;
}