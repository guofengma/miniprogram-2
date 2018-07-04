<template>
  <view class="wrap">
    <view class="tip">因为美团凉了，目前仅支持贡献饿了么 cookie。不懂如何贡献？或者想查看已贡献的 cookie 列表？请访问网页版</view>
    <form @submit="contributeCookie">
      <textarea class="textarea" name="cookie" v-model="cookie" :maxlength="-1" placeholder="请输入微信或 QQ 小号的 cookie（与手机号、饿了么账号无关）" />
      <button :class="['get', {'get--disabled': !contributeEnable}]" form-type="submit">
        {{contributeEnable ? '贡献小号 cookie' : '正在贡献...'}}
      </button>
    </form>
  </view>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  mounted() {
    this.setContributeEnable(true);
  },
  computed: mapState(['contributeEnable', 'cookie']),
  methods: {
    ...mapActions(['contributeCookie']),
    ...mapMutations(['setContributeEnable'])
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 10px 15px;
}

.cookie {
  display: flex;
  align-items: center;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px dotted #ccc;

  &--first {
    font-weight: bold;
  }

  view {
    flex: 1;
  }
}

.textarea {
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  width: 100%;
  color: #333;
  padding: 12px;
  margin: 10px 0;
  height: 250px;
}

.get {
  color: #fff;
  background-color: #d9534f;
  padding: 15px;
  height: auto;
  border-radius: 4px;
  line-height: 1;
  margin: 15px 0;
  font-size: 15px;

  &--disabled {
    opacity: 0.7;
  }
}

.tip {
  color: #d9534f;
}

.radios {
  display: flex;
  align-items: center;
  padding: 5px 0;

  label {
    margin-right: 10px;
  }
}
</style>
