<template>
    <div class="ebook-reader">
        <transition name="fade">
            <ebook-header v-show="isShow"></ebook-header>
        </transition>
        <div id="read"></div>
        <transition name="fade-up">
            <ebook-footer
              @toggleTitleAndMenu="toggleTitleAndMenu"
              @onProgressChange="onProgressChange"
              ref="ebookFooter"
              v-show="isShow">
            </ebook-footer>
        </transition>
    </div>
</template>
<script>
import { ebookMixin } from '../../utils/mixin'
import EbookHeader from './EbookHeader'
import EbookFooter from './EbookFooterMenu/index'
import Epub from 'epubjs'
global.epub = Epub
export default {
  components: {
    EbookHeader,
    EbookFooter
  },
  mixins: [ebookMixin],
  data () {
    return {
      // 目录数据
      navigation: ''
    }
  },
  mounted () {
    // 根据动态路由的书名凭借nginx的域名，获得资源链接
    const baseUrl = `http://localhost:8081/epub/${this.$route.params.fileName.split('|').join('/')}.epub`
    // 将电子书的资源地址保存在vuex
    this.setFileName(baseUrl).then(() => {
      this.initEpub()
    })
  },
  methods: {
    /**
     * 根据设置进度条，跳转页面内容cfiFromPercentage
     * @param String progress 进度条数值
     */
    onProgressChange (progress) {
      const perecentage = progress / 100
      const location = perecentage > 0 ? this.locations.cfiFromPercentage(perecentage) : 0
      this.rendition.display(location)
    },
    /**
     * 为epub实例注册主题
     */
    registerThemes () {
      this.themeList.forEach(item => {
        this.themes.register(item.name, item.style)
      })
    },
    /**
     * 调用epub对象的翻页方法(下一页)
     */
    prevPage () {
      if (this.rendition) this.rendition.prev()
    },
    /**
     * 调用epub对象的翻页方法(上一页)
     */
    nextPage () {
      if (this.rendition) this.rendition.next()
    },
    /**
     * 显示or隐藏头部和底部栏
     */
    toggleTitleAndMenu () {
      this.setIsShow()
      setTimeout(function () {
        this.$refs.ebookFooter.isShowFontSize = false
        this.$refs.ebookFooter.setNum = -1
      }.bind(this), 400)
    },
    /**
     * 使用 epubjs 初始化电子书
     */
    initEpub () {
      // 实例epub，传入获取的资源链接
      this.book = new Epub(this.fileName)
      // 将epub实例保存在vuex中
      this.setEpubBook(this.book)
      // 将实例挂载在id为read的Dom上
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth, // 设置宽高为设备宽高
        height: window.innerHeight,
        snap: true, // 滑屏翻页动画
        flow: 'paginated', // 滑屏翻页动画
        manager: 'continuous', // 滑屏翻页动画
        methods: 'default' // 微信兼容性配置
      })
      // ready 是equbjs的钩子函数，加载完毕的时候触发
      this.book.ready.then(() => {
        this.rendition.display()
        // navigation 为目录
        this.navigation = this.book.navigation
        this.$refs.ebookFooter.navigation = this.navigation.toc
        console.log(this.navigation)
        // 通过 locations 对象的 generate 方法，生成 location 数组用来 设置进度
        return this.book.locations.generate()
      }).then(result => {
        this.setBookAvailable(true)
        this.locations = this.book.locations
      })
      this.rendition.on('click', event => {
        this.toggleTitleAndMenu()
      })
      // 保存epubjs字号变量到本地
      this.themes = this.rendition.themes
      // 设置默认字号
      this.themes.fontSize(this.defaultFontSize + 'px')
      // 添加主题
      this.registerThemes()
      // 选择已有主题
      this.themes.select('default')
      // 监听touchstart 和 touchend 事件。
      this.rendition.on('touchstart', event => {
        // 获取触摸起点x坐标，和时间
        // this.touchstartX = event.changedTouches[0].clientX
        this.touchstartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        // 获取触摸终点x坐标，和时间
        // const offsetX = event.changedTouches[0].clientX - this.touchstartX
        const time = event.timeStamp - this.touchstartTime
        if (time > 100) {
          if (this.isShow) this.toggleTitleAndMenu()
        }
        event.stopPropagation()
      })
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
.fade-up-enter {
  transform: translate3d(0, px2rem(48), 0);
}
.fade-up-leave-to {
  transform: translate3d(0, 100%, 0);
}
</style>
