<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.epub = Epub
export default {
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
    // 电子书初始化
    initEpub () {
      // 实例epub，传入获取的资源链接
      this.book = new Epub(this.fileName)
      // 将实例挂载在id为read的Dom上
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth, // 设置宽高为设备宽高
        height: window.innerHeight,
        methods: 'default' // 微信兼容性配置
      })
      this.rendition.display()
    }
  }

}
</script>
<style lang="scss">
@import "../../assets/styles/global.scss";

</style>
