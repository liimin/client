<template>
<div class="seats" :style="oStyle">
    <page :currentPage="currentPage">
      <h1 class="text-center">项目介绍</h1>
      <section class="animate" ref="section1">
       项目介绍
      </section>
    </page>
    <page :currentPage="currentPage">
      <h1 class="text-center">配置说明</h1>
      <section class="animate move-left">
        配置说明
      </section>
    </page>
    <page :currentPage="currentPage">
      <h1 class="text-center">方法说明</h1>
      <section class="animate move-left">
        方法说明
      </section>
    </page>
    <page :currentPage="currentPage">
      <h1 class="text-center">作者信息</h1>
      <section class="animate move-left">
       作者信息
      </section>
    </page>
    <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption"></page-controller>
  </div>
</template>

<script>
// 页面进出动画
function afterEnterAnimate($child) {
  $child.$el.querySelector('.animate').classList.remove('move-left', 'move-right');
}
function beforeLeaveAnimate($child) {
  let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right';
  $child.$el.querySelector('.animate').classList.add(moveType);
}

import {Page,PageController} from "@/components";
export default {
  name:'sku-lamp-wrapper',
  props:{
    nHeight:Number
  },
 data() {
    return {
      currentPage: 1,
      options: [{
        background: 'rgba(229, 199, 46, 1)',
        color: '#fff',
        isCenter: true,
        afterEnter: afterEnterAnimate,
        beforeLeave: beforeLeaveAnimate
      }, {
        background: 'rgba(79, 204, 76, 1)',
        color: '#fff',
        isCenter: true,
        afterEnter: afterEnterAnimate,
        beforeLeave: beforeLeaveAnimate
      }, {
        background: 'rgba(233, 84, 84, 1)',
        color: '#fff',
        isCenter: true,
        afterEnter: afterEnterAnimate,
        beforeLeave: beforeLeaveAnimate
      }, {
        background: 'rgba(46, 153, 229, 1)',
        color: '#fff',
        isCenter: true,
        afterEnter: afterEnterAnimate,
        beforeLeave: beforeLeaveAnimate
      }],
      controllerOption: {
        arrowsType: false,
        navbar: true,
        highlight: true,
        loop: true
      }
    }
  },
  computed: {
    // 总page数
    pageNum() {
      return this.options.length;
    },
    oStyle(){
      console.log(this.nHeight);
      return {
        height:this.nHeight+'px'
      }
    }
  },
  methods: {
    changePage(index) {
      // beforeLeave Hook
      let beforeIndex = this.currentPage - 1;
      let leaveFunction = this.options[beforeIndex].beforeLeave;
      typeof leaveFunction === 'function' && leaveFunction.call(this, this.$children[beforeIndex]);
      // change page
      this.currentPage = index;
      // afterEnter Hook
      let nextIndex = index - 1;
      let enterFunction = this.options[nextIndex].afterEnter;
      this.$nextTick(function() {
        typeof enterFunction === 'function' && enterFunction.call(this, this.$children[nextIndex]);
      })
    }
  },
  components: {
    Page, 
    PageController
  },
  mounted() {
    this.$children.forEach((child, index) => {
      // 动态设置各个page内的options
      if (child.option === null) {
        let childOption = this.options[index];
        this.$set(childOption, 'index', index + 1);
        child.option = childOption;
      }
    });
    console.log(this.oStyle);
  }
};
</script>

<style lang="less" scoped>
.seats {
    overflow: hidden;
    position: relative;
    width: 100%;
}
</style>