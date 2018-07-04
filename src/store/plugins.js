import createPersistedState from 'vuex-persistedstate';

export default [
  createPersistedState({
    key: 'store',
    storage: {
      getItem: wx.getStorageSync,
      setItem: wx.setStorageSync,
      removeItem: wx.removeStorageSync
    }
  })
];
