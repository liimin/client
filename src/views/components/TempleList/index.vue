<template>
  <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <TempleItem :templeList="templeList"></TempleItem>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import TempleItem from "./TempleItem";
import { List,PullRefresh  } from 'vant';
export default {
  name: "LmTempleList",
  components: {
    TempleItem,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      isRefresh: false,
      templeList: [
        {
          id: "1",
          title: "进口香蕉",
          desc: "约250g，2根",
          price: 200,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
        },
        {
          id: "2",
          title: "陕西蜜梨",
          desc: "约600g",
          price: 690,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: "3",
          title: "美国伽力果",
          desc: "约680g/3个",
          price: 2680,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        }
      ],
      loading: false,
      finished: false
    };
  },
  methods: {
    onRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.templeList = [];
        this.isRefresh = false;
        this.$toast('刷新成功');
      }, 1500);
    },
    onLoad() {
      setTimeout(() => {
        var list = [];
        for (var i = 0; i < 10; i++) {
          list.push({
            id: "3",
            title: "美国伽力果",
            desc: "约680g/3个",
            price: 2680,
            num: 1,
            thumb:
              "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
          });
          this.loading = false;
        }
        this.templeList = this.templeList.concat(list);
      }, 1500);
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
</style>