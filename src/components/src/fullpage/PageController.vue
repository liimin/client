<template>
    <nav class="controller">
        <button v-if="option.arrowsType" class="prev-btn" :class="{moving:option.arrowsType === 'animate'}" @click="changePage(prevIndex)"></button>
        <ul v-if="option.navbar">
            <!-- <li data-index="1" class="controller-item"  v-show="currentPage>5">1</li> -->
             <!-- <li class="controller-item"  v-show="efont">...</li> -->
            <li v-for="index in indexs" @click="changePage(index)" :class="{current:option.highlight && index === currentPage}" :key="'controller-'+(index || Math.random())" :data-index="index" class="controller-item">
                <span v-if="index">{{index}}</span>
               <span v-else class="dot">...</span>
            </li>
            <!-- <li class="controller-item"  v-show="efont&&currentPage<pageNum-4">...</li> -->
             <!-- <li class="controller-item"  v-show="currentPage<pageNum-1">{{pageNum}}</li> -->
        </ul>
           
        <button v-if="option.arrowsType" class="next-btn" :class="{moving:option.arrowsType === 'animate'}" @click="changePage(nextIndex)"></button>
    </nav>
</template>

<script>
export default {
  name: 'page-controller',
  props: {
    pageNum: Number,
    currentPage: Number,
    option: {
      type: Object,
      default: {
        arrowsType: 'animate',
        navbar: true,
        highlight: true,
        loop: true        //是否开启滚动循环
      }
    }
  },
  methods: {
    changePage (index) {
      this.$emit('changePage', index);
    }
  },
  computed: {
     efont: function() { 
        if (this.pageNum <= 7) return false; 
        return this.currentPage > 5 
      },
    nextIndex () {
      if (this.currentPage === this.pageNum) {
        if(this.option.loop){
            return 1
          }else{
            return this.pageNum
          }
      } else {
        return this.currentPage + 1;
      }
    },
    prevIndex () {
      if (this.currentPage === 1) {
        if(this.option.loop){
            return this.pageNum
          }else{
            return 1
          }
      } else {
        return this.currentPage - 1;
      }
    },
    indexs: function() { 
    //     var left = 1, 
    //     right = this.pageNum, 
    // ar = []; 
    // if (this.pageNum >= 7) { 
    //         if (this.currentPage > 5 && this.currentPage < this.pageNum - 4) { 
    //         left = Number(this.currentPage) - 3; 
    //         right = Number(this.currentPage) + 3; 
    //       } else { 
    //         if (this.currentPage <= 5) { 
    //           left = 1; 
    //           right = 7; 
    //         } else { 
    //           right = this.pageNum; 
  
    //           left = this.pageNum - 6; 
    //         } 
    //       } 
    //     } 
    //     while (left <= right) { 
    //       ar.push(left); 
    //       left++; 
    //     } 
    //     return ar; 
    //   }
    let pageNum = this.pageNum; // 总页数
             let index = this.currentPage; // 当前页
             let arr = [];
             if (pageNum <= 6) {
                 for (let i = 1; i <= pageNum; i++) {
                     arr.push(i)
                }
                 return arr
             }
             // 对页码显示进行处理，动态展示
            if (index <= 3) return [1, 2, 3, 4, 0, pageNum];
             if (index >= pageNum - 1) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
             if (index === 4) return [1, 2, 3, 4, 5, 0, pageNum];
             if (index === pageNum - 2) return [1, 0, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
             return [1, 0, index - 2,index - 1, index, index + 1, index + 2, 0, pageNum];
    }
  },
  created () {
    if (this.option.navbar === undefined) {
      this.option.navbar = true;
    }
  },
  mounted () {
    let _this = this;
    let timer = null;
    let start = 0;
    // 滚轮处理
    function scrollHandler (direction) {
      // 防止重复触发滚动事件
      if (timer != null) {
        return;
      }
      if (direction === 'down') {
        _this.changePage(_this.nextIndex);
      } else {
        _this.changePage(_this.prevIndex);
      }
      timer = setTimeout(function() {
        clearTimeout(timer);
        timer = null;
      }, 300);
    }
    // if (Object.hasOwnProperty.call(window,'onmousewheel')) {
    if (Object.hasOwnProperty.call(window,'onmousewheel')) {
      // 监听滚轮事件
      window.addEventListener('mousewheel',function (event) {   // IE/Opera/Chrome
        let direction = event.wheelDelta > 0 ? 'up':'down';
        scrollHandler(direction);
      },false);
    } else {
      window.addEventListener('DOMMouseScroll',function (event) {   // Firefox
        let direction = event.detail > 0 ? 'up':'down';
        scrollHandler(direction);
      },false);
    }
    // 移动端触摸事件处理
    window.addEventListener('touchstart', function (event) {
      start = event.touches[0].clientY;
    })
    window.addEventListener('touchmove', function (event) {
      event.preventDefault();
    })
    window.addEventListener('touchend', function (event) {
      let spacing = event.changedTouches[0].clientY - start;
      let direction;      
      if (spacing > 50) {
        direction = 'up';
        scrollHandler(direction);
      } else if (spacing < -50) {
        direction = 'down';
        scrollHandler(direction);
      }
    })
  }
}
</script>

<style scoped lang="less">
@import url('~@/assets/style/variable.less');
.controller {
    position: absolute;
    right: 0.4rem;
    top: 50%;
    z-index: 99;
}
.controller ul {
    transform: translate3d(0,-50%,0);
    list-style: none;
    margin: 0;
    padding: 0;
}
.controller-item {
    cursor: pointer;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    margin-top: 0.2rem;
    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease 0s;
    text-align: center;
    line-height: 0.4rem;
    color: #fff;
    span.dot{
          float: left;
    margin: -4px 0 0 5px;
    }
}
.controller-item:hover {
    background-color: rgba(255, 255, 255, 0.7);
}
.controller-item.current {
    background-color: rgba(0, 0, 0, .8);
    color:@color-primary;
}
.prev-btn,.next-btn {
  cursor: pointer;
  display: block;
  text-align: center;
  width: 0.4rem;
  height: 0.4rem;
  position: fixed;
  left: 50%;
  margin-left: -0.2rem;
  border: 0.08rem solid #fff;
  background-color: transparent;
  outline: none;
}
.prev-btn {
  top: 0.16rem;
  transform: rotate(-45deg);
  border-bottom-color: transparent;
  border-left-color: transparent;
}
.next-btn {
  bottom: 0.16rem;
  transform: rotate(45deg);
  border-top-color: transparent;
  border-left-color: transparent;
}
.prev-btn.moving {
  animation: prev-up-down 0.7s linear 0s infinite;
}
.next-btn.moving {
  animation: next-up-down 0.7s linear 0s infinite;
}
@keyframes next-up-down {
  0% {
    transform: translate3d(0,0,0) rotate(45deg);
  }
  25% {
    transform: translate3d(0,0.12rem,0) rotate(45deg);
  }
  50% {
    transform: translate3d(0,0,0) rotate(45deg);
  }
  75% {
    transform: translate3d(0,-0.12rem,0) rotate(45deg);
  }
  100% {
    transform: translate3d(0,0,0) rotate(45deg);
  }
}
@keyframes prev-up-down {
  0% {
    transform: translate3d(0,0,0) rotate(-45deg);
  }
  25% {
    transform: translate3d(0,-0.12rem,0) rotate(-45deg);
  }
  50% {
    transform: translate3d(0,0,0) rotate(-45deg);
  }
  75% {
    transform: translate3d(0,0.12rem,0) rotate(-45deg);
  }
  100% {
    transform: translate3d(0,0,0) rotate(-45deg);
  }
}
</style>