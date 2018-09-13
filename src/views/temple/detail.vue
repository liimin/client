<template>
  <div class="temple-detail">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <div class="temple-detail-container">
      <div class="temple-detail-container-swipe">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="temple-detail-container-info">
          <img v-lazy="image" />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus perspiciatis reiciendis officiis, aut itaque delectus dolorum architecto exercitationem, maiores consequuntur soluta reprehenderit dolore odio quis repudiandae quisquam odit voluptas nemo.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem expedita voluptas natus eligendi nobis porro repellendus at nemo atque voluptate sed magni vitae odit temporibus explicabo error, autem nihil corporis?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit est omnis mollitia quaerat beatae numquam doloremque maxime qui tenetur asperiores repellendus deserunt fugiat dolorum similique, possimus aspernatur odio autem praesentium?
          </div>
      </div>
    </div>
    <div class="temple-detail-submit">
     <lm-sku-action 
        :showLeftBtn="true"
        :skuEventBus="skuEventBus"
        @sku-action-left="handleNamed"
        @sku-action-right="handleLight"
        />
    </div>
     <lm-sku
          v-model="showBase"
          :sku="skuData.sku"
          :goods="skuData.goods_info"
          :goods-id="skuData.goods_id"
          :hide-stock="skuData.sku.hide_stock"
          :quota="skuData.quota"
          :quota-used="skuData.quota_used"
          reset-stepper-on-hide
          reset-selected-sku-on-hide
          disable-stepper-input
          :stepperTitle="skuData.sku.stepper_title"
          :close-on-click-overlay="closeOnClickOverlay"
          :message-config="messageConfig"
          :custom-sku-validator="customSkuValidator"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
        />
  </div>
</template>
<script>
import skuData from './sku';
import { NavBar, Swipe, SwipeItem,Row, Col,Sku} from "vant";
import { LmSkuAction,LmSku } from "../components";
// import { CheckButton } from "@/components";
export default {
  name: "TempleDetail",
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sku.name]: Sku,
    LmSkuAction,
    LmSku,
    // CheckButton
    // DemoBlock,
    // DemoSection
  },
  data() {
     this.skuData = skuData;
    return {
      is_agree:true,
      images: [
        "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg",
        "https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg",
        "https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg",
        "https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg"
      ],
      skuEventBus:null,
      showBase: false,
      closeOnClickOverlay: true,
      initialSku: {
        s1: '30349',
        s2: '1193'
      },
      customSkuValidator: (component) => {
        return '请选择xxx';
      },
      customStepperConfig: {
        quotaText: '单次限购100件',
        stockFormatter: (stock) => `剩余${stock}间`,
        handleOverLimit: (data) => {
          const { action, limitType, quota } = data;
          if (action === 'minus') {
            this.$toast('至少选择一件商品');
          } else if (action === 'plus') {
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              this.$toast(`限购${quota}件`);
            } else {
              this.$toast('库存不够了~~');
            }
          }
        }
      },
      messageConfig: {
        uploadImg: (file, img) => {
          return new Promise(resolve => {
            setTimeout(() => resolve(img), 1000);
          });
        },
        uploadMaxSize: 3
      }
    };
  },
  methods: {
    onBuyClicked(data) {
      this.$toast(JSON.stringify(data));
    },
    onAddCartClicked(data) {
      this.$toast(JSON.stringify(data));
    },
    onPointClicked() {
      this.$toast('积分兑换');
    },
    handleNamed(){

    },
    handleLight(){
      this.showBase=true
    }
  },
  created(){
  //   const skuEventBus=new Vue();
  //   this.skuEventBus=skuEventBus
  //   skuEventBus.$on('action-left', target => {  
  //           console.log(target);  
  //   }); 
  //  skuEventBus.$on('action-right', target => {  
  //         this.showBase=true
  //   });  
  }
};
</script>
<style lang="less">
.temple-detail {
  .van-swipe-item {
    text-align: center;
    img {
      height: 220px !important; 
    }
  }
}
</style>
<style rel="stylesheet/less" lang="less" scoped>
.temple-detail {
  &-container {
    padding:10px;
    &-swipe {
    }
  }
  &-submit{
    position: fixed;
    bottom:0;
    left: 0;
    right: 0;
  }
}
</style>