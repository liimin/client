<template>
  <div class="search">
    <div class="search-search">
      <!-- 当点击确定按钮时，触发submit事件 -->
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <lm-search-bar></lm-search-bar>
    <div class="search-hotkey" v-show="showKeys">
      <p>热门搜索</p>
      <ul class="search-hotkey-list">
      </ul>
    </div>
  </div>
</template>
<script>
import LmSearchBar from "./SearchBar";
export default {
  name: "LmSearch",
  components: {
    LmSearchBar
  },
  data() {
    return {
      value: "",
      showKeys: false,
      selected: "1",
      // 默认数据
      defaultResult: [
        "Apple",
        "Banana",
        "Orange",
        "Durian",
        "Lemon",
        "Peach",
        "Cherry",
        "Berry",
        "Core",
        "Fig",
        "Haw",
        "Melon",
        "Plum",
        "123",
        "Peanut",
        "Other"
      ],
      slots: [
        {
          flex: 1,
          values: [
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot3",
          textAlign: "left"
        }
      ]
    };
  },
  created() {
    // debug
    // this.getSongs()
  },
  computed: {
    // onchange
    filterResult() {
      return this.defaultResult.filter(value =>
        new RegExp(this.value, "i").test(value)
      );
    }
  },
  methods: {
    // 点击确定按钮时，弹出打印search的值
    onSearch(){
      
    }
  }
};
</script>
<style lang="less">
// @import "~@/assets/style/variable.less";
</style>
<style rel="stylesheet/less" lang="less" scoped>
@import '../../../../public/style/style.less';
.search {
  &-search {
    background-color: @color-primary;
    padding: 10px;
    .mint-search {
      height: auto;
    }
  }
  &-hotkey {
    padding-left: 10px;
    border: 1px solid @color-primary;
    border-radius: 0 0 15px 15px;
    p {
      &:first-child {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 10px;
      }
    }
    &-list {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }
  }
}
</style>