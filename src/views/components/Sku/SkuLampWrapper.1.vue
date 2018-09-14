<template>
<div class="seats">
  <!-- <swiper :options="swiperOptionh" class="swiper-box">
    <swiper-slide class="swiper-item" v-for="(item,index) in options" :key="index+''"> -->
    <page :currentPage="currentPage" v-for="(item,index) in options" :key="index+''" :options="item">
      <ul class="animate" :style="oStyle">
       <!-- <swiper :options="swiperOptionv">
            <swiper-slide v-for="(itm,idx) in curLamps" :key="idx+''"> -->
              <sku-lamp  :text="itm.text" :src="itm.src" v-for="(itm,idx) in curLamps" :key="idx+''" />
               <!-- </swiper-slide>
            <div class="swiper-pagination swiper-pagination-v" slot="pagination"></div>
          </swiper> -->
      </ul>
    </page>
  <!-- </swiper> -->
    <!-- <page :currentPage="currentPage">
      <h1 class="text-center">二层</h1>
      <section class="animate move-left">
        二层
      </section>
    </page> -->
    <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption"></page-controller>
   <!-- <pagination-control :settings="settings"  @callMethod ="changePage" /> -->
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
import { PaginationControl, PaginationPage } from 'vue-smart-pagination'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import SkuLamp from "./SkuLamp";
import Vue from "vue";
import BScroll from 'better-scroll'
export default {
  name:'sku-lamp-wrapper',
  props:{
    nHeight:Number,
    lampGroup: Array,
  },
   components: {
    Page, 
    PaginationControl,
    PaginationPage,
    swiper,
    swiperSlide,
    PageController,
    SkuLamp
  },
 data() {
    return {
      components:[],
      currentPage: 1,
      options: [],
      swiperOptionv: {
          slidesPerView: 4,
          slidesPerColumn: 4,
          spaceBetween: 2,
          pagination: {
           el: '.swiper-pagination-v',
            clickable: true
          }
      },
      swiperOptionh: {
          direction: 'vertical',
          slidesPerView: 1,
          spaceBetween: 30,
          mousewheel: true,
          pagination: {
            el: '.swiper-pagination-h',
            clickable: true
          }
        },
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
    settings: function () {
      return {
        arrayData: this.options
      }
    },
    curLamps(){
      return this.lampGroup[this.currentPage]
    },
    oStyle(){
      const clientWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return {
        width:Math.ceil(this.lampGroup.length/12)*(clientWidth)+'px',
        height: '100%',
        minWidth: '100%'
      }
    }
  },
  methods: {
    getOptions(index){
     return  {
        index:index+1,
        background: 'rgba(229, 199, 46, 1)',
        color: '#fff',
        isCenter: true,
        afterEnter: afterEnterAnimate,
        beforeLeave: beforeLeaveAnimate
      }
    },
    changePage(index) {
      let $childBefore=this.$children[this.currentPage-1]
      let leaveFunction = $childBefore.options.beforeLeave;
      typeof leaveFunction === 'function' && leaveFunction.call(this, $childBefore);
      // change page
      this.currentPage = index;
      // afterEnter Hook
      let $childNext=this.$children[index - 1]
      // let enterFunction = $childNext.options.afterEnter;
      //  
      this.$nextTick(function() {
        $childNext.$el.querySelector('.animate').classList.remove('move-left', 'move-right');
      //   // typeof enterFunction === 'function' && enterFunction.call(this, $childNext);
      })
    }
  },
  beforeMount(){
    for (let index = 1; index <=this.lampGroup.length; index++) {
      this.options.push({
        index,
        background: 'rgba(229, 199, 46, 1)',
        color: '#000',
        isCenter: true,
        afterEnter: afterEnterAnimate,
        beforeLeave: beforeLeaveAnimate
      })
      // Vue.component('aaa', {
      //   render:function(createElement, context) {
      //       return createElement(
      //           swiper,
      //           {
      //             props:{
      //               options:this.swiperOptionv
      //             }
      //           }[
      //             createElement(swiperSlide)
      //           ]
      //       )
      //     },
      //   })
        // <swiper :options="swiperOptionv">
        //     <swiper-slide v-for="(itm,idx) in curLamps" :key="idx+''">
        //       <sku-lamp  :text="itm.text" :src="itm.src" />
        //       </swiper-slide>
        //     <div class="swiper-pagination swiper-pagination-v" slot="pagination"></div>
        //  </swiper>
    }

  },
  mounted() {
    // this.$nextTick(()=>{
    //   var a =document.getElementsByClassName('animate')[0].style.width
    //   let scroll = new BScroll('.page',{
    //       scrollX: true,
    //       click: false
    //   })
    // })
    // this.$children.forEach((child, index) => {
    //   console.log(child,index);
    //   // 动态设置各个page内的options
    //   if (child.option === null) {
    //     let childOption = this.options[index];

    //     this.$set(childOption, 'index', index + 1);
    //     child.option = childOption;
    //   }
    // });
  }
};
</script>

<style lang="less" scoped>
.seats {
    width: 100%;
    height: 100%;
    // display: -webkit-box;
}
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>