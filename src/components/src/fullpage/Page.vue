<template>
    <section 
        class="page" 
        v-if="options"
        ref="page" 
        :style="{background: options.background,color: options.color||'#fff'}" 
        :class="{'page-before': options.index < currentPage,
                'page-after': options.index > currentPage,
                'page-current': options.index === currentPage}">
        <!-- <div :class="{'all-center': options.isCenter}"> -->
            <slot></slot>
        <!-- </div> -->
    </section>
    <section class="page" v-else>页面正在渲染中。。。</section>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "page",
  props: {
    currentPage: Number,
    options:Object
  },
  data() {
    return {
      option:null
    }
  },
  mounted(){
    this.$nextTick(()=>{
    let scroll = new BScroll(this.$refs.page,{
          scrollX: true,
          click: false
      })
    })
  }
};
</script>

<style>
.page {
  /* overflow-x: scroll; */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.5s ease 0s;
  z-index: 1;
  /* overflow-y: hidden; */
  overflow: hidden;
}
.page-before {
  z-index: 0;
  transform: translate3d(0, -100%, 0);
}
.page-after {
  z-index: 0;
  transform: translate3d(0, 100%, 0);
}
/* 水平、垂直居中 */
.all-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>