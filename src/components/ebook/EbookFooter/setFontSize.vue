<template>
    <div class="ebook-footer-fontSize">
        <div class="setSizeBox">
            <div class="min-size" :style="`fontSize: ${fontSizeList[0].fontSize}px`">A</div>
            <div class="sizeList">
              <div class="select-wrapper" @click="setFontSize(index)" v-for="(item, index) in fontSizeList" :key="item.fontSize">
                <div class="line"></div>
                <div class="point-wrapper">
                  <div class="point" v-show="defaultFontSize === item.fontSize">
                    <div class="small-point"></div>
                  </div>
                </div>
                <div class="line"></div>
              </div>
            </div>
            <div class="max-size" :style="`fontSize: ${fontSizeList[fontSizeList.length-1].fontSize}px`">A</div>
        </div>
        <div class="setFamilyBox"></div>
    </div>
</template>

<script>
import { ebookMixin } from '../../../utils/mixin'
export default {
  // 混入 mixins 获取 vuex中的数据 defaultFontSize
  mixins: [ebookMixin],
  data () {
    return {
      // 字号设置列表
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ]
    }
  },
  methods: {
    setFontSize (index) {
      this.$emit('setFontSize', index)
    }
  }
}
</script>

<style>

</style>
