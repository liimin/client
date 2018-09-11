<template>
    <div  class="sku-lamps-summary-item">
        <img  :src="src" alt="" class="sku-lamps-summary-item-pic">
        <p  class="sku-lamps-summary-item-state">{{text}}</p>
        <p  class="sku-lamps-summary-item-count">{{count}}</p>
    </div>
</template>

<script>
export default {
  name: "sku-lamps-summary-item",
  props: {
    src: String,
    text: String,
    count: [String, Number]
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.sku-lamps-summary-item {
  text-align: center;
  padding-top: 0.24rem;
  &-pic {
    display: block;
    width: 0.86rem;
    margin: 0 auto;
  }
  &-state {
    color: #666;
    line-height: 0.44rem;
    font-size: 0.32rem;
  }
  &-count {
    line-height: 0.6rem;
    font-size: 0.44rem;
    font-weight: 700;
    padding: 0.08rem 0 0.3rem;
  }
}
</style>
