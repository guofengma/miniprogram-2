import timeout from '../utils/timeout';
import request from '../utils/request';
import clipboard from '../utils/clipboard';
import storage from '../utils/storage';
import scanCode from '../utils/scanCode';

function add0(value) {
  return ('00' + value).slice(-2);
}

function handleReceiving(data) {
  if (!data) {
    return null;
  }
  const notArray = !Array.isArray(data);
  if (notArray) {
    data = [data];
  }
  data.forEach(item => {
    const date = new Date(item.gmtModified || item.gmtCreate);
    item._gmtModified = `${add0(date.getMonth() + 1)}-${add0(date.getDate())} ${add0(date.getHours())}:${add0(
      date.getMinutes()
    )}:${add0(date.getSeconds())}`;
    item._phone = item.phone.replace(/(\d{3})(\d{4})(\d{3})/, '$1****$3');
    item._price = item.price || 0;
    item._color = {0: '', 1: '#5bab60', 2: '#dd2323'}[
      !item.phone && /已领取到最佳前一个红包/.test(item.message) ? 1 : item.status
    ];
  });
  return notArray ? data[0] : data.slice(0, 5);
}

export default {
  scanToken() {
    return new Promise(async (resolve, reject) => {
      try {
        const {result} = await scanCode();
        if (this.likeToken(result)) {
          await storage.setData('token', result);
          return resolve(result);
        }
      } catch (e) {
        console.error(e);
      }
      reject();
    });
  },
  logout() {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '您确定要退出登录吗？',
        content: '退出后需要重新扫码或复制 token 才能进入本页',
        confirmText: '退出',
        cancelText: '点错了',
        success: async res => {
          if (res.confirm) {
            try {
              this._user = null;
              this._token = null;
              await storage.remove('token');
              resolve();
            } catch (e) {
              reject(e);
            }
          }
        },
        fail: reject
      });
    });
  },
  async userReceiving(data) {
    data = await this.request(data ? {url: '/user/receiving', method: 'POST', data} : {url: '/user/receiving'});
    return handleReceiving(data);
  },
  async userRefresh(receivingId) {
    const data = await this.request({url: `/user/receiving/${receivingId}`});
    return handleReceiving(data);
  },
  userAvailable() {
    return this.request({url: '/user/number'});
  },
  async notice() {
    let data = await this.request({url: '/notice.json'});
    if (data.length) {
      // 做下接口兼容
      if (typeof data[0] === 'object') {
        data = data.filter(notice => ['all', 'mp'].includes(notice.type)).map(notice => notice.content);
      }
    }
    return data;
  },
  async zhuangbi() {
    const data = await this.request({url: '/zhuangbi'});
    data.forEach(item => {
      const date = new Date(item.gmtModified);
      item._gmtModified = `${add0(date.getHours())}:${add0(date.getMinutes())}:${add0(date.getSeconds())}`;
    });
    return data;
  },
  async request(options = {}) {
    try {
      if (options.url.indexOf('https') !== 0) {
        options.url = `https://mtdhb.z.xxooweb.com${options.url}`;
      }
      options.header = options.header || {};
      options.header['x-user-token'] = this._token;
      const res = await request(options);
      if (res.code === 0) {
        return res.data || {};
      }
      if (options.url.indexOf('/user') !== -1) {
        wx.showToast({
          title: res.message,
          icon: 'none'
        });
      }
      return Promise.reject(res);
    } catch (e) {
      console.error(e);
      await timeout(3000);
      return this.request(options);
    }
  },
  likeToken(value) {
    return /^[0-9A-Z]{128}$/.test(value);
  },
  async user() {
    if (this._user) {
      return this._user;
    }

    const getUser = async token => {
      try {
        if (!this.likeToken(token)) {
          return;
        }
        this._token = token;
        const user = await this.request({url: '/user'});
        if (user.locked) {
          return wx.showModal({
            content: '您的账号已被封禁',
            showCancel: false
          });
        }
        this._user = user;
        storage.setData('token', token);
        return user;
      } catch (e) {
        console.error(e);
      }
    };

    try {
      const user = (await getUser(await clipboard.getData())) || (await getUser(await storage.getData('token')));
      if (user) {
        return user;
      }
    } catch (e) {}
    return Promise.reject();
  }
};
