
import { getEquipDepot, selectEquipDepotNum,batchSellEquip } from "../../servers/server";

Page({
  data: {
    menus: [
      { id: 0, name: '全部', isSelect: true, type: 'ALL', },
      { id: 1, name: '衣服', isSelect: false, type: 'CLOTHES', },
      { id: 2, name: '项圈', isSelect: false, type: 'NECKLACE', },
      { id: 3, name: '垫子', isSelect: false, type: 'STRAW_MATTRESS', },
      { id: 4, name: '狗粮', isSelect: false, type: 'FOOD', },
      { id: 5, name: '玩具', isSelect: false, type: 'TOY', },
      { id: 6, name: '零食', isSelect: false, type: 'SNACKS', },
      { id: 7, name: '喂食器', isSelect: false, type: 'FOOD_BLOW', },
    ],
    currentTab: 0,
    showModalStatus: false,
    searchType: "" || "ALL",
    pageLoading: false,
    pageError: false,
    pageEnd: false,
    pages: 1,
    knapsackList: [],
    batchSellingArray:[],
    equipDepotNumData:{}
  },
  onLoad: function (options) {
 
  },
  onShow: function () {
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    this.getEquipDepot((err, success) => {
      if (err) {
        wx.hideLoading()
        this.setData({
          pageLoading: false,
          pageError: true,
          pageEnd: false,
        })
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }
      if (success.length === 0) {
        this.setData({
          pageLoading: false,
          pageError: false,
          pageEnd: true,
          knapsackList: success
        })
      }
      if (success.length != 0) {
        this.setData({
          pageLoading: false,
          pageError: false,
          pageEnd: false,
          knapsackList: success
        })
      }
      wx.hideLoading()
    })
  },
  navbarTap: function (e) {
    this.setData({
      searchType: e.currentTarget.dataset.types,
      currentTab: e.currentTarget.dataset.id,
      pages: 1
    });
    this.getEquipDepot((err, success) => {
      if (err) {
        this.setData({
          pageLoading: false,
          pageError: true,
          pageEnd: false,
        })
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }
      if (success.length === 0) {
        this.setData({
          pageLoading: false,
          pageError: false,
          pageEnd: true,
          knapsackList: success
        })
      }
      if (success.length != 0) {
        this.setData({
          pageLoading: false,
          pageError: false,
          pageEnd: false,
          knapsackList: success
        })
      }
    })
  },
  knapsackDetails(e) {
    wx.navigateTo({ url: "/pages/my-knapsack-details/my-knapsack-details?id=" + e.currentTarget.dataset.id })
  },
  onPullDownRefresh: function () {
    this.setData({
      pageLoading: false,
      pageError: false,
      pageEnd: false,
      pages: 1
    });
    this.getEquipDepot((err, success) => {
      if (err) {
        this.setData({
          pageLoading: false,
          pageError: true,
          pageEnd: false,
        })
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask: true
        })
        wx.stopPullDownRefresh() //停止下拉刷新
        return
      }
      if (success.length === 0) {
        this.setData({
          pageLoading: false,
          pageError: false,
          pageEnd: true,
          knapsackList: success
        })
      }
      if (success.length != 0) {
        this.setData({
          pageLoading: false,
          pageError: false,
          pageEnd: false,
          knapsackList: success
        })
      }
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
  onReachBottom: function () {
    this.setData({
      pageError: false,
      pageEnd: false,
      pageLoading: true,
      pages: this.data.pages + 1
    });
    this.getEquipDepot((err, success) => {
      if (err) {
        this.setData({
          pageLoading: false,
          pageError: true,
          pageEnd: false,
        })
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask: true
        })
        wx.stopPullDownRefresh() //停止下拉刷新
        return
      }
      if (success.length === 0) {
        this.setData({
          pageLoading: false,
          pageError: false,
          pageEnd: true,
        })
      }
      if (success.length != 0) {
        this.setData({
          pageLoading: false,
          pageError: false,
          pageEnd: false,
          knapsackList: this.data.knapsackList.concat(success)
        })
      }
      wx.stopPullDownRefresh() //停止下拉刷新

    })
  },
  clickTop(e) {
    if (this.data.menus[0].isSelect === true) {
      this.setData({
        [`menus[0].isSelect`]: false,
        [`menus[${e.currentTarget.dataset.index}].isSelect`]: !this.data.menus[e.currentTarget.dataset.index].isSelect
      })
    }
    else if (this.data.menus[0].isSelect === false && e.currentTarget.dataset.index === 0) {
      for (const key in this.data.menus) {
        if (this.data.menus.hasOwnProperty(key)) {
          const element = this.data.menus[key];
          this.setData({
            [`menus[${key}].isSelect`]: false
          })
        }
      }
      this.setData({
        [`menus[0].isSelect`]: true
      })
    } else {
      this.setData({
        [`menus[${e.currentTarget.dataset.index}].isSelect`]: !this.data.menus[e.currentTarget.dataset.index].isSelect
      })
    }
    this.getEquipDepotNum();
  },
  getEquipDepot(cb) {
    getEquipDepot({
      equip_types: this.data.searchType,
      page: this.data.pages,
      page_num: 15,
    })((err, success) => {
      if (err) {
        cb(err, null)
        return
      }
      if (success.data.status.code === 0) {
        cb(null, success.data.result)
      } else {
        cb(err, null)
      }
    })
  },
  determine(e) {
    batchSellEquip({
      equip_types:this.data.batchSellingArray,
      dog_bone_num:this.data.equipDepotNumData.dog_bone_num,
    })((err,success)=>{
      if (err) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }
      if (success.data.status.code != 0) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
      if (success.data.status.code === 0) {
        wx.showToast({
          title: "卖出成功",
          icon: 'success',
          duration: 2000,
          mask: true
        })

        this.setData({
          pages: 1
        });
        this.getEquipDepot((err, success) => {
          if (err) {
            this.setData({
              pageLoading: false,
              pageError: true,
              pageEnd: false,
            })
            wx.showToast({
              title: "网络超时,请稍后重试",
              icon: 'none',
              duration: 2000,
              mask: true
            })
            return
          }
          if (success.length === 0) {
            this.setData({
              pageLoading: false,
              pageError: false,
              pageEnd: true,
              knapsackList: success
            })
          }
          if (success.length != 0) {
            this.setData({
              pageLoading: false,
              pageError: false,
              pageEnd: false,
              knapsackList: success
            })
          }
        })
      }
      this.util(e.currentTarget.dataset.statu)
      this.setArray(e.currentTarget.dataset.statu)
    })
  },
  powerDrawer: function (e) {
    if (e.currentTarget.dataset.statu === 'open') {
      this.getEquipDepotNum();
    }
    this.util(e.currentTarget.dataset.statu)
    this.setArray(e.currentTarget.dataset.statu)
  },
  setArray(e) {
    if (e === 'close') {
      for (const key in this.data.menus) {
        if (this.data.menus.hasOwnProperty(key)) {
          const element = this.data.menus[key];
          this.setData({
            [`menus[${key}].isSelect`]: false
          })
        }
      }
    }
    this.setData({
      [`menus[0].isSelect`]: true
    })
  },
  getEquipDepotNum() {
    this.setData({batchSellingArray:[]})
    for (const key in this.data.menus) {
      if (this.data.menus.hasOwnProperty(key)) {
        const element = this.data.menus[key];
        if (element.isSelect === true) {
          this.data.batchSellingArray.push(
            element.type
          ) 
        }
      }
    }
    selectEquipDepotNum({
      equip_types:this.data.batchSellingArray
    })((err, success) => {
      if (err) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }
      if (success.data.status.code != 0) {
        wx.showToast({
          title: "网络超时,请稍后重试",
          icon: 'none',
          duration: 2000,
          mask: true
        })
        return
      }
      if (success.data.status.code === 0) {
        this.setData({
          equipDepotNumData:success.data.result
        })
      }
    })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 250,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(300).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }
})