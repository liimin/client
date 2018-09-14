<template>
<div class="seats" ref="fullpage">
  <ul id="myMenu">
 <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section fp-auto-height">
      Second section ...
      <div style="height:1000px;width:100%;border:1px solid #ccc;">
        1111
      </div>
    </div>
    <div class="section">
      Second section ...
     
    </div>
  </full-page>
  </ul>
  <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption"></page-controller>
</div>
</template>

<script>

import SkuLamp from "./SkuLamp";
import {PageController} from "@/components";
export default {
  name:'sku-lamp-wrapper',
  props:{
    lampGroup: Array,
  },
   components: {
    SkuLamp
  },
 data() {
    return {
      currentPage: 1,
      pageNum:20,
       options: {
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3'],
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec'],
        licenseKey:'OPEN-SOURCE-GPLV3-LICENSE',
        fadingEffect:true,
        // navigation:true,
        scrollOverflow:true,
        // fitToSection:false,
        //  autoScrolling:false, 
        // bigSectionsDestination:bottom
      },
       controllerOption: {
        arrowsType: false,
        navbar: true,
        highlight: true,
        loop: true
      }
    }
  },
  methods: {
   changePage(index) {
     fullpage_api.moveTo(`page${index}`);
   }
   
  },
  components:{
    PageController
  },
  mounted(){
    // fullpage_api.moveTo('page2');
  }
};
</script>

<style lang="less" scoped>
.seats {
    width: 100%;
    height: 100%;
    // display: -webkit-box;
}
</style>