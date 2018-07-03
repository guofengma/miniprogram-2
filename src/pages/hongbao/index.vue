<template>
  <view class="wrap">
    <form @submit="getHongbao">
      <view class="label">领最大红包的手机号码</view>
      <input class="input" name="phone" type="number" v-model="phone" :maxlength="11" placeholder="留空支持领到最大前一个红包" />
      <view class="label">美团、饿了么拼手气红包链接</view>
      <textarea class="textarea" name="url" v-model="url" maxlength="-1" placeholder="不懂怎么复制链接？请访问网页版了解" />
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
  </view>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  mounted() {
    this.setHongbaoEnable(true); // 防止上次意外失败，下次进来按钮还是不可点的状态
    this.getHongbaoData();
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
  padding: 10px 15px;
  overflow-x: hidden;
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
  line-height: 1.5;
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
