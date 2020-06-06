<template>
    <div class="ebook-footer-setTheme">
      <div class="themeItem" @click="selectThemes(item)" v-for="item in themeList" :key="item.name">
        <div class="themeItem-bgc" :style="defaultTheme === item.name ? `border: 2px solid #5e6369; background:${item.style.body.background}` : `background:${item.style.body.background}`"></div>
        <div :class="defaultTheme === item.name ? 'themeItem-name fontStyle' : 'themeItem-name'">{{item.title}}</div>
      </div>
    </div>
</template>

<script>
import { ebookMixin } from '../../../utils/mixin'
export default {
  // 混入 mixins 获取 vuex中的数据 themeList defaultTheme
  mixins: [ebookMixin],
  methods: {
    selectThemes (theme) {
      this.$emit('selectThemes', theme)
    }
  }
}
</script>

<style lang='scss'>
@import "../../../assets/styles/global.scss";
@import "../../../assets/styles/icon.css";
.ebook-footer-setTheme {
    @include center;
    .themeItem{
      flex: 1;
      padding: px2rem(5);
      &-bgc {
        width: 100%;
        height: px2rem(60);
        box-sizing: border-box;
      }
      &-name {
        width: 100%;
        height: px2rem(20);
        color: #4c5059;
        text-align: center;
        line-height: px2rem(20);
        font-size: px2rem(14)
      }
      .fontStyle {
         color: #000;
         font-weight: 900;
      }
    }
}
</style>
