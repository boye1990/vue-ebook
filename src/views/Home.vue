<template>
  <div class="home">
    <span class="icon-book2"></span>
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
    this.book = new Epub('/2015_Book_InnovationsInQuantitativeRiskM.epub')
    this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
  }
}
</script>
<style lang="css" scoped>
.icon-book2 {
  font-size: 30px;
  color: pink
}
</style>
