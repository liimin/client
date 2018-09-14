<template>
  <div class="seats" ref="fullpage" id="scrollBody">
    <div  v-for="(item,index) in lampGroup" :key="index+''" class="anchor">
          <sku-lamp  :text="itm.text" :src="itm.src" v-for="(itm,idx) in item" :key="idx+''" />
    </div>
    <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="jump" :option="controllerOption"></page-controller>
  </div>
</template>

<script>
import SkuLamp from "./SkuLamp";
import { PageController } from "@/components";
export default {
  name: "sku-lamp-wrapper",
  props: {
    lampGroup: Array
  },
  components: {
    SkuLamp,
    PageController
  },
  data() {
    return {
      currentPage: 1,
      pageNum: 20,
      arrAnchors:[],
      controllerOption: {
        arrowsType: false,
        navbar: true,
        highlight: true,
        loop: true
      }
    };
  },
  computed: {
      curLamps(){
      return this.lampGroup[this.currentPage]
    }
  },
  methods: {
    changePage(index) {
      fullpage_api.moveTo(`page${index}`);
    },
    jump(index) {
      console.log(index);
      let jump= document.querySelectorAll(".anchor"+index);
      console.log(jump,jump.offsetTop);
      // document.body.scrollTop=this.arrAnchors[index]
document.getElementById('scrollBody').scrollTop = this.arrAnchors[index-1]//jump[0].firstChild.offsetTop
this.currentPage=index;
function scrollToTop(scrollDuration) {
    var cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
    function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        document.getElementById('scrollBody').scrollTop =Math.round(cosParameter + cosParameter * Math.cos(scrollCount));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}
      // // 用 class="d_jump" 添加锚点
      // let jump = document.querySelectorAll(".anchor");
      // let total = jump[index].offsetTop;
      // let distance =
      //   document.documentElement.scrollTop ||
      //   window.pageYOffset ||
      //   document.body.scrollTop;
      // // 平滑滚动，时长500ms，每10ms一跳，共50跳
      // let step = total / 50;
      // console.log(total,distance,step);
      // if (total > distance) {
      //   smoothDown();
      // } else {
      //   let newTotal = distance - total;
      //   step = newTotal / 50;
      //   smoothUp();
      // }
      // function smoothDown() {
      //   if (distance < total) {
      //     distance += step;
      //     document.body.scrollTop = distance;
      //     document.documentElement.scrollTop = distance;
      //     window.pageYOffset = distance;
      //     setTimeout(smoothDown, 10);
      //   } else {
      //     document.body.scrollTop = total;
      //     document.documentElement.scrollTop = total;
      //     window.pageYOffset = total;
      //   }
      // }
      // function smoothUp() {
      //   if (distance > total) {
      //     distance -= step;
      //     document.body.scrollTop = distance;
      //     document.documentElement.scrollTop = distance;
      //     window.pageYOffset = distance;
      //     setTimeout(smoothUp, 10);
      //   } else {
      //     document.body.scrollTop = total;
      //     document.documentElement.scrollTop = total;
      //     window.pageYOffset = total;
      //   }
      // }
    },
    onScroll() {
      let scrolled =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop; // 586、1063分别为第二个和第三个锚点对应的距离
      if (scrolled >= 1063) {
        this.steps.active = 2;
      } else if (scrolled < 1063 && scrolled >= 586) {
        this.steps.active = 1;
      } else {
        this.steps.active = 0;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      let jump = document.querySelectorAll(".anchor");
      let arrAnchors=this.arrAnchors
      for(let i=0 ; i<jump.length;i++){
       jump[i].firstChild && arrAnchors.push((jump[i].firstChild.offsetTop))
        console.log(this.arrAnchors);
      }
      
      // window.addEventListener("scroll", this.onScroll);
    });
    // fullpage_api.moveTo('page2');
  }
};
</script>

<style lang="less" scoped>
.seats {
  width: 100%;
  height:400px;
  overflow-y: scroll
  // display: -webkit-box;
}
</style>