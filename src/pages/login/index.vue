<template>
  <view class="wrap" v-if="!token">
    <image mode="aspectFill"
           v-for="(item, index) in picture"
           :key="index"
           :src="item"
           @click="loginByScan" />
  </view>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  mounted() {
    this.goHome();
  },
  onShow() {
    this.loginByClipboard();
  },
  computed: mapState(['token', 'picture']),
  methods: mapActions(['goHome', 'loginByScan', 'loginByClipboard'])
};
</script>

<style lang="less" scoped>
.wrap {
  image {
    margin-bottom: 5px;
  }
}
</style>
