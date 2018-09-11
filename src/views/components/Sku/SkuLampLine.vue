<template>
    <div class="line">
        <div class="line-cover">
            <ul  class="line-list">
                <sku-lamp-line-item v-for="item in group" :key="item.text" :isBig="item.isBig"  :text="item.text" />
            </ul>
        </div>
    </div>
</template>

<script>
import SkuLampLineItem from './SkuLampLineItem'
export default {
    name:'sku-lamp',
    props:{
        group:Array
    },
    components: {
        SkuLampLineItem
    }
};
</script>

<style lang="less" scoped>
 .line {
        position: absolute;
        height: 100%;
        width: .4rem;
        top: 0;
        left: .2rem;
        .line-cover {
            position: absolute;
            width: 100%;
            top: .2rem;
            bottom: .2rem;
            left: 0;
            right: 0;
            background: #000;
            border-radius: .2rem;
            opacity: .2478;
        }
        .line-list {
            position: relative;
            line-height: 1.5rem;
            color: #fff;
            .line-big {
                line-height: 1.8rem;
            }
        }
    }
</style>