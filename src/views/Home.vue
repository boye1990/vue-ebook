<template>
  <div class="home">
    <div>{{test}}</div>
    <span class="icon-book2" @click="setTest"></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['test'])
  },
  methods: {
    setTest () {
      this.$store.dispatch('setTest', 10)
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
