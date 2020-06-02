<template>
    <div class="ebook-reader">
        <ebook-header></ebook-header>
        <div id="read"></div>
        <ebook-footer></ebook-footer>
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
      //     this.prevPage()
      //   } else if (offsetX < -40 && time < 500) {
      //     this.nextPage()
      //   } else {
      //     this.toggleTitleAndMenu()
      //     console.log(offsetX, time)
      //   }
      //   event.preventDefault()
      //   event.stopPropagation()
      // })
    }
  }

}
</script>
<style lang="scss">
@import "../../assets/styles/global.scss";

</style>
