<template>
    <div class="ebook-footer-box">
        <transition name="fade-up">
            <div class="ebook-footer-fontSize" v-if="setNum === 0">
                <div class="setSizeBox">
                    <div class="min-size" :style="`fontSize: ${fontSizeList[0].fontSize}px`">A</div>
                    <div class="sizeList">
                      <div class="select-wrapper" @click="setFontSize(index)" v-for="(item, index) in fontSizeList" :key="item.fontSize">
                        <div class="line"></div>
                        <div class="point-wrapper">
                          <div class="point" v-show="defaultFontSize === item.fontSize">
                            <div class="small-point"></div>
                          </div>
                        </div>
                        <div class="line"></div>
                      </div>
                    </div>
                    <div class="max-size" :style="`fontSize: ${fontSizeList[fontSizeList.length-1].fontSize}px`">A</div>
                </div>
                <div class="setFamilyBox"></div>
            </div>
        </transition>
        <transition name="fade-up">
            <div class="ebook-footer-setTheme" v-if="setNum === 1">
              <div class="themeItem" @click="selectThemes(item)" v-for="item in themeList" :key="item.name">
                <div class="themeItem-bgc" :style="defaultTheme === item.name ? `border: 2px solid #5e6369; background:${item.style.body.background}` : `background:${item.style.body.background}`"></div>
                <div :class="defaultTheme === item.name ? 'themeItem-name fontStyle' : 'themeItem-name'">{{item.title}}</div>
              </div>
            </div>
        </transition>
        <transition name="fade-up">
            <div class="ebook-footer-speed" v-if="setNum === 2">
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
        </transition>
        <div class="ebook-footer-memu" :style="isShowFontSize ? 'boxShadow: none' : ''">
            <span class="icon-menu"></span>
            <span class="icon-progress" @click="showSettingsBar(2)"></span>
            <span class="icon-bright" @click="showSettingsBar(1)"></span>
            <span class="icon-A" @click="showSettingsBar(0)"></span>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isShowFontSize: false,
      fontSize: 0,
      setNum: -1,
      progress: 0
    }
  },
  props: {
    // 是否加载完毕电子书，为加载完毕不能移动滑块
    bookAvailable: {
      type: Boolean,
      default: false
    },
    // 字号列表
    fontSizeList: {
      type: Array,
      default: () => []
    },
    // 默认字号
    defaultFontSize: Number,
    // 主题列表
    themeList: {
      type: Array,
      default: () => []
    },
    // 默认主题
    defaultTheme: String
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
    },
    /**
     * 显示设置栏
     * @param Number 显示设置栏编号
     */
    showSettingsBar (setNum) {
      if (this.setNum === setNum) return
      this.isShowFontSize = true
      if (this.setNume === -1) {
        this.setNume = setNum
        return
      }
      this.setNum = -1
      setTimeout(() => {
        this.setNum = setNum
      }, 400)
    },
    /**
     * 设置主题
     * @param String 选中的主题
     */
    selectThemes (themesName) {
      this.$emit('selectThemes', themesName.name)
    },
    /**
     * 触发父级方法修改epub字号
     * @param Number 选中字号的下标
     */
    setFontSize (index) {
      this.$emit('setFontSize', index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
@import "../../assets/styles/icon.css";
.ebook-footer-box{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: px2rem(138);

    // -enter-to 显示完成后的样式 -leave 隐藏之前的样式
    .fade-up-enter-to, .fade-up-leave  {
      transition: translate3d(0, 0, 0);
    }
    // -enter-active 整个显示过程的动画状态  -leave-active 整个隐藏过程的动画状态
    .fade-up-enter-active, .fade-up-leave-active {
      transition: all .3s linear;
    }
    // -enter 显示之前的样式 -leave-to 隐藏之后的样式
    .fade-up-enter, .fade-up-leave-to {
      transform: translate3d(0, 100%, 0);
    }
    .ebook-footer-speed,
    .ebook-footer-setTheme,
    .ebook-footer-fontSize
     {
        background-color: #ffffff;
        position: absolute;
        left: 0;
        bottom: px2rem(48);
        width: 100%;
        height: px2rem(90);
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
    }
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
    .ebook-footer-setTheme {
        @include center;
        .themeItem{
          flex: 1;
          padding: px2rem(5);
          &-bgc {
            width: 100%;
            height: px2rem(60);
            box-sizing: border-box;
          }
          &-name {
            width: 100%;
            height: px2rem(20);
            color: #4c5059;
            text-align: center;
            line-height: px2rem(20);
            font-size: px2rem(14)
          }
          .fontStyle {
             color: #000;
             font-weight: 900;
          }
        }
    }
    .ebook-footer-fontSize {
        .setSizeBox{
          display: flex;
          height: px2rem(60);
          .min-size, .max-size{
            width: px2rem(40);
            @include center;
          }
          .min-size {
            justify-content: flex-end
          }
          .sizeList {
            flex: 1;
            display: flex;
            .select-wrapper {
              &:first-child{
                .line{
                  &:first-child {
                    border: none
                  }
                }
              }
              &:last-child{
                .line{
                  &:last-child {
                    border: none
                  }
                }
              }
              flex: 1;
              display: flex;
              @include center;
              .point-wrapper{
                height: px2rem(7);
                border-left: 1px solid #cccccc;
                position: relative;
                .point {
                  position: absolute;
                  @include center;
                  top: px2rem(-8);
                  left: px2rem(-8);
                  width: px2rem(20);
                  height: px2rem(20);
                  border: 1px solid #cccccc;
                  background: #ffffff;
                  box-shadow: 0 px2rem(1) px2rem(1) rgba(0,0,0,.15);
                  border-radius: 50%;
                  .small-point{
                    width: px2rem(5);
                    height: px2rem(5);
                    background: #000;
                    border-radius: 50%;
                  }
                }
              }
              .line {
                flex: 1;
                border-top: 1px solid #cccccc;
              }
            }
          }
          .max-size {
            justify-content: flex-start
          }
        }
    }
    .ebook-footer-memu {
        background-color: #ffffff;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        width: 100%;
        height: px2rem(48);
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
        @include center;
        justify-content: space-around;
        span {
            font-size: px2rem(22);
            flex: 1;
            height: 100%;
            @include center;
        }
        .icon-progress{
            font-size: px2rem(25)
        }
    }
}

</style>
