<template>
  <div>
    <div class="">{{ skuRow.k }}：</div>
    <slot />
  </div>
</template>

<script>
export default{
  name: 'sku-row',
  props: {
    skuRow: Object
  }
};
</script>