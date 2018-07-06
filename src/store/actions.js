import {Notice, Rank, User, Zhuangbi, Trend} from '../api';
import * as wxp from '../utils/wxp';

export default {
  async getStatisticsData() {
    try {
      wx.showNavigationBarLoading();
      this.commit('setStatistics', await Trend.getList());
    } catch (e) {
      this.dispatch('showError', e);
    } finally {
      wx.hideNavigationBarLoading();
    }
  },
  async contributeCookie({state}, event) {
    if (!state.contributeEnable) {
      return;
    }
    const {cookie} = event.target.value;
    if (!cookie) {
      return wx.showToast({
        title: '请填写小号 cookie',
        icon: 'none'
      });
    }
    try {
      this.commit('setContributeEnable', false);
      await User.addCookie({value: cookie, application: 1});
      wx.showToast({
        title: '贡献成功',
        icon: 'none'
      });
      this.commit('setAvailable', await User.getAvailable());
    } catch (e) {
      this.dispatch('showError', e);
    } finally {
      this.commit('setCookie', '');
      this.commit('setContributeEnable', true);
    }
  },
  async getRankData() {
    try {
      wx.showNavigationBarLoading();
      this.commit('setRank', await Rank.getList());
    } catch (e) {
      this.dispatch('showError', e);
    } finally {
      wx.hideNavigationBarLoading();
    }
  },
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
      const record = await User.getHongbao({phone, url});
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
      this.commit('setUser', null);
      await wxp.showModal({
        title: '登录失败',
        content: e.message,
        showCancel: false
      });
    }
  }
};
