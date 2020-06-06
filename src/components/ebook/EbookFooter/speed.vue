<template>
    <div class="ebook-footer-speed" >
      <div class="read-time"></div>
      <div class="read-setSpeed">
        <span class="icon-back"></span>
        <input
          class="range"
          type="range"
          min="1"
          max="100"
          step="1"
          @change="onProgressChange($event.target.value)"
          @input="onProgressInput($event.target.value)"
          :value="progress"
          :disabled="!bookAvailable"
          ref="propgress"
        >
        <span class="icon-forward"></span>
      </div>
      <div class="read-speed">
        {{bookAvailable ? progress + '%' : '加载中...'}}
      </div>
    </div>
</template>

<script>
import { ebookMixin } from '../../../utils/mixin'
export default {
  mixins: [ebookMixin],
  data () {
    return {
      progress: 0
    }
  },
  methods: {
    /**
     * 松开滑块触发的方法
     */
    onProgressChange (value) {
      this.progress = value
      this.$emit('onProgressChange', this.progress)
    },
    /**
     * 拖动滑块触发的方法
     */
    onProgressInput (value) {
      this.progress = value
      // 让滑块能有2种不同的背景色
      this.$refs.propgress.style.backgroundSize = `${this.progress}% 100%`
    }
  }
}
</script>

<style lang='scss'>
@import "../../../assets/styles/global.scss";
@import "../../../assets/styles/icon.css";
.ebook-footer-speed {
  width: 100%;
  .read {
    &-time,
    &-setSpeed,
    &-speed {
      width: 100%;
      box-sizing: border-box;
      padding: 0 px2rem(10);
    }
    &-time {
      height: px2rem(40);
    }
    &-setSpeed {
      height: px2rem(35);
      font-size: px2rem(22);
      @include center;
      .range {
        flex: 1;
        // 覆盖默认样式
        -webkit-appearance: none;
        height: px2rem(2);
        // 让滑块轨道能有2种不同的背景色
        background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
        background-size: 0 100%;
        &:focus {
          outline: none;
        }
        // 滑块样式
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: white;
          box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
          border: px2rem(1) solid #ddd
        }
      }
    }
    &-speed {
      height: px2rem(15);
      line-height: px2rem(15);
      font-size: px2rem(12);
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #ddd;
    }
  }
}
</style>
