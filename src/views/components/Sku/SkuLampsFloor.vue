<template>
    <div class="sku-lamps-floor">
        <lm-check-button v-for="item in group" :key="item.id" :checked="item.checked" :text="item.text" />
    </div>
</template>

<script>
import {LmCheckButton} from '@/components'
export default {
    name: "sku-lamps-floor",
    props:{
        group:Array
    },
    components: {
        LmCheckButton
    }
}
</script>

<style lang="less" scoped>
.sku-lamps-floor{
      overflow: hidden;
    padding: .4rem .3rem 0;
    font-size: .42rem;
    text-align: center;
    line-height: .88rem;
}
</style>