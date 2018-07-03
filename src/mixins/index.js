import Vue from 'vue';
import {mapState, mapActions} from 'vuex';

Vue.mixin({
  computed: mapState(['picture']),
  onShow() {
    this.loginByClipboard();
  },
  onShareAppMessage() {
    return {
      title: '一键最佳',
      path: '/pages/home/main',
      imageUrl: this.picture[0]
    };
  },
  methods: mapActions(['loginByClipboard'])
});
