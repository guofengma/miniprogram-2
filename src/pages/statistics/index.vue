<template>
  <view class="wrap">
    <view class="tip">成功领取最大红包的总金额</view>
    <view class="radios">
      大红包统计：
      <radio-group @change="toggleStatisticsChecked">
        <label>
          <radio :value="0" :checked="statisticsChecked === 0" color="#d9534f" />美团
        </label>
        <label>
          <radio :value="1" :checked="statisticsChecked === 1" color="#d9534f" />饿了么
        </label>
      </radio-group>
    </view>
    <view class="list">
      <view class="item item--first">
        <view>日期</view>
        <view>总金额</view>
        <view>红包数量</view>
        <view>平均金额</view>
      </view>
      <view class="item" v-for="(item, index) in statistics[statisticsChecked === 0 ? 'meituan': 'ele']" :key="index">
        <view>{{item.date}}</view>
        <view>{{item.totalPrice}}</view>
        <view>{{item.count}}</view>
        <view>{{item._avg}}</view>
      </view>
    </view>
    <view>因为现在支持了领取到最佳前一个, 所以那部分领取不在统计之内</view>
  </view>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  mounted() {
    this.getStatisticsData();
  },
  async onPullDownRefresh() {
    await this.getStatisticsData();
    wx.stopPullDownRefresh();
  },
  computed: mapState(['statistics', 'statisticsChecked']),
  methods: {
    ...mapActions(['getStatisticsData']),
    ...mapMutations(['toggleStatisticsChecked'])
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 10px 15px;
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

  view {
    flex: 1;
  }
}
</style>
