export default {
  setStatistics(state, payload) {
    state.statistics = payload;
  },
  setCookie(state, payload) {
    state.cookie = payload;
  },
  setRank(state, payload) {
    state.rank = payload;
  },
  setContributeEnable(state, payload) {
    state.contributeEnable = payload;
  },
  toggleStatisticsChecked(state, event) {
    state.statisticsChecked = Number(event.target.value);
  },
  toggleRankChecked(state, event) {
    state.rankChecked = Number(event.target.value);
  },
  updateHongbaoForm(state, { url, phone }) {
    state.url = url;
    state.phone = phone;
  },
  addHistoryPhone(state, payload) {
    state.historyPhone = state.historyPhone.filter(phone => phone !== payload);
    state.historyPhone.unshift(payload);
    state.historyPhone = state.historyPhone.slice(0, 100);
  },
  setForceGet(state, payload) {
    state.forceGet = payload;
  },
  setUrl(state, payload) {
    state.url = payload;
  },
  setPhone(state, payload) {
    state.phone = payload;
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
};
