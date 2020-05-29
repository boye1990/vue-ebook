<template>
  <div class="home">
    <span class="icon-book"></span>
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
global.ePub = Epub
export default {
  name: 'Home',
  data () {
    return {
      book: ''
    }
  },
  mounted () {
    this.book = new Epub('/2010_Book_CyborgsInLatinAmerica.epub')
    this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
  }
}
</script>
<style lang="css" scoped>
.icon-book{
  font-size: 30px;
  color: pink
}
</style>
