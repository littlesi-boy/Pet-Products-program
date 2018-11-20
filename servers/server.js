import urlConfig from './url-config.js';

var app = getApp();

let token = '';

// 缓存 token
export const setToken = ()=> {
  token = wx.getStorageSync('toKen')
}

function createRequest(url, method) {
  return (data) => (cb, completeCb) => {
    setToken()
    let header = {
      "Content-Type": 'application/x-www-form-urlencoded',
      "Authorization":token
    }
    wx.request({
      url: url,
      data: data,
      method: method || 'GET',
      header: header,
      success: function (res) {
        if (res.statusCode === 200 && !res.data.err) {
          cb(null, res);
        } else {
          cb(res, null);
        }
      },
      fail: function (res) {
        cb(res, null);
      },
      complete: function (res) {
        typeof completeCb === 'function' && completeCb(res);
      }
    })
  }
}


export let getAllDog = createRequest(urlConfig.getAllDog, 'GET');

export let getSingleDog = createRequest(urlConfig.getSingleDog, 'GET');

export let getActivityLate = createRequest(urlConfig.getActivityLate, 'GET');

export let getDogInformation = createRequest(urlConfig.getDogInformation, 'GET');

export let getRank = createRequest(urlConfig.getRank, 'GET');

export let getPosterNotSee = createRequest(urlConfig.getPosterNotSee, 'GET');

export let getPrizeList = createRequest(urlConfig.getPrizeList, 'GET');

export let setAddWinner = createRequest(urlConfig.setAddWinner, 'POST');

export let getActivityState = createRequest(urlConfig.getActivityState, 'GET');

export let setReceivingAddress = createRequest(urlConfig.setReceivingAddress, 'POST');

export let getReceivingAddress = createRequest(urlConfig.getReceivingAddress, 'GET');

export let getListWinnerActivity = createRequest(urlConfig.getListWinnerActivity, 'GET');

export let getBeautifulImage = createRequest(urlConfig.getBeautifulImage, 'GET');

export let getDogListPoster = createRequest(urlConfig.getDogListPoster, 'GET');

export let setAddDog = createRequest(urlConfig.setAddDog, 'POST');
 
export let getDogByInfo = createRequest(urlConfig.getDogByInfo, 'GET');

export let getLuckyAndShareTime = createRequest(urlConfig.getLuckyAndShareTime, 'GET');

export let getEquip = createRequest(urlConfig.getEquip, 'GET');

export let setUpdateDogBone = createRequest(urlConfig.setUpdateDogBone, 'POST');

export let getCompareEquip = createRequest(urlConfig.getCompareEquip, 'POST');

export let getShareword = createRequest(urlConfig.getShareword, 'GET');

export let getScatterByMaster = createRequest(urlConfig.getScatterByMaster, 'GET');

export let getPosterById = createRequest(urlConfig.getPosterById, 'GET');

export let setPoster = createRequest(urlConfig.setPoster, 'POST');

export let getShareDogBone = createRequest(urlConfig.getShareDogBone, 'GET');

export let setAddScatter = createRequest(urlConfig.setAddScatter, 'POST');

export let setDeleteUselessPoster = createRequest(urlConfig.setDeleteUselessPoster, 'GET');

export let setShare = createRequest(urlConfig.setShare, 'GET');

export let getAppointmentActivity = createRequest(urlConfig.getAppointmentActivity, 'GET');

export let setAddAppointmentActivity = createRequest(urlConfig.setAddAppointmentActivity, 'POST');

export let getAogInformation = createRequest(urlConfig.getAogInformation, 'GET');

export let getPrizeDetail = createRequest(urlConfig.getPrizeDetail, 'GET');

export let setUpdateDogEquip = createRequest(urlConfig.setUpdateDogEquip, 'POST');

export let createImage = createRequest(urlConfig.createImage, 'POST');

export let updateMasterInfo = createRequest(urlConfig.updateMasterInfo, 'POST');

export let create_QR_code = createRequest(urlConfig.create_QR_code, 'POST');

export let getWinnerByDetails = createRequest(urlConfig.getWinnerByDetails, 'GET');

export let get_master = createRequest(urlConfig.get_master, 'GET');

export let updateDogName = createRequest(urlConfig.update_name_introduction, 'POST');


export let getEquipDepot = createRequest(urlConfig.get_equip_depot, 'POST');

export let getEquipById = createRequest(urlConfig.get_equip_by_id, 'GET');

export let selectEquipDepotNum = createRequest(urlConfig.select_equip_depot_num, 'POST');

export let batchSellEquip = createRequest(urlConfig.batch_sell_equip, 'POST');

export let singleSellEquip = createRequest(urlConfig.sell_one_equip, 'POST');

export let setChangeEquip = createRequest(urlConfig.change_equip, 'POST');





