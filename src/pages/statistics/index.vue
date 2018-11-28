<template>
  <view class="wrap">
    <view class="tip">近七天成功领取最大红包的数据</view>
    <view class="radios">
      <radio-group @change="toggleStatisticsChecked">
        <label>
          <radio :value="0" :checked="statisticsChecked === 0" color="#d9534f" />美团
        </label>
        <label>
          <radio :value="1" :checked="statisticsChecked === 1" color="#d9534f" />饿了么
        </label>
        <label>
          <radio :value="2" :checked="statisticsChecked === 2" color="#d9534f" />饿了么星选
        </label>
      </radio-group>
    </view>

    <ad unit-id="adunit-849cf356f70fa5fc"></ad>

    <view class="list">
      <view class="item item--first">
        <view>日期</view>
        <view>总金额</view>
        <view>红包数量</view>
        <view>平均金额</view>
      </view>
      <block v-if="statisticsChecked === 0">
        <view class="item" v-for="(item, index) in statistics[['meituan', 'ele', 'star'][statisticsChecked]]" :key="index">
          <view>{{item.date}}</view>
          <view>{{item.totalPrice}}</view>
          <view>{{item.count}}</view>
          <view>{{item._avg}}</view>
        </view>
      </block>
      <view v-else class="item--empty">由于只能领到最大前一个，不展示此统计</view>
    </view>
    <view class="rules">
      <view>1. 现在支持了领取到最佳前一个, 那部分领取金额不在统计之内</view>
      <view>2. 统计数据每半小时更新一次</view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  mounted() {
    this.getStatisticsData();
  },
  async onPullDownRefresh() {
    await this.getStatisticsData();
    wx.stopPullDownRefresh();
  },
  computed: mapState(["statistics", "statisticsChecked"]),
  methods: {
    ...mapActions(["getStatisticsData"]),
    ...mapMutations(["toggleStatisticsChecked"])
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 15px;
}

.tip {
  font-weight: bold;
  margin-bottom: 5px;
}

.radios {
  display: flex;
  align-items: center;
  margin: 8px 0;

  label {
    margin-right: 10px;
  }
}

.rules {
  view {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.list {
  padding-bottom: 15px;
}

.item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px dotted #ccc;

  &--first {
    font-weight: bold;
  }

  &--empty {
    text-align: center;
    padding: 15px 0;
    color: #999;
  }

  view {
    flex: 1;
  }
}
</style>
