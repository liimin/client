<template>
    <div class="sku-lamps">
        <div class="sku-lamps-header" ref="skuLampsHeader"  flex="box:mean">
            <sku-lamps-summary :group="summaryGroup" @created="handleSummaryCreated"></sku-lamps-summary>
        </div>
        <div class="sku-lamps-body">
            <!-- <van-tabs type="card" ref="skuLampsFloor" @change="handleTabChange">
                <van-tab title="推荐层数">
                   <sku-lamps-floor :group="floorGroup"></sku-lamps-floor>
                </van-tab>
                <van-tab title="全部灯位" />
            </van-tabs> -->
            <!-- <sku-lamp-container :lampGroup="lampGroup" :lineGroup="lineGroup" /> -->
              <sku-lamp-wrapper :lampGroup="lampGroup"></sku-lamp-wrapper>
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
  beforeMount () {
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
  },
  methods:{
    // getLampSeatHeight(){
    //   const clientHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //   const headerHeight=this.$refs.skuLampsHeader.style.height
    //         console.log(headerHeight);
    //   // const floorHeight=this.$refs.skuLampsFloor.$el.clientHeight  
    //   return clientHeight - 126
    // },
    handleTabChange(index){
      this.lampSeatHeight=this.getLampSeatHeight(index)
    },
    handleSummaryCreated(){
      const headerHeight=this.$refs.skuLampsHeader.offsetHeight
    }
  }
};
</script>

<style lang="less" scoped>
@import url('~@/assets/style/variable.less');
.sku-lamps{
  height: 100%;
  &-header,&-body{
    box-shadow: 0 4px 18px 0 #0e0e0e;
    border-radius: 8px;
  }
  &-body{
    height: 80%;
    background-color: #fff;
  }
  &-header{
    height: 20%;
    margin-bottom: .2rem;
  }
}
</style>