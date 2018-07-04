export default {
  // 兼容一下旧版用户，后期可删掉
  token: wx.getStorageSync('token'),
  user: null,
  url: '',
  phone: '',
  alipay: 'aRhixt096d',
  qqgroup: '617166836',
  picture: [
    'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/03/04/ChMkJ1oJW4iIIAZJAAfcOXA1PHcAAiH8gHsUiYAB9xR139.jpg',
    'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/03/04/ChMkJloJW36IGDpwAAd_V2iVa6wAAiH8gF1_xAAB39v037.jpg',
    'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/03/04/ChMkJ1oJW5SIfKCrAAs6A-fVlFQAAiH8gJQcWwACzob837.jpg'
  ],
  zhuangbi: [],
  available: null,
  notice: [],
  hongbaoEnable: true,
  record: [],
  rankChecked: 0,
  rank: {
    meituan: [],
    ele: []
  },
  contributeEnable: true,
  cookie: ''
}
