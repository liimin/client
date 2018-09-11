<template>
    <li :class="isBig?'line-big':''">{{text}}</li>
</template>

<script>
export default {
    name:'sku-lamp-line-item',
    props:{
        text:[String,Number],
        isBig:Boolean
    }
};
</script>

<style lang="less" scoped>
    .line-big{
        line-height: 1.8rem;
    }
</style>