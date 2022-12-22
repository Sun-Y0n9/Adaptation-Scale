<template>
  <div class="wrapper">
    <div class="content" :style="{                                                                                                      width: homeWidth, height: homeHeight, margin: '0 ' + wrapperMargin                                                                                                      }">
      <div class="scaleDom custom" v-bind:style="styleObject">
        <div class="homeItem br" id="echarts1"></div>
        <div class="homeItem br homeItem2"></div>
        <div class="homeItem br homeItem3">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <div class="homeItem homeItem4">
          <img src="https://mobile.amap.com/static/content1Img2.8c69d6ca.png" alt="">
          <img src="https://mobile.amap.com/static/content1Img4.9a248ab6.png" alt="">
        </div>
        <div class="homeItem bt bb br homeItem5">
          <span v-for="(icon, index) in iconArr" :key="icon" title="title" @click="consoleRandom(index)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="icon"></use>
            </svg>
          </span>
        </div>
        <div class="homeItem bt bb br"></div>
        <div class="homeItem bt bb br"></div>
        <div class="homeItem bt bb"></div>
        <div class="homeItem br"></div>
        <div class="homeItem br"></div>
        <div class="homeItem br"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as echarts from 'echarts';
import '@/assets/fonts/iconfont.js';
import { catchClause } from '@babel/types';
const option = {
  title: {
    text: 'Proportion of Browsers',
    subtext: 'Fake Data',
    top: 10,
    left: 10
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    type: 'scroll',
    bottom: 10,
    data: (function () {
      var list = [];
      for (var i = 1; i <= 28; i++) {
        list.push(i + 2000 + '');
      }
      return list;
    })()
  },
  visualMap: {
    top: 'middle',
    right: 10,
    color: ['red', 'yellow'],
    calculable: true
  },
  radar: {
    indicator: [
      { name: 'IE8-', max: 400 },
      { name: 'IE9+', max: 400 },
      { name: 'Safari', max: 400 },
      { name: 'Firefox', max: 400 },
      { name: 'Chrome', max: 400 }
    ]
  },
  series: (function () {
    var series = [];
    for (var i = 1; i <= 28; i++) {
      series.push({
        type: 'radar',
        symbol: 'none',
        lineStyle: {
          width: 1
        },
        emphasis: {
          areaStyle: {
            color: 'rgba(0,250,0,0.3)'
          }
        },
        data: [
          {
            value: [
              (40 - i) * 10,
              (38 - i) * 4 + 60,
              i * 5 + 10,
              i * 9,
              (i * i) / 2
            ],
            name: i + 2000 + ''
          }
        ]
      });
    }
    return series;
  })()
};
export default {
  name: 'HomeView',
  data() {
    return {
      scale: this.getScale(),
      homeWidth: 1920,
      homeHeight: 1080,
      styleObject: {},
      wrapperMargin: 0,
      iconArr: ['#icon-jinzita', '#icon-chifan', '#icon-konglong', '#icon-shouyaoling', '#icon-suliaojimu', '#icon-ertongyi']
    }
  },
  props: {
    width: {
      type: Number,
      default: 1920,
    },
    height: {
      type: Number,
      default: 1080,
    },
  },
  methods: {
    initEcharts1() {
      const echarts1 = echarts.init(document.querySelector('#echarts1'));
      echarts1.setOption(option);
    },
    consoleRandom(index) {
      let niconArr = window.JSON.parse(window.JSON.stringify(this.iconArr));
      let item = niconArr[index];
      niconArr.splice(index, 1);
      niconArr.splice(index === this.iconArr.length - 1 ? 0 : index + 1, 0, item);
      this.iconArr = niconArr;
    },
    getScale() {
      let ww = window.innerWidth / this.width
      let wh = window.innerHeight / this.height
      return ww < wh ? ww : wh
    },
    setScale() {
      let scale = this.getScale()
      this.scale = scale;
      this.styleObject = {
        transform: `scale(${this.scale}, ${this.scale})`,
        width: this.width + "px",
        height: this.height + "px",
      };
      this.homeWidth = this.width * this.scale + 'px';
      this.homeHeight = this.height * this.scale + 'px';
      this.wrapperMargin = (document.documentElement.clientWidth - parseInt(this.homeWidth)) / 2 + 'px';
    },
  },
  mounted() {
    this.setScale();
    this.$nextTick(() => {
      this.initEcharts1();
    })
    window.addEventListener("resize", this.setScale)
  },
  beforeDestroy() {
    window.addEventListener("resize", this.setScale)
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
}

.content {
  position: relative;
}

.scaleDom {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform-origin: 0 0;
}
.homeItem {
  width: 25%;
  height: calc(100% / 3);
  float: left;
}
.custom {
  border: 1px solid aqua;
  border-radius: 5px;
  .homeItem div {
    height: 100%;
  }
  .homeItem2 {
    box-shadow: 0 0 3rem rgba(100,200,255,.5) inset;
  }
  .homeItem3 {
    text-align: center;
    span {
      font-size: 140px;
      color: #999;
      line-height: 140px;
    }
    
  }
  .homeItem4 {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .homeItem5 {
    display: flex;
    align-items: center;
    justify-content: space-around;
    span {
      cursor: pointer;
    }
    .icon {
      font-size: 40px;
    }
  }
}
.bt {
  border-top: 1px solid aqua;
}
.bb {
  border-bottom: 1px solid aqua;
}
.br {
  border-right: 1px solid aqua;
}
</style>
