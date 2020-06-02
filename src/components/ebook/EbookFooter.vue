<template>
    <div class="ebook-footer-box">
        <transition name="fade-up">
            <div class="ebook-footer-fontSize" v-show="isShowFontSize"></div>
        </transition>
        <div class="ebook-footer-memu" :style="isShowFontSize ? 'boxShadow: none' : ''">
            <span class="icon-menu"></span>
            <span class="icon-progress"></span>
            <span class="icon-bright"></span>
            <span class="icon-A" @click="showFontSize"></span>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isShowFontSize: false
    }
  },
  methods: {
    showFontSize () {
      this.isShowFontSize = true
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
    .ebook-footer-fontSize {
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
}

</style>
