<template>
    <div class="sku-lamps-summary  m-md" flex="box:mean">
        <sku-lamps-summary-item v-for="item in group" :key="item.text" :text="item.text" :count="item.count" :src="item.src" />
    </div>
</template>

<script>
    import SkuLampsSummaryItem from './SkuLampsSummaryItem'
    export default {
        name: "sku-lamps-summary",
        props:{
            group:Array
        },
        components:{
           SkuLampsSummaryItem
        }
    }
</script>

<style scoped>
.sku-lamps-summary{
display: flex;
        background: #fff;
    /* box-shadow: 0 4px 18px 0 #b5ae85; */
    border-radius: 8px;
}
</style>