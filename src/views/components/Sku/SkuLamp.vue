<template>
    <li class="row-item mr-lg row-item-big">
        <img :src="src" alt="">
        <p>{{text}}</p>
    </li>
</template>

<script>
export default {
  name: "sku-lamp",
  props: {
    src: String,
    text: [String, Number]
  }
};
</script>

<style lang="less" scoped>
.row-item {
  float: left;
  width: 1rem;
  & p {
    line-height: 0.36rem;
    padding-bottom: 0.14rem;
        text-align: center;
  }
  &.row-item-big {
    width: 2.3rem;
    padding: 0 0.5rem;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>