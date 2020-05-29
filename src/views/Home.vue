<template>
  <div class="home">
    <div>{{test}}</div>
    <span class="icon-book2" @click="setTest"></span>
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
      book: '',
      test: 0
    }
  },
  mounted () {
    this.test = this.$store.state.test
    this.book = new Epub('/2015_Book_InnovationsInQuantitativeRiskM.epub')
    this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
  },
  methods: {
    setTest () {
      this.$store.dispatch('setTest', 10).then(() => {
        this.test = this.$store.state.test
      })
    }
  }
}
</script>
<style lang="css" scoped>
.icon-book2 {
  font-size: 30px;
  color: pink
}
</style>
