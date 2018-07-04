<template>
  <view class="wrap">
    <swiper class="zhuangbi" autoplay :interval="3000" circular vertical>
      <swiper-item v-for="(item, index) in zhuangbi" :key="index">
        {{item.mail}} 在 {{item._gmtModified}} 领到
        <text class="zhuangbi__text">{{item.price}}</text>
        元{{item.application === 0 ? '美团' : '饿了么'}}大红包
      </swiper-item>
    </swiper>

    <view class="hello" v-if="user">您好 {{user.mail}} (uid: {{user.id}})</view>

    <view class="breadcrumb">
      <view class="breadcrumb__item" @click="copyData(alipay)">
        复制支付宝红包码
        <button class="breadcrumb__button"></button>
      </view>
      <view class="breadcrumb__split">/</view>
      <view class="breadcrumb__item" @click="logout">
        退出登录
      </view>
    </view>

    <view class="alert alert--info" v-if="available">
      美团 {{available.meituan.available}}/{{available.meituan.total}} 次，饿了么 {{available.ele.available}}/{{available.ele.total}} 次
    </view>

    <view class="alert alert--notice" v-for="(item, index) in notice" :key="index">{{item}}</view>

    <view class="joinGroup">
      <view class="joinGroup__left">
        <image class="joinGroup__wxQrcode" mode="aspectFill" src="/static/wechat.png" />
      </view>
      <view class="joinGroup__right">
        <view>扫码加入微信群</view>
        <view class="joinGroup__qq" @click="copyData(qqgroup)">复制 QQ 群号 {{qqgroup}}</view>
        <view>更多功能，敬请期待</view>
      </view>
    </view>

    <view class="rules">
      <view class="title">领取之前请先阅读规则</view>
      <view>1. 领取一个 “第七个领取的人红包最大” 拼手气红包，最多需要 7 次可消耗次数。以此类推：第 N 个最大，最多需要消耗 N 次。如果该红包之前已被他人领取了 M 次，则消耗 N - M 次。</view>
      <view>2. 每天可消耗的次数为：你贡献的 cookie 数量乘以 5，第二天会自动回满次数，美团和饿了么不通用。</view>
      <view>3. 贡献之后的小号 cookie，不允许自己再拿去点红包，被我们检测之后将被限制领取，要解除限制请联系管理员。</view>
      <view>4. 次数不足以领取大红包，胡乱提交链接者，不仅领不到大红包还可能会产生不必要的次数消耗。</view>
      <view>5. 提交 “最大红包已被领取” 的链接，也可能产生不必要的次数消耗，所以领取前，请确认最大红包还未被人领。</view>
      <view>6. 要领最大红包的手机号，切记不要提前打开红包链接，会领到小红包，无法再领最大，而且会浪费你的次数。</view>
      <view>7. 美团、饿了么限制每个手机号一天只能领 5 个红包，请确保你填写的手机号还可以领，否则会浪费你的次数。</view>
      <view>8. 特别注意，无法领取差一个就是大红包的情况。例如：第七个是最大红包，已经有六个人领了，此时不要使用我们的领取功能。</view>
      <view>9. 我们不能保证 100% 领取成功，会有意外情况，不喜勿用。欢迎提 issue 或者加群反馈给我们，我们也在不断修复问题。</view>
    </view>
  </view>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  mounted() {
    this.getHomeData();
  },
  computed: mapState(['user', 'zhuangbi', 'available', 'alipay', 'qqgroup', 'notice', 'website']),
  methods: mapActions(['getHomeData', 'copyData', 'logout'])
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 15px;
}

.zhuangbi {
  color: rgb(91, 171, 96);
  height: 15px;
  line-height: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;

  &__text {
    color: #d9534f;
  }
}

.rules {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed #ccc;

  .title {
    font-weight: bold;
  }

  view {
    margin-bottom: 8px;
  }
}

.hello {
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
}

.website {
  text-align: center;
  margin-bottom: 15px;
  color: #40a9ff;
}

.breadcrumb {
  display: flex;
  align-items: center;

  &__item {
    position: relative;
    color: #40a9ff;
    padding: 8px 0;
  }

  &__split {
    padding: 0 8px;
    color: rgba(0, 0, 0, 0.45);
  }

  &__button {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}

.alert {
  margin-bottom: 15px;
  border-radius: 4px;
  padding: 8px 15px;

  &--info {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
  }

  &--notice {
    border: 1px dashed #999;
    background-color: #fff;
  }
}

.joinGroup {
  display: flex;

  &__left {
    padding-right: 10px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__qq {
    margin: 8px 0;
    color: #40a9ff;
  }

  &__wxQrcode {
    border-radius: 4px;
    overflow: hidden;
    width: 120px;
    height: 120px;
    display: block;
    margin: 5px auto 0;
  }
}
</style>
