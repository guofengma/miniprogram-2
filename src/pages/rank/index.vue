<template>
  <view class="wrap">
    <view class="tip">贡献小号数量最多的前 100 名用户</view>
    <view class="radios">
      请选择平台：
      <radio-group @change="toggleRankChecked">
        <label>
          <radio :value="0" :checked="rankChecked === 0" color="#d9534f" />美团
        </label>
        <label>
          <radio :value="1" :checked="rankChecked === 1" color="#d9534f" />饿了么
        </label>
      </radio-group>
    </view>

    <ad unit-id="adunit-962de117f26e0589"></ad>

    <view class="ranks">
      <view class="rank rank--first">
        <view>排名</view>
        <view>uid</view>
        <view>贡献数量</view>
      </view>
      <view class="rank" v-for="(item, index) in rank[rankChecked === 0 ? 'meituan': 'ele']" :key="index">
        <view>{{item.ranking}}</view>
        <view>{{item.userId}}</view>
        <view>{{item.count}}</view>
      </view>
    </view>
    <view class="rules">
      <view class="rule">排行榜数据每半小时更新一次</view>
    </view>
  </view>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  mounted() {
    this.getRankData();
  },
  async onPullDownRefresh() {
    await this.getRankData();
    wx.stopPullDownRefresh();
  },
  computed: mapState(['rank', 'rankChecked']),
  methods: {
    ...mapActions(['getRankData']),
    ...mapMutations(['toggleRankChecked'])
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 10px 15px;
}

.tip {
  font-weight: bold;
}

.rule {
  margin-bottom: 15px;
}

.radios {
  display: flex;
  align-items: center;
  margin: 8px 0;

  label {
    margin-right: 10px;
  }
}

.ranks {
  padding-bottom: 15px;
}

.rank {
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
