<template>
    <div  class="sku-lamps-summary-item">
        <img  :src="src" alt="" class="sku-lamps-summary-item-pic">
        <div class="sku-lamps-summary-item-state">{{text}}</div>
        <div class="sku-lamps-summary-item-count">{{count}}</div>
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
  &-pic {
    display: block;
    width: 0.86rem;
    margin: 0 auto;
  }
  &-state {
    color: #666;
    font-size: 0.32rem;
  }
  &-count {
    font-size: 0.48rem;
    font-weight: 700;
  }
  & > div{
    margin-top: 0.2rem;
  }
}
</style>
