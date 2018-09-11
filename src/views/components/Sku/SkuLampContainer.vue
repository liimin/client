<template>
    <div class="seats">
        <div class="col-list" >
            <ul class="row-list" style="width: 141.3rem; " v-for="(item,index) in lampGroup" :key="index+''">
                <div class="list-item">
                    <sku-lamp  v-for="(itm,idx) in item" :key="idx+''"  :text="itm.text" :src="itm.src"/>
                </div>
            </ul>
        </div>
        <sku-lamp-line :group="lineGroup" />
    </div>
</template>

<script>
import SkuLamp from "./SkuLamp";
import SkuLampLine from "./SkuLampLine";
export default {
  name: "sku-lamp-container",
  props: {
    skuEventBus: Object,
    lampGroup: Array,
    lineGroup: Array
  },
  components: {
    SkuLamp,
    SkuLampLine
  },
  mounted(){
  }
};
</script>

<style lang="less" scoped>
.seats {
  position: relative;
  text-align: center;
  font-size: 0.26rem;
  width: 100%;
  margin-top: 0.5rem;
  overflow: hidden;
  .col-list {
    width: 100%;
    // overflow-x: auto;
    height: 370px;
    overflow: auto;
  }
  .row-list {
    // overflow-y: auto;
    //     height: 368px;
    overflow-y: auto;
  }
  .list-item {
    position: relative;
    width: 100%;
    padding-left: 0.9rem;
  }
}
</style>