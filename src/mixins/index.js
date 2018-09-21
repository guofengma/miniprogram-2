import Vue from 'vue';
import {mapState} from 'vuex';

Vue.mixin({
  computed: mapState(['picture']),
  onShareAppMessage() {
    return {
      title: '一键最佳 mtdhb.org',
      path: '/pages/login/main',
      imageUrl: this.picture[1]
    };
  }
});
