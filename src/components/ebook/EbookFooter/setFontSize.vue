<template>
    <div class="ebook-footer-fontSize">
        <div class="setSizeBox">
            <div class="min-size" :style="`fontSize: ${fontSizeList[0].fontSize}px`">A</div>
            <div class="sizeList">
              <div class="select-wrapper" @click="setFontSize(item.fontSize)" v-for="item in fontSizeList" :key="item.fontSize">
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
    setFontSize (fontSize) {
      // 调用mixins里面的方法修改vuex中的默认字号
      this.setDefaultFontSize(fontSize)
      this.$emit('setFontSize')
    }
  }
}
</script>

<style lang='scss'>
@import "../../../assets/styles/global.scss";
@import "../../../assets/styles/icon.css";
.ebook-footer-fontSize {
    .setSizeBox{
      display: flex;
      height: px2rem(60);
      .min-size, .max-size{
        width: px2rem(40);
        @include center;
      }
      .min-size {
        justify-content: flex-end
      }
      .sizeList {
        flex: 1;
        display: flex;
        .select-wrapper {
          &:first-child{
            .line{
              &:first-child {
                border: none
              }
            }
          }
          &:last-child{
            .line{
              &:last-child {
                border: none
              }
            }
          }
          flex: 1;
          display: flex;
          @include center;
          .point-wrapper{
            height: px2rem(7);
            border-left: 1px solid #cccccc;
            position: relative;
            .point {
              position: absolute;
              @include center;
              top: px2rem(-8);
              left: px2rem(-8);
              width: px2rem(20);
              height: px2rem(20);
              border: 1px solid #cccccc;
              background: #ffffff;
              box-shadow: 0 px2rem(1) px2rem(1) rgba(0,0,0,.15);
              border-radius: 50%;
              .small-point{
                width: px2rem(5);
                height: px2rem(5);
                background: #000;
                border-radius: 50%;
              }
            }
          }
          .line {
            flex: 1;
            border-top: 1px solid #cccccc;
          }
        }
      }
      .max-size {
        justify-content: flex-start
      }
    }
}
</style>
