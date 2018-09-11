<template>
  <section class="van-doc-demo-block">
    <h2 class="van-doc-demo-block__title">{{ title }}</h2>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'van-doc-demo-block',
  props: {
    title: String
  }
};
</script>

<style lang="less">
@import '~@/assets/style/variable.less';
.van-doc-demo-block {
  &__title {
    margin: 0;
    font-weight: bolder;
    font-size: 14px;
    color: #ccc;
    padding: 0 8px 0;
  }
  &:first-of-type {
    .van-doc-demo-block__title {
     // padding-top: 20px;
    }
  }
}
</style>