import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as wxp from '../utils/wxp';
import {Notice, User, Zhuangbi} from '../api';
import {getRecord} from '../api/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 兼容一下旧版用户，后期删掉
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
    record: []
  },
  actions: {
    async getHongbao({state}, event) {
      if (!state.hongbaoEnable) {
        return;
      }
      const {phone, url} = event.target.value;
      // sync data
      this.commit('updateHongbaoForm', {phone, url});
      if (!url) {
        return wx.showToast({
          title: '请填写红包链接',
          icon: 'none'
        });
      }
      try {
        this.commit('setHongbaoEnable', false);
        const record = await User.getRecordList({phone, url});
        this.commit('addRecord', record);
        const getRecord = async () => {
          const res = await User.getRecord(record.id);
          if (res.status === 0) {
            await wxp.timeout(1000);
            return await getRecord();
          }
          this.commit('updateFirstRecord', res);
          this.commit('setHongbaoEnable', true);
          this.commit('setAvailable', await User.getAvailable());
        };
        await getRecord();
      } catch (e) {
        this.dispatch('showError', e);
        this.commit('setHongbaoEnable', true);
      } finally {
        this.commit('setUrl', '');
      }
    },
    async getHongbaoData() {
      try {
        wx.showNavigationBarLoading();
        this.commit('setRecord', await User.getRecordList());
      } catch (e) {
        this.dispatch('showError', e);
      } finally {
        wx.hideNavigationBarLoading();
      }
    },
    async logout() {
      try {
        const {confirm} = await wxp.showModal({
          title: '您确定要退出登录吗？',
          content: '退出后需要重新扫码或复制 token 才能进入本页',
          confirmText: '退出',
          cancelText: '点错了'
        });
        if (confirm) {
          this.dispatch('goLogin');
        }
      } catch (e) {
        this.dispatch('showError', e);
      }
    },
    async copyData(context, data) {
      await wxp.setClipboardData({data});
    },
    showError(context, e) {
      console.error(e);
      wx.showToast({
        title: e.message,
        icon: 'none'
      });
    },
    goLogin() {
      this.commit('setToken', null);
      this.commit('setUser', null);
      wx.reLaunch({url: '/pages/login/main'});
    },
    async goHome({state}) {
      if (!state.token) {
        return;
      }
      wx.reLaunch({url: '/pages/home/main'});
    },
    async getHomeData() {
      try {
        wx.showNavigationBarLoading();
        const [user, zhuangbi, available, notice] = await Promise.all([
          User.getInfo(),
          Zhuangbi.getList(),
          User.getAvailable(),
          Notice.getList()
        ]);
        this.commit('setUser', user);
        this.commit('setZhuangbi', zhuangbi);
        this.commit('setAvailable', available);
        this.commit('setNotice', notice);
      } catch (e) {
        this.dispatch('showError', e);
      } finally {
        wx.hideNavigationBarLoading();
      }
    },
    async loginByClipboard() {
      try {
        const {data = ''} = await wxp.getClipboardData();
        if (data.length !== 128) {
          return;
        }
        await this.dispatch('loginByToken', data);
      } catch (e) {
        console.error(e);
      }
    },
    async loginByScan() {
      try {
        const {result = ''} = await wxp.scanCode();
        if (result.length !== 128) {
          throw wxp.error();
        }
        await this.dispatch('loginByToken', result);
      } catch (e) {
        await wxp.showModal({
          title: '扫描的目标不正确',
          content: '请访问 https://www.mtdhb.com 了解如何使用',
          showCancel: false
        });
      }
    },
    async loginByToken(context, token) {
      try {
        this.commit('setToken', token);
        const user = await User.getInfo();
        if (user.locked) {
          return wxp.showModal({
            title: '您的账号已被封禁',
            content: '想要解封请联系管理员',
            showCancel: false
          });
        }
        this.commit('setUser', user);
        this.dispatch('goHome');
      } catch (e) {
        this.commit('setToken', null);
        await wxp.showModal({
          title: '登录失败',
          content: e.message,
          showCancel: false
        });
      }
    }
  },
  mutations: {
    updateHongbaoForm(state, {url, phone}) {
      state.url = url;
      state.phone = phone;
    },
    setUrl(state, payload) {
      state.url = payload;
    },
    updateFirstRecord(state, payload) {
      state.record[0] = payload;
    },
    addRecord(state, payload) {
      state.record.unshift(payload);
    },
    setHongbaoEnable(state, payload) {
      state.hongbaoEnable = payload;
    },
    setRecord(state, payload) {
      state.record = payload;
    },
    setHongbaoVisible(state, payload) {
      state.hongbaoVisible = payload;
    },
    setNotice(state, payload) {
      state.notice = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setZhuangbi(state, payload) {
      state.zhuangbi = payload;
    },
    setHomeVisible(state, payload) {
      state.homeVisible = payload;
    },
    setAvailable(state, payload) {
      state.available = payload;
    }
  },
  getters: {},
  plugins: [
    createPersistedState({
      key: 'store',
      storage: {
        getItem: wx.getStorageSync,
        setItem: wx.setStorageSync,
        removeItem: wx.removeStorageSync
      }
    })
  ]
});
