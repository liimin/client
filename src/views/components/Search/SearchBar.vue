<template>
  <van-tabs v-model="active">
    <van-tab title="地区">
      <van-tree-select v-show='active===0' :items="items" :main-active-index="mainActiveIndex" :active-id="activeId" @navclick="onNavClick" @itemclick="onItemClick" />
    </van-tab>
    <van-tab title="宗教">宗教</van-tab>
    <van-tab title="祈愿">祈愿</van-tab>
  </van-tabs>
</template>
<script>
import { Tabbar, TabbarItem, TreeSelect } from "vant";
export default {
  name: "LmSearchBar",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [TreeSelect.name]: TreeSelect
  },
  data() {
    return {
      active: "",
      items: [
        {
          // 导航名称
          text: "所有城市",
          // 该导航下所有的可选项
          children: [
            {
              // 可选项的名称
              text: "温州",
              // 可选项的id，高亮的时候是根据id是否和选中的id是否相同进行判断的
              id: 1002
            },
            {
              // 可选项的名称
              text: "杭州",
              // 可选项的id，高亮的时候是根据id是否和选中的id是否相同进行判断的
              id: 1001
            }
          ]
        },
        {
          // 导航名称
          text: "湖南",
          // 该导航下所有的可选项
          children: [
            {
              // 可选项的名称
              text: "长沙",
              // 可选项的id，高亮的时候是根据id是否和选中的id是否相同进行判断的
              id: 1003
            },
            {
              // 可选项的名称
              text: "岳阳",
              // 可选项的id，高亮的时候是根据id是否和选中的id是否相同进行判断的
              id: 1004
            }
          ]
        }
      ],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1001
    };
  },
  created() {
    // debug
    // this.getSongs()
  },
  computed: {},
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
</style>