<template>
  <div class="wrapper">
    <div class="content"
      :style="{ width: homeWidth, height: homeHeight, margin: '0 ' + wrapperMargin }">
      <div class="scaleDom custom" v-bind:style="styleObject">
        <div class="homeItem bb br">
          <button type="button" class="green">Echarts 例子</button>
          <div class="echarts1 demo"></div>
        </div>
        <div class="homeItem bb br homeItem2">
          <button type="button" class="green">背景图片</button>
        </div>
        <div class="homeItem bb br homeItem3">
          <button type="button" class="green">文字</button>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <div>文字</div>
        </div>
        <div class="homeItem bb homeItem4">
          <button type="button" class="green">图片</button>
          <div class="demo flex">
            <img src="../assets/img/img1.jpg" alt="">
            <img src="../assets/img/img2.jpg" alt="">
          </div>
        </div>
        <div class="homeItem br homeItem5">
          <button type="button" class="green">字体图标</button>
          <div class="demo flex">
            <span v-for="(icon, index) in iconArr" :key="icon" title="title" @click="consoleRandom(index)">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="icon"></use>
              </svg>
            </span>
          </div>
        </div>
        <div class="homeItem br homeItem6">
          <button type="button" class="green">网络字体</button>
          <div class="albbph demo flex">阿里巴巴普惠体</div>
        </div>
        <div class="homeItem br">
          <button type="button" class="green">嵌入iframe</button>
          <div class="demo">
            <iframe src="https://juejin.cn/" frameborder="0"></iframe>
          </div>
        </div>
        <div class="homeItem br">
          <button type="button" class="green">Lottie动效</button>
          <div class="demo lottie">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as echarts from 'echarts';
import '@/assets/iconfont/iconfont.js';
import debounce from "lodash/debounce";
import lottie from 'lottie-web';
import dataJson from '../assets/lottie/data.json';
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
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
      const echarts1 = echarts.init(document.querySelector('.echarts1'));
      echarts1.setOption(option);
    },
    initLottie() {
      const element = document.querySelector('.lottie');
      lottie.loadAnimation({
        container: element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: dataJson
      });
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
      this.initLottie();
    })
    window.addEventListener("resize", debounce(this.setScale, 200))
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
  height: calc(100% / 2);
  float: left;

  button {
    border: 0;
    width: 170px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    padding: 0;
    border-radius: 0;
    color: white;
    outline: none;
    position: relative;
  }

  button:before {
    content: '';
    display: block;
    background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
    background-size: 210% 100%;
    background-position: right bottom;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 0;
    transition: all 1s;
    -webkit-transition: all 1s;
  }

  .green {
    background-image: linear-gradient(to right, #25aae1, #40e495);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
  }

  .green:hover:before {
    background-position: left bottom;
  }
  .demo {
    height: calc(100% - 60px);
    &.flex {
      display: flex;
    align-items: center;
    justify-content: space-around;
    }
  }
}

.custom {
  border: 1px solid transparent;
  border-radius: 5px;

  .homeItem2 {
    background-image: url(../assets/img/tudi.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  }

  .homeItem3 {
    div, span{
      font-size: 140px;
      color: #fff;
    }
    span {
      color: #999;
      line-height: 140px;
    }

  }
  .homeItem4 {
    img {
      width: 200px;
      border-radius: 80px;
    }
  }

  .homeItem5 {

    span {
      cursor: pointer;
    }

    .icon {
      font-size: 40px;
    }
  }
  .homeItem6 {
    .albbph {
    font-family: '阿里巴巴普惠体 2.0 35 Thin';
    font-size: 40px;
    text-align: center;
    align-items: center;
    color: #fff;
  }
  

  }
  iframe {
    width: 100%;
    height: 100%;
  }
}



.bb {
  border-bottom: 1px solid transparent;
}

.br {
  border-right: 1px solid transparent;
}
</style>
