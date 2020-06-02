<template>
    <div class="ebook-reader">
        <transition name="fade">
            <ebook-header v-show="isShow"></ebook-header>
        </transition>
        <div id="read"></div>
        <transition name="fade-up">
            <ebook-footer v-show="isShow"></ebook-footer>
        </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EbookHeader from './EbookHeader'
import EbookFooter from './EbookFooter'
import Epub from 'epubjs'
global.epub = Epub
export default {
  components: {
    EbookHeader,
    EbookFooter
  },
  data () {
    return {
      // 是否显示头部和菜单栏
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['fileName'])
  },
  mounted () {
    // 根据动态路由的书名凭借nginx的域名，获得资源链接
    const baseUrl = `http://localhost:8081/epub/${this.$route.params.fileName.split('|').join('/')}.epub`
    // 将电子书的资源地址保存在vuex
    this.$store.dispatch('setFileName', baseUrl).then(() => {
      this.initEpub()
    })
  },
  methods: {
    // 去下一页的方法
    prevPage () {
      if (this.rendition) this.rendition.prev()
    },
    // 返回上一页的方法
    nextPage () {
      if (this.rendition) this.rendition.next()
    },
    // 显示头部和底部
    toggleTitleAndMenu () {
      this.isShow = !this.isShow
    },
    // 电子书初始化
    initEpub () {
      // 实例epub，传入获取的资源链接
      this.book = new Epub(this.fileName)
      // 将实例挂载在id为read的Dom上
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth, // 设置宽高为设备宽高
        height: window.innerHeight,
        snap: true, // 滑屏翻页动画
        flow: 'paginated', // 滑屏翻页动画
        manager: 'continuous', // 滑屏翻页动画
        methods: 'default' // 微信兼容性配置
      })
      this.book.ready.then(() => {
        this.rendition.display()
        this.bookReady = true // 滑屏翻页动画
      })
      this.rendition.on('click', event => {
        this.toggleTitleAndMenu()
        // event.preventDefault()
        event.stopPropagation()
      })
      // // 监听touchstart 和 touchend 事件。
      // this.rendition.on('touchstart', event => {
      //   // 获取触摸起点x坐标，和时间
      //   this.touchstartX = event.changedTouches[0].clientX
      //   this.touchstartTime = event.timeStamp
      // })
      // this.rendition.on('touchend', event => {
      //   // 获取触摸终点x坐标，和时间
      //   const offsetX = event.changedTouches[0].clientX - this.touchstartX
      //   const time = event.changedTouches[0].clientX - this.touchstartTime
      //   if (offsetX > 40 && time < 500) {
      //     // this.prevPage()
      //   } else if (offsetX < -40 && time < 500) {
      //     // this.nextPage()
      //   } else {
      //     this.toggleTitleAndMenu()
      //     console.log(offsetX, time)
      //   }
      //   // event.preventDefault()
      //   event.stopPropagation()
      // })
    }
  }

}
</script>
<style lang="scss">
@import "../../assets/styles/global.scss";
// -enter 显示之前的样式 -leave-to 隐藏之后的样式
.fade-enter, .fade-leave-to {
  transform: translate3d(0, -100%, 0);
}
// -enter-to 显示完成后的样式 -leave 隐藏之前的样式
.fade-enter-to, .fade-leave, .fade-up-enter-to, .fade-up-leave  {
  transition: translate3d(0, 0, 0);
}
// -enter-active 整个显示过程的动画状态  -leave-active 整个隐藏过程的动画状态
.fade-enter-active, .fade-leave-active, .fade-up-enter-active, .fade-up-leave-active {
  transition: all .3s linear;
}
// -enter 显示之前的样式 -leave-to 隐藏之后的样式
.fade-up-enter, .fade-up-leave-to {
  transform: translate3d(0, 100%, 0);
}
</style>
