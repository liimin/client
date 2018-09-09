<template>
    <div class="van-hairline--bottom van-sku-header">
        <div class="van-sku-header__img-wrap">
            <img :src="goodsImg">
        </div>
        <div class="van-sku-header__goods-info">
            <div class="van-sku__goods-name van-ellipsis">{{ goods.title }}</div>
            <!-- price display area -->
            <slot />
            <van-icon name="close" class="van-sku__close-icon" @click="skuEventBus.$emit('sku:close')" />
        </div>
    </div>
</template>

<script>
export default {
  name: "sku-header",
  props: {
    sku: Object,
    goods: Object,
    skuEventBus: Object,
    selectedSku: Object
  },
  computed: {
    goodsImg() {
      const s1Id = this.selectedSku.s1;
      const skuImg = this.getSkuImg(s1Id);
      // 优先使用选中sku的图片
      return skuImg || this.goods.picture;
    }
  },
  methods: {
    getSkuImg(id) {
      if (!id) return;
      // 目前skuImg都挂载在skuTree中s1那类sku上
      const treeItem =
        this.sku.tree.filter(treeItem => treeItem.k_s === "s1")[0] || {};
      if (!treeItem.v) {
        return;
      }
      const matchedSku = treeItem.v.filter(skuValue => skuValue.id === id)[0];
      if (matchedSku && matchedSku.imgUrl) {
        return matchedSku.imgUrl;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.van-sku-header {
  &__img-wrap {
    position: relative;
    float: left;
    margin-top: -10px;
    width: 80px;
    height: 80px;
    background: #f8f8f8;
    border-radius: 2px;
  }
  &__goods-info {
    padding: 10px 60px 10px 10px;
    min-height: 82px;
    overflow: hidden;
    box-sizing: border-box;
    .van-sku__goods-name {
      font-size: 12px;
    }
    .van-ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .van-sku__goods-price {
      color: #f44;
      margin-top: 10px;
      vertical-align: middle;
      .van-sku__price-symbol {
        vertical-align: middle;
      }
      .van-sku__price-num {
        font-size: 16px;
        vertical-align: middle;
      }
    }
    .van-sku__close-icon {
      top: 10px;
      right: 15px;
      font-size: 20px;
      color: #999;
      position: absolute;
      text-align: center;
    }
  }
}
</style>
