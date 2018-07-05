<template>
  <view class="wrap">
    <form @submit="getHongbao">
      <view class="label">领最大红包的手机号码</view>
      <input class="input" name="phone" type="number" v-model="phone" :maxlength="11" placeholder="留空支持领到最大前一个红包" />
      <view class="label">美团、饿了么拼手气红包链接</view>
      <textarea class="textarea" name="url" v-model="url" :maxlength="-1" placeholder="不懂怎么复制链接？请到页面底部查看方法" />
      <button :class="['get', {'get--disabled': !hongbaoEnable}]" form-type="submit">
        {{hongbaoEnable ? '领取手气最佳红包' : '正在领取红包...'}}
      </button>
    </form>
    <view class="list">
      <view class="item" v-for="(item, index) in record" :key="index">
        <view class="time">{{item._gmtModified}}</view>
        <view class="price">{{item.status === 1 ? item._price : 0}}</view>
        <view class="other">
          <view class="phone">[{{item.application === 0 ? '美' : '饿'}}] {{item._phone || '未填手机号'}}</view>
          <view class="message" :style="{color: item._color}">
            {{item.status === 0 ? '正在领取红包...' : item.status === 1 ? '领取成功（请以实际到账金额为准）': item.message}}
          </view>
        </view>
      </view>
    </view>
    <view class="rules">
      <view class="rule">
        <view class="title">红包链接说明</view>
        <view>1. 饿了么红包：https://h5.ele.me/hongbao/ 开头的链接。链接不带 lucky_number 的不是拼手气，不能用。</view>
        <view>2. 美团红包：https://activity.waimai.meituan.com/coupon/ 开头的链接。</view>
        <view>3. 短链接：https://url.cn/ 开头的链接。</view>
      </view>
      <view class="rule">
        <view class="title">如何获取拼手气红包？</view>
        <view>1. 好友下单后，分享到群里的红包。</view>
        <view>2. 饿了么 APP 买过的订单点进去，分享红包。</view>
      </view>
      <view class="rule">
        <view class="title">如何复制红包链接？</view>
        <view>1. 分享到 QQ，选择 “我的电脑”，PC 版 QQ 复制链接。</view>
        <view>2. 分享到微信，PC 版微信右键用浏览器打开，复制链接。</view>
        <view>3. 长按微信分享的卡片 - 点击更多 - 发送邮件 - 复制链接。（如果看不到链接，在微信的设置 - 通用 - 功能 - 开启邮箱提醒）</view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  mounted() {
    this.setHongbaoEnable(true);
    this.getHongbaoData();
  },
  async onPullDownRefresh() {
    this.setHongbaoEnable(true);
    await this.getHongbaoData();
    wx.stopPullDownRefresh();
  },
  computed: mapState(['url', 'phone', 'record', 'hongbaoEnable']),
  methods: {
    ...mapActions(['getHongbaoData', 'getHongbao', 'copyData']),
    ...mapMutations(['setHongbaoEnable'])
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 0 15px;
}

.rules {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed #ccc;

  .rule {
    margin-bottom: 15px;

    .title {
      font-weight: bold;
    }

    view {
      margin-bottom: 8px;
    }
  }
}

.input,
.textarea {
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  width: 100%;
  color: #333;
}

.input {
  line-height: 1;
  height: 40px;
  padding: 0 12px;
}

.textarea {
  padding: 12px;
  margin: 15px 0;
}

.label {
  margin: 10px 0;
  font-weight: bold;
}

.item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-top: 1px dotted #ccc;
  text-align: center;
}

.time {
  font-family: Aarial;
  width: 50px;
}

.get {
  color: #fff;
  background-color: #d9534f;
  padding: 15px;
  height: auto;
  border-radius: 4px;
  line-height: 1;
  margin-bottom: 15px;
  font-size: 15px;

  &--disabled {
    opacity: 0.7;
  }
}

.price {
  width: 80px;
  padding: 0 20px;
}

.other {
  text-align: left;
  flex: 1;
}
</style>
