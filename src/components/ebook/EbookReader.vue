<template>
    <div class="ebook-reader">
        <transition name="fade">
            <ebook-header v-show="isShow"></ebook-header>
        </transition>
        <div id="read"></div>
        <transition name="fade-up">
            <ebook-footer
              @setFontSize="setFontSize"
              :fontSizeList="fontSizeList"
              :defaultFontSize="defaultFontSize"
              @toggleTitleAndMenu="toggleTitleAndMenu"
              :themeList="themeList"
              :defaultTheme="defaultTheme"
              @selectThemes="selectThemes"
              @onProgressChange="onProgressChange"
              :bookAvailable="bookAvailable"
              @navigation="navigation"
              @jumpTo="jumpTo"
              ref="ebookFooter"
              v-show="isShow">
            </ebook-footer>
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
      // 目录数据
      navigation: '',
      // 电子书加载状态
      bookAvailable: false,
      // 是否显示头部和菜单栏
      isShow: false,
      // 字号设置列表
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      // 主题设置列表
      themeList: [
        {
          name: 'default', // 主题名称
          title: '默认',
          style: {
            body: {
              color: '#000', // 主题字体颜色
              background: '#7d8188' // 主题背景颜色
            }
          }
        },
        {
          name: 'elegant', // 主题名称
          title: '雅致',
          style: {
            body: {
              color: '#000', // 主题字体颜色
              background: 'rgb(198, 194, 182)' // 主题背景颜色
            }
          }
        },
        {
          name: 'eye', // 主题名称
          title: '护眼',
          style: {
            body: {
              color: '#000', // 主题字体颜色
              background: 'rgb(169, 193, 169)' // 主题背景颜色
            }
          }
        },
        {
          name: 'night', // 主题名称
          title: '夜间',
          style: {
            body: {
              color: '#fff', // 主题字体颜色
              background: '#000' // 主题背景颜色
            }
          }
        }
      ],
      // 默认字号
      defaultFontSize: 16,
      // 默认主题
      defaultTheme: 'default'
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
    /**
     * 跳转章节内容
     * @param String href 章节地址
     */
    jumpTo (href) {
      this.rendition.display(href)
      this.toggleTitleAndMenu()
    },
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
     * 设置主题
     * @param String 主题名称
     */
    selectThemes (themeName) {
      console.log(themeName)
      this.defaultTheme = themeName
      this.themes.select(themeName)
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
     * 设置字号
     * @param Number 选中字体列表的元素下标
     */
    setFontSize (fontSize) {
      this.defaultFontSize = this.fontSizeList[fontSize].fontSize
      console.log(this.defaultFontSize)
      if (this.themes) {
        this.themes.fontSize(this.defaultFontSize + 'px')
      }
    },
    /**
     * 显示or隐藏头部和底部栏
     */
    toggleTitleAndMenu () {
      this.isShow = !this.isShow
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
        console.log(this.navigation)
        // 通过 locations 对象的 generate 方法，生成 location 数组用来 设置进度
        return this.book.locations.generate()
      }).then(result => {
        console.log(this.book.locations)
        this.bookAvailable = true
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
      this.selectThemes('default')
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
        // if (offsetX > 40 && time < 500) {
        //   // this.prevPage()
        // } else if (offsetX < -40 && time < 500) {
        //   // this.nextPage()
        // } else {
        //   this.toggleTitleAndMenu()
        //   console.log(offsetX, time)
        // }
        // event.preventDefault()
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
