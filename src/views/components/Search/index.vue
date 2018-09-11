<template>
  <div class="search">
    <div class="search-search">
      <!-- 当点击确定按钮时，触发submit事件 -->
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch" @focus="handleSearchFocus">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <lm-search-hot-keys 
          :hotKeyVisible="hotKeyVisible"
          :history="history"
          :hotSearch="hotSearch"
          @onSelectHotKeyChanged="handleSelectHotKeyChanged"
          @onSelectHotKey="handleSelectHotKey"
          ></lm-search-hot-keys>
    <lm-search-bar></lm-search-bar>
  </div>
</template>
<script>
import LmSearchBar from "./SearchBar";
import LmSearchHotKeys from "./HotKeys";
import { mapGetters,mapActions} from "vuex";
export default {
  name: "LmSearch",
  components: {
    LmSearchBar,
    LmSearchHotKeys
  },
  data() {
    return {
      value: "",
      hotKeyVisible: false,
      selected: "1",
    };
  },
  computed: {
    ...mapGetters(['history','hotSearch']),
    // onchange
    filterResult() {
      return this.defaultResult.filter(value =>
        new RegExp(this.value, "i").test(value)
      );
    }
  },
  methods: {
    ...mapActions(['AddHistory']),
    // 点击确定按钮时，弹出打印search的值
    onSearch(){
      if(!this.value){return}
      this.AddHistory({'id':'','title':this.value})
      this.hotKeyVisible=false
    },
    handleSearchFocus(){
      this.hotKeyVisible=true
    },
    handleSelectHotKeyChanged(){
      this.hotKeyVisible=false
    },
    handleSelectHotKey(item){
      console.log(item)
       this.hotKeyVisible=false
    }
  }
};
</script>
<style lang="less">
.search {
  .van-field__control{
    line-height:24px;
  }
  .van-search{
    background-color: rgba(242, 242, 242,.5) !important;
    border-radius: 4px;
  }
}
// @import "~@/assets/style/variable.less";
</style>
<style rel="stylesheet/less" lang="less" scoped>
@import '~@/assets/style/variable.less';
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