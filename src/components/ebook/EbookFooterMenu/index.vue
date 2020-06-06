<template>
    <div class="ebook-footer-box">
        <transition name="fade-up">
            <setSize
                class="publicStyle"
                v-if="setNum === 0"
                @setFontSize='setFontSize'
            >
            </setSize>
        </transition>
        <transition name="fade-up">
            <setTheme
                class="publicStyle"
                v-if="setNum === 1"
                @selectThemes='selectThemes'
            >
            </setTheme>
        </transition>
        <transition name="fade-up">
            <speed
                class="publicStyle"
                v-if="setNum === 2"
                @onProgressChange='onProgressChange'
            ></speed>
        </transition>
        <navigation :navigation="navigation" @jumpTo="jumpTo" v-show="setNum === 3"></navigation>
        <div class="ebook-footer-memu" :style="isShowFontSize ? 'boxShadow: none' : ''">
            <span class="icon-menu" @click="showSettingsBar(3)"></span>
            <span class="icon-progress" @click="showSettingsBar(2)"></span>
            <span class="icon-bright" @click="showSettingsBar(1)"></span>
            <span class="icon-A" @click="showSettingsBar(0)"></span>
        </div>
        <transition name="fade-modal">
          <div class="ebook-modal" @click="closeModal" v-show="setNum === 3"></div>
        </transition>
    </div>
</template>
<script>
import Navigation from './navigation'
import SetSize from './setFontSize'
import SetTheme from './setTheme'
import Speed from './speed'
export default {
  components: {
    Navigation,
    SetSize,
    SetTheme,
    Speed
  },
  data () {
    return {
      isShowFontSize: false,
      fontSize: 0,
      setNum: -1,
      navigation: []
    }
  },
  methods: {
    /**
     * 去到指定章节
     * @param String href 章节路径
     */
    jumpTo (href) {
      console.log(href, 2)
      this.$emit('jumpTo', href)
      this.closeModal()
    },
    /**
     * 关闭modal，目录
     */
    closeModal () {
      this.setNum = -1
      setTimeout(() => {
        this.$emit('toggleTitleAndMenu')
      }, 400)
    },
    /**
     * 松开滑块触发的方法
     */
    onProgressChange (value) {
      this.$emit('onProgressChange', value)
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
      console.log(themesName)
      this.$emit('selectThemes', themesName.name)
    },
    /**
     * 触发父级方法修改epub字号
     */
    setFontSize () {
      this.$emit('setFontSize')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/global.scss";
@import "../../../assets/styles/icon.css";
.ebook-footer-box{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: px2rem(138);

    @include fadeUpTranstion;
    .publicStyle
     {
        background-color: #ffffff;
        position: absolute;
        left: 0;
        bottom: px2rem(48);
        width: 100%;
        height: px2rem(90);
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
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
    /** 蒙层样式 */
    .ebook-modal {
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: 101;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .51)
    }
    .fade-modal-enter, .fade-modal-leave-to{
        opacity: 0;
    }
    .fade-modal-leave, .fade-modal-enter-to{
        opacity: 1;
    }
    .fade-modal-enter-active, .fade-modal-leave-active{
      transition: all .3s linear;
    }
  }

</style>
