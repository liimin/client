<template>
    <div class="bottom-action">
        <van-row>
            <van-col span="12">
                <van-button 
                    v-if="showLeftBtn" 
                    bottom-action 
                    :text="leftText || '我要冠名'" 
                    @click="handleLeftClick" />
            </van-col>
            <van-col span="12">
                <van-button 
                    type="primary" 
                    bottom-action 
                    :text="rightText || '我要供灯'" 
                    @click="handleRightClick" />
            </van-col>
        </van-row>
    </div>
</template>
<script>
import { Row, Col } from "vant";
export default {
  name: "LmBottomActions",
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  props: {
    leftText: String,
    skuEventBus: Object,
    showLeftBtn: Boolean,
    rightText: String,
  },
  methods:{
      handleRightClick(){
          this.$emit('sku-action-right')
      },
      handleLeftClick(){
          this.$emit('sku-action-left')
      }
  }
};
</script>
<style lang="less" scoped>
.botoom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
