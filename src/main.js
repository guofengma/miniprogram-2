import Vue from 'vue';
import App from './app';
import store from './store';
import './mixins';

Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$store = store;

const app = new Vue(App);
app.$mount();

export default {
  config: {
    pages: [
      'pages/contribute/main',
      'pages/home/main',
      'pages/hongbao/main',
      '^pages/login/main',
      'pages/rank/main',
      'pages/statistics/main'
    ],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColor: '#fff',
      navigationBarBackgroundColor: '#d9534f',
      navigationBarTitleText: '一键最佳 mtdhb.com',
      navigationBarTextStyle: '#333',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: '#fff',
      selectedColor: '#fff',
      backgroundColor: '#d9534f',
      borderStyle: 'white',
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/main',
          iconPath: '/static/tab00.png',
          selectedIconPath: '/static/tab01.png'
        },
        {
          text: '领取',
          pagePath: 'pages/hongbao/main',
          iconPath: '/static/tab10.png',
          selectedIconPath: '/static/tab11.png'
        },
        {
          text: '贡献',
          pagePath: 'pages/contribute/main',
          iconPath: '/static/tab20.png',
          selectedIconPath: '/static/tab21.png'
        },
        {
          text: '排行',
          pagePath: 'pages/rank/main',
          iconPath: '/static/tab30.png',
          selectedIconPath: '/static/tab31.png'
        },
        {
          text: '统计',
          pagePath: 'pages/statistics/main',
          iconPath: '/static/tab40.png',
          selectedIconPath: '/static/tab41.png'
        }
      ]
    }
  }
};
