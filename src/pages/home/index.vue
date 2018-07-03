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
  padding: 20px 15px;
  overflow-x: hidden;
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
