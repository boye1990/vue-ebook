<template>
    <div class="ebook-reader">
        {{$route.params.fileName}}
    </div>
</template>
<script>
export default {
  mounted () {
    console.log(this.$route.params.fileName)
  }
}
</script>
<style lang="scss">
@import "../../assets/styles/global.scss";

</style>
