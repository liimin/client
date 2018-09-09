<template>
<!-- <transition name="van-fade"> -->
  <div class="hotkey" :show="visible" :class="visible?'enter':'leave'"  @click="onSelect">
    <demo-section>
    <demo-block title="热门搜索">
      <div class="hotkey-hot-search">
         <van-tag  type="success" v-for="item in hotSearch" :key="item.title"><div class="van-ellipsis">{{item.title}}</div></van-tag>
      </div>
    </demo-block>
    <demo-block title="搜索历史">
      <div class="hotkey-history">
        <van-tag  type="success" v-for="item in history" :key="item.title"><div class="van-ellipsis">{{item.title}}</div></van-tag>
      </div>
    </demo-block>
    </demo-section>
  </div>
<!-- </transition> -->
  <!-- :class="visible?'enter':'leave'" -->
  <!-- v-show="visible" -->
</template>
<script>
import { Popup,Row, Col,Icon,Badge, BadgeGroup,Tag } from "vant";
import { DemoBlock, DemoSection } from "@/components";
export default {
  name: "LmSearchHotKeys",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [Icon.name]:Icon,
    [Badge.name]:Badge,
    [Tag.name]:Tag,
    [BadgeGroup.name]:BadgeGroup,
    DemoBlock,
    DemoSection
  },
  props: {
    hotKeyVisible: Boolean,
    history:Array,
    hotSearch:Array
  },
  data() {
    return {
      actions: [
        {
          name: "选项"
        },
        {
          name: "选项",
          subname: "描述信息"
        },
        {
          loading: true
        },
        {
          name: "禁用选项",
          disabled: true
        }
      ]
    };
  },
  computed: {
    visible: {
      set(val) {
        this.$emit("onSelectHotKeyChanged", val);
      },
      get() {
        return this.hotKeyVisible;
      }
    }
  },
  methods: {
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      // this.show = false;
      // Toast(item.name);
      this.$emit("onSelectHotKey", item);
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
@import '../../../../public/style/variable.less';
@height:60%;
.hotkey {
  height: @height;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 1119;
  border-radius: 0 0 5px 5px;
  &-history,&-hot-search{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .van-tag{
      padding: 4px;
      margin: 8px;
      width: 100px;
      animation: TagShow .2s ease;
      line-height: 30px;
    }
  }
}
.enter {
  animation: keyEnter 0.2s ease;
  animation-fill-mode: forwards;
}
.leave {
  animation: keyLeave 0.2s ease;
  animation-fill-mode: forwards;
}
.van-col {
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  margin: 5px;
  background-clip: content-box;
  border: 1px @color-primary solid;
}
@keyframes keyEnter {
  from {
    // transform: translateY(-200px);
    transform: scale(0);
    // height: 0;
    opacity: 0;
    // z-index: 0;
  }
  to {
    //  transform: translateY(0);
    transform: scale(1);
    // height: @height;
    opacity: 1;
      // z-index: 1;
  }
}
@keyframes keyLeave {
  from {
    // transform: translateY(0);
    transform: scale(1);
    // height: @height;
    opacity: 1;
    // z-index: 1;
  }
  to {
    //  transform: translateY(-200px);
    transform: scale(0);
    // height: 0;
    opacity: 0;
    // z-index: 0;
  }
}
@keyframes TagShow {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>