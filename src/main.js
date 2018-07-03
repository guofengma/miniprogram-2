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
    pages: ['^pages/login/main', 'pages/home/main'],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColor: '#fff',
      navigationBarBackgroundColor: '#d9534f',
      navigationBarTitleText: '一键最佳',
      navigationBarTextStyle: '#333'
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
        }
      ]
    }
  }
};
