<template>
    <div class="sku-lamps">
        <div class="sku-lamps-header" ref="skuLampsHeader">
            <sku-lamps-summary :group="summaryGroup"></sku-lamps-summary>
        </div>
        <div class="sku-lamps-body">
            <van-tabs type="card" ref="skuLampsFloor" @change="handleTabChange">
                <van-tab title="推荐层数">
                   <sku-lamps-floor :group="floorGroup"></sku-lamps-floor>
                </van-tab>
                <van-tab title="全部灯位" />
            </van-tabs>
            <!-- <sku-lamp-container :lampGroup="lampGroup" :lineGroup="lineGroup" /> -->
            <div>
              <sku-lamp-wrapper :nHeight="lampSeatHeight"></sku-lamp-wrapper>
            </div>
        </div>
    </div>
</template>

<script>
// import SkuLampContainer from './SkuLampContainer'
import SkuLampWrapper from './SkuLampWrapper'
import SkuLampsSummary from "./SkuLampsSummary";
import SkuLampsFloor from "./SkuLampsFloor";
import {Tab, Tabs } from 'vant';
export default {
  name: "sku-lamps",
  props: {
    skuEventBus: Object
  },
  components: {
    SkuLampsSummary,
    SkuLampsFloor,
    // SkuLampContainer,
    SkuLampWrapper,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs
  },
  data() {
    return {
      lampSeatHeight:0,
      minLampSeatHeight:0,
      summaryGroup: [
        {
          text: "剩余位置",
          count: 1,
          src: require("@/assets/images/lamp-off.png")
        },
        {
          text: "已选",
          count: 12,
          src: require("@/assets/images/lamp-checked.png")
        },
        { text: "已售", count: 12, src: require("@/assets/images/lamp-on.png") }
      ],
      floorGroup: [
      ],
      lampGroup:[],
      lineGroup:[]
    };
  },
  computed: {
    
  },
  mounted () {
    let obj=[]
      for (let index = 1; index < 21; index++) {
          this.floorGroup.push({id:index,text:index})
          obj=[]
          for (let idx = 1; idx < 21; idx++) {
            obj.push({text:`${index}-${idx}`,src:require("@/assets/images/lamp-off.png")})
          }
          this.lampGroup[index]=obj
          this.lineGroup.push({isBig:false,text:index})
      }
      this.lampSeatHeight=this.getLampSeatHeight()
  },
  methods:{
    getLampSeatHeight(isMin){
      const clientHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const headerHeight=this.$refs.skuLampsHeader.offsetHeight
      const floorHeight=this.$refs.skuLampsFloor.$el.offsetWidth
      if(isMin){
         return +clientHeight - +headerHeight
      }
      return +clientHeight - +headerHeight- +floorHeight
    },
    handleTabChange(index){
      this.lampSeatHeight=this.getLampSeatHeight(index)
    }
  }
};
</script>

<style lang="less" scoped>
</style>