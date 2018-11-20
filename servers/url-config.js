// const baseUrl = 'http://10.0.211.144:8000';
const baseUrl = 'https://www.yanggouleme.com';

export default {
  //登录
  loginGetToken: `${baseUrl}/pet/user/login`,
  //获取全世界幸福值
  getAllDog: `${baseUrl}/pet/user/list_master_by_happiness`,
  //获取单个人幸福值
  getSingleDog: `${baseUrl}/pet/user/master_get_dog`,
  //获取主页顶部活动图片
  getActivityLate: `${baseUrl}/pet/user/get_activity_late`,
  //添加收货地址
  setReceivingAddress: `${baseUrl}/pet/user/add_receiving_address`,
  //获取收货地址
  getReceivingAddress: `${baseUrl}/pet/user/list_receiving_address`,
  //获取所有的狗
  getDogInformation: `${baseUrl}/pet/user/dog_information`,
  //判断是否上榜
  getRank: `${baseUrl}/pet/user/get_rank`,
  //获取有没有没有查看的动态
  getPosterNotSee: `${baseUrl}/pet/user/poster_not_see`,
  //
  setAddWinner: `${baseUrl}/pet/user/add_winner`,
  //  获取状态 
  getActivityState: `${baseUrl}/pet/user/get_activity_state`,
  //获取兑奖记录
  getPrizeList: `${baseUrl}/pet/user/prize_list`,
  //获取兑换记录详情
  getWinnerByDetails: `${baseUrl}/pet/user/get_winner_by_id`,
  // 获取兑奖人数列表
  getListWinnerActivity: `${baseUrl}/pet/user/get_winner_by_activity`,
  //狗星写真集头部
  getBeautifulImage: `${baseUrl}/pet/user/beautiful_image`,
  //狗星写真集
  getDogListPoster: `${baseUrl}/pet/user/list_poster`,
  //添加狗
  setAddDog: `${baseUrl}/pet/user/add_dog`,
  //获取单个狗
  getDogByInfo: `${baseUrl}/pet/user/get_dog_by_id`,
  //获取抽狗次数
  getLuckyAndShareTime: `${baseUrl}/pet/user/lucky_and_share_time`,
  //获取抽狗装扮
  getEquip: `${baseUrl}/pet/user/get_equip_id`,
  //卖掉抽取的装扮
  setUpdateDogBone: `${baseUrl}/pet/user/update_dog_bone`,
  //添加装扮狗狗
  setUpdateDogEquip: `${baseUrl}/pet/user/update_dog_equip`,
  //对比装扮
  getCompareEquip: `${baseUrl}/pet/user/compare_equip`,
  //分享获取切换语句、
  getShareword: `${baseUrl}/pet/user/get_share_word`,
  //查看好友帮忙撒的骨头
  getScatterByMaster: `${baseUrl}/pet/user/get_scatter_by_master`,
  //获取好友点进来所有数据
  getPosterById: `${baseUrl}/pet/user/get_poster_by_id`,
  //分享
  setPoster: `${baseUrl}/pet/user/add_poster`,
  //确认分享
  setDeleteUselessPoster: `${baseUrl}/pet/user/delete_useless_poster`,
  //分享进度条
  getShareDogBone: `${baseUrl}/pet/user/get_share_dog_bone`,
  //好友帮忙撒骨头
  setAddScatter: `${baseUrl}/pet/user/add_scatter`,
  //设置用户分享次数
  setShare: `${baseUrl}/pet/user/share`,
  //获取预约状态
  getAppointmentActivity: `${baseUrl}/pet/user/get_appointment_activity`,
  //设置预约
  setAddAppointmentActivity: `${baseUrl}/pet/user/add_appointment_activity`,
  //所有的狗
  getAogInformation: `${baseUrl}/pet/user/dog_information`,
  //获取图片
  getPrizeDetail: `${baseUrl}/pet/user/prize_detail`,
  //更新个人用户信息
  updateMasterInfo: `${baseUrl}/pet/user/update_master_info`,
  //生成海报 
  createImage: `${baseUrl}/pet/user/create_image`,
  //获取二维码
  create_QR_code: `${baseUrl}/pet/user/create_QR_code`,
  //获取个人信息 
  get_master: `${baseUrl}/pet/user/get_master`,

  //修改狗狗名字
  update_name_introduction: `${baseUrl}/pet/user/update_name_introduction`,

  //获取背包信息
  get_equip_depot: `${baseUrl}/pet/user/select_equip_depot`,
  
  //获取单个信息
  get_equip_by_id: `${baseUrl}/pet/user/get_equip_by_id`,
  //批量卖出装扮
  select_equip_depot_num: `${baseUrl}/pet/user/select_equip_depot_num`,
  //批量卖出装扮换骨头值
  batch_sell_equip: `${baseUrl}/pet/user/batch_sell_equip`,
  //单个卖出
  sell_one_equip: `${baseUrl}/pet/user/sell_one_equip`,

  change_equip: `${baseUrl}/pet/user/change_equip`,

  
}
