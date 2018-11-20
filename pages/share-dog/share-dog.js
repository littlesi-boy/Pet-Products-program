import { getShareword, setPoster, setDeleteUselessPoster, setShare, createImage, create_QR_code } from "../../servers/server";

Page({

  data: {
    dogTypeId: "",
    dogid: "",
    shareWordArray: "",
    textareaValue: "",
    shareWordIndex: '',
    shareWordDate: "",
    posterData: {},
    bottomBigView: false
  },
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      dogTypeId: options.dogtypeid,
      dogid: options.dogid
    })
    this.get_Shareword();
  },
  onShow: function () {
    this.setData({
      shareWordIndex:Math.floor(Math.random()*4)
    })
    this.setData({ bottomBigView: false })
  },
  onShareAppMessage: function () {

    let _this = this;
    let num = parseInt(_this.data.posterData.id);

    return {
      title: _this.data.textareaValue,
      path: '/pages/shareAfter/shareAfter?id=' + num + "&openID=" + wx.getStorageSync('openID'),
      imageUrl: "https://www.yanggouleme.com/static/pet_dog/scene/share_cover.png",
      success: (res) => {
        _this.set_DeleteUselessPoster()
        _this.set_Share()
      },
      fail: (res) => {
        // 转发失败
        // _this.set_DeleteUselessPosterFalse()
      }
    }
  },
  textareaValues(e) {
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    this.setData({
      textareaValue: e.detail.value
    })
    this.set_Poster((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          posterData: success.data.result
        })
        wx.hideLoading()
      }
    });
  },
  manualInput() {
    this.setData({
      textareaValue: ''
    })
  },
  set_Poster(cd) {
    let imgString = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><style>    body{margin: 0;padding: 0;box-sizing: border-box;background: white;width: 325px;height: 200px;}        .bg-box {            position: relative;            background:white;            width: 325px;height: 245px;            top: -60px;            overflow: hidden;        }        .bg-image {          position: absolute;          width: 325px;          z-index: 40;          height: 280px;          background-size: 100% 100%;          background-repeat: no-repeat;          }        .dog_configZ_index {            z-index: 888;        }        .dog_img {            width: 325px;            height: 280px;            position: absolute;            z-index: 290;            background-size: 100% 100%;            background-repeat: no-repeat;        }        .dog_clothes {            position: absolute;            width: 325px;            height: 280px;            background-size: 100% 100%;            background-repeat: no-repeat;        }        .dog_food_blow {            position: absolute;            width: 325px;            height: 280px;            background-size: 100% 100%;            background-repeat: no-repeat;        }        .dog_toy {            position: absolute;            width: 325px;            height: 280px;            background-size: 100% 100%;            background-repeat: no-repeat;        }        .dog_food {            position: absolute;            width: 325px;            height: 280px;            z-index: 200;            background-size: 100% 100%;            background-repeat: no-repeat;        }        .dog_image_url {            position: absolute;            width: 325px;            height: 280px;            background-size: 100% 100%;            background-repeat: no-repeat;        }        .dog_necklace {            position: absolute;            width: 325px;            height: 280px;            background-size: 100% 100%;            background-repeat: no-repeat;        }        .dog_straw_mattress {            position: absolute;            width: 325px;            height: 280px;            background-size: 100% 100%;            background-repeat: no-repeat;        }        .dog_snacks {            position: absolute;            width: 325px;            height: 280px;            background-size: 100% 100%;            background-repeat: no-repeat;        }</style></head><body><div class="bg-box"><div class="bg-image" style="background-image: url(https://www.yanggouleme.com/static/pet_dog/scene/background.png)" ></div><div class="dog_img dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.dog_type.dog_img})" ></div><div class="dog_clothes dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.clothes.image_url})" ></div><div class="dog_food" style="background-image: url(${this.data.shareWordArray.dog.food.image_url})" ></div><div class="dog_food_blow dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.food_blow.image_url})" ></div><div class="dog_toy dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.toys.image_url})" ></div><div class="dog_necklace dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.necklace.image_url})" ></div><div class="dog_straw_mattress" style="z-index: 280;background-image: url(${this.data.shareWordArray.dog.straw_mattress.image_url})" ></div><div class="dog_straw_mattress" style="z-index: 280;background-image: url(${this.data.shareWordArray.dog.straw_mattress.after})" ></div><div class="dog_straw_mattress" style="z-index: 300;background-image: url(${this.data.shareWordArray.dog.straw_mattress.before})" ></div><div class="dog_snacks dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.snacks.image_url})" ></div></div></body></html>`
    setPoster({
      word: this.data.textareaValue,
      html: imgString,
      dog_type_id: this.data.dogTypeId
    })((err, success) => {
      cd(err, success)
    })
  },
  switchSentence() {
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    this.setData({
      shareWordIndex: this.data.shareWordIndex + 1
    })
    if (this.data.shareWordIndex == this.data.shareWordArray.word_list.length) {
      this.setData({
        shareWordIndex: 0
      })
    }
    this.setData({
      textareaValue: this.data.shareWordArray.word_list[this.data.shareWordIndex].word
    })
    this.set_Poster((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          posterData: success.data.result
        })
        wx.hideLoading()
      }
    });
  },
  get_Shareword() {
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    getShareword({
      dog_type_id: this.data.dogTypeId,
      dog_id: this.data.dogid
    })((err, success) => {
      if (err) {
        return
      }
      if (success) {
        this.setData({
          shareWordArray: success.data.result,
          textareaValue: success.data.result.word_list[this.data.shareWordIndex].word,
          shareWordDate: dates(success.data.result.time)
        })
        this.set_Poster((err, success) => {
          if (err) {
            return
          }
          if (success) {
            this.setData({
              posterData: success.data.result
            })
            wx.hideLoading()
          }
        });
      }
    })
  },
  set_DeleteUselessPoster() {
    setDeleteUselessPoster({ poster_id: this.data.posterData.id })((err, success) => {
      if (err) {
        return
      }
      if (success) {
      }
    })
  },
  set_Share() {
    setShare()((err, success) => {
      if (err) {
        return
      }
      if (success) {

      }
    })
  },
  bindrightBtn() {
    this.setData({ bottomBigView: true })

    this.create_QR_code((err, success) => {
      if (err) {
        return
      }
      if (success.data.status.code === 0) {
        let imgString = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta http-equiv="X-UA-Compatible" content="ie=edge" /><title>Document</title><style>                body {                    margin: 0;                    padding: 0;                    box-sizing: border-box;                    background: #fff;                    font-family:'微软雅黑'                }                .big-box {                    width: 375px;                    height: 600px;                    margin: 0 auto;                }                .big-box>div:nth-of-type(1){height: 450px;}                .bg-box {                    height: 252px;                    position: relative;                }                .box-top {                    display: flex;                    display: -webkit-flex;                    justify-content:flex-start;                    justify-content:-webkit-flex-start;                    padding: 20px 20px 0px 20px;                }                .box-top>section:nth-of-type(2) {                    padding-left: 12px;                }                .box-top p {                    margin: 0;                    padding: 0;                    font-size: 14px;                }                .font-width {                    font-weight: 900                }                .font-widths{                  font-weight: normal                }                .time-color {                    color: #8E8E8E;                }                .bg-image {                    position: absolute;                    width: 320px;                    z-index: 40;                    height: 314px;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .box-Middle {                    width: 250px;                    background: #FFFFFF;                    padding: 10px;                    border-radius: 6px;                    font-size: 12px;                    font-weight: bold;                    color: #202020;                    border: solid 2px #202020;                    margin-top: 10px;                }                .dog-title {                    text-align: center;                    padding: 20px;                    font-size: 12px;                }                .headImage {                    width: 40px;                    height: 40px;                    border: solid 2px #FFBA00;                    border-radius: 50%;                }                .dog_configZ_index {                    z-index: 888;                }                .dog_img {                    width: 320px;                    height: 285px;                    position: absolute;                    z-index: 290;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .dog_clothes {                    position: absolute;                    width: 320px;                    height: 285px;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .dog_food_blow {                    position: absolute;                    width: 320px;                    height: 285px;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .dog_toy {                    position: absolute;                    width: 320px;                    height: 285px;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .dog_food {                    position: absolute;                    width: 320px;                    height: 285px;                    z-index: 200;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .dog_image_url {                    position: absolute;                    width: 320px;                    height: 285px;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .dog_necklace {                    position: absolute;                    width: 320px;                    height: 285px;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .dog_straw_mattress {                    position: absolute;                    width: 320px;                    height: 285px;                    left: 30px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .dog_snacks {                    position: absolute;                    left: 30px;                    width: 320px;                    height: 285px;                    background-size: 100% 100%;                    background-repeat: no-repeat;                }                .bottomDiv {                    display: flex;                    display: -webkit-flex;                    justify-content:flex-start;                    justify-content:-webkit-flex-start;                    background-color: #FFFFFF;                    height: 136px;                    width: 100%;                }                .bottomDiv>div:nth-of-type(1) {                    padding-left: 20px;                                    }                .bottomDiv>div:nth-of-type(1)>img {                    width: 111px;                    height: 111px;                }                .bottomDiv strong {                    font-size: 36px;                    font-weight: bold;                }                .bottomDiv>div:nth-of-type(2) {                    padding-top: 24px;            padding-left: 10px;                }                .bottomDiv>div:nth-of-type(2)>div {                    width: 194px;                    height: 20px;                    font-weight: bold;                    font-size: 8px;                    background-color: #FFDD00;                    border-radius: 30px;                    text-align: center;                    line-height: 20px;                }                                .bottomDiv>div:nth-of-type(1) {                    padding-left: 20px;                                    }                        .bottomDiv>div:nth-of-type(1)>img {                    width: 111px;                    height: 111px;                }                        .bottomDiv strong {                    font-size: 36px;                    font-weight: bold;                }                        .bottomDiv>div:nth-of-type(2) {                    padding-top: 17px;            padding-left: 10px;                }                .bottomDiv>div:nth-of-type(2)>img {                    width: 200px;                    height: 87px;                            }</style></head><body><div class="big-box"><div style="background: linear-gradient(to bottom, #FFDC00 7%,#ffffff 100%);"><div class="box-top"><section><img src="${this.data.shareWordArray.master.head_image}" class="headImage" alt="" srcset="" /></section><section><p class="font-widths">${this.data.shareWordArray.master.nick_name}</p><div class="box-Middle time-color">                  ${this.data.textareaValue}</div></section></div><div class="bg-box"><div class="bg-image" style="background-image: url(https://www.yanggouleme.com/static/pet_dog/scene/background.png)"></div><div class="dog_img dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.dog_type.dog_img})"></div><div class="dog_clothes dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.clothes.image_url})"></div><div class="dog_food " style="background-image: url(${this.data.shareWordArray.dog.food.image_url})"></div><div class="dog_food_blow dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.food_blow.image_url})"></div><div class="dog_toy dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.toys.image_url})"></div><div class="dog_necklace dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.necklace.image_url})"></div><div class="dog_straw_mattress" style="z-index: 280;background-image: url(${this.data.shareWordArray.dog.straw_mattress.image_url})"></div><div class="dog_straw_mattress" style="z-index: 280;background-image: url(${this.data.shareWordArray.dog.straw_mattress.after})"></div><div class="dog_straw_mattress" style="z-index: 300;background-image: url(${this.data.shareWordArray.dog.straw_mattress.before})"></div><div class="dog_snacks dog_configZ_index" style="background-image: url(${this.data.shareWordArray.dog.snacks.image_url})"></div></div><div class="dog-title"><p><span class="font-width">${this.data.shareWordArray.dog.dog_type.type_name}</span><span>&nbsp;&nbsp;${this.data.shareWordArray.dog.dog_type.brief_introduction}</span></p></div></div><div class="bottomDiv"><div><img src="${success.data.result.image_url}" alt="" srcset="" /></div><div><img src="https://www.yanggouleme.com/static/pet_dog/scene/dianji1.png" alt="" srcset="" /></div></div></div></body></html>`
        createImage({ html: imgString })((err, res) => {
          if (err) {
            return
          }
          if (res) {
            wx.navigateTo({
              url: '/pages/poster-generate/poster-generate?img=' + res.data.result.image_url + "&posterDataId=" + this.data.posterData.id+"&title="+this.data.textareaValue,
            })
          }
        })
      }
    })
  },
  create_QR_code(cd) {
    create_QR_code({ posterID: this.data.posterData.id, openID: wx.getStorageSync('openID') })((err, success) => {
      if (err) {
        return
      }
      if (success) {
        cd(err, success)
      }
    })
  }
})


function dates(data) {
  if (data == '' || data == null || data == undefined) {
    return
  } else {
    let da = new Date(data * 1000);
    let year = da.getFullYear() + '年';
    let month = da.getMonth() + 1 + '月';
    let date = da.getDate() + '日';
    return [year, month, date].join('')
  }
}