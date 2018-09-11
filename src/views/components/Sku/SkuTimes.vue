<template>
    <div>
        <check-button v-for="item in group" :key="item" :checked="item.checked" :text="item.text" />
        <sku-time-popup></sku-time-popup>
    </div>
</template>

<script>
    import CheckButton from '@/components'
    import SkuTimePopup from './SkuTimePopup'
    export default {
        name: "sku-times",
        props:{
            group:Array
        },
        components:{
            CheckButton,
            SkuTimePopup
        }
    }
</script>

<style scoped>

</style>