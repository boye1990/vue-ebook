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
        <div class="setFamilyBox">
          <div class="familyNameText"  @click="isShowFamilyList">{{defaultFamily}}<span class="icon-forward"></span></div>
          <transition name="family">
            <div class="familyList" v-show='showFamilyList'>
              <div @click="isShowFamilyList" class="setFamilyBoxModal"></div>
              <div class="title">
                <span class="hidTitle icon-down2" @click="isShowFamilyList"></span>
                选择字体
              </div>
              <div class="list">
                <div class="item"
                  @click="selectFamily(index, item.font)"
                  v-for=" (item, index) in fontFamilyList "
                  :key='item.font'
                >
                  <div :class="selectFamilyIndex === index ? 'familyName nameColor' : 'familyName'">{{item.font}}</div><span v-if="selectFamilyIndex === index" class="icon-check"></span>
                </div>
              </div>
            </div>
          </transition>
        </div>
    </div>
</template>

<script>
import { ebookMixin } from '../../../utils/mixin'
import { FONT_FAMILY } from '../../../utils/book'
import { setBookLocalStorage, getBookLocalStorage } from '../../../utils/localStorage'
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
      ],
      fontFamilyList: FONT_FAMILY,
      selectFamilyIndex: 0,
      showFamilyList: false,
      defaultFamily: 'Default'
    }
  },
  watch: {
    epubBook () {
      console.log('监听epubBook')
      this.getLocalStorageSizeAndFamily()
    }
  },
  methods: {
    /**
     * 获取缓存字号，字体
     */
    getLocalStorageSizeAndFamily () {
      const fontSize = Number(getBookLocalStorage(this.fileName, 'fontSize'))
      const selectFamilyIndex = Number(getBookLocalStorage(this.fileName, 'selectFamilyIndex'))
      const defaultFamily = getBookLocalStorage(this.fileName, 'defaultFamily')
      if (fontSize) {
        this.setFontSize(fontSize)
      }
      if (selectFamilyIndex && defaultFamily) {
        this.selectFamily(selectFamilyIndex, defaultFamily)
      }
    },
    /**
     * 选择字号
     * @param Number fontSize 选中的字号
     */
    setFontSize (fontSize) {
      // 调用mixins里面的方法修改vuex中的默认字号
      this.setDefaultFontSize(fontSize)
      if (this.epubBook.rendition && this.epubBook.rendition.themes) {
        setBookLocalStorage(this.fileName, 'fontSize', fontSize)
        this.epubBook.rendition.themes.fontSize(fontSize + 'px')
      }
    },
    /**
     * 选择字体
     * @param Number index 选中的字体下标
     * @param String familyName 选中的字体名字
     */
    selectFamily (index, familyName) {
      this.selectFamilyIndex = index
      this.defaultFamily = familyName
      if (this.epubBook.rendition && this.epubBook.rendition.themes) {
        setBookLocalStorage(this.fileName, 'selectFamilyIndex', index)
        setBookLocalStorage(this.fileName, 'defaultFamily', familyName)
        if (familyName === 'Default') {
          this.epubBook.rendition.themes.font('Times New Roman')
        } else {
          this.epubBook.rendition.themes.font(familyName)
        }
      }
    },
    /**
     * 关闭ro打开字体选择
     */
    isShowFamilyList () {
      this.showFamilyList = !this.showFamilyList
    }
  }
}
</script>

<style lang='scss'>
@import "../../../assets/styles/global.scss";
@import "../../../assets/styles/icon.css";
.ebook-footer-fontSize {
    .setFamilyBox{
      height: px2rem(30);
      .setFamilyBoxModal {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: rgba(0, 0, 0, .51)
      }
      .familyNameText {
        @include center;
        font-size: px2rem(18)
      }
      .family-enter, .family-leave-to {
        transform: translate3d(0, 100%, 0);
        opacity: 0;
      }
      .family-enter-to, .family-leave {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
      .family-enter-active, .family-leave-active {
        transition: all .2s linear;
      }
      .familyList {
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
        position: fixed;
        display: flex;
        flex-direction: column;
        width: 100%;
        left: 0;
        bottom: 0;
        z-index: 104;
        .list {
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
          .item {
            @include center;
            padding: px2rem(20);
            background: #fff;
            width: 100%;
            box-sizing: border-box;
            .familyName {
              flex: 1;
              font-size: px2rem(18);
              justify-content: start;
            }
            .nameColor {
              color: #346cb9;
              font-weight: 700;
            }
            .icon-check {
              color: #346cb9;
              font-weight: 700;
              font-size: px2rem(18)
            }
          }
        }
        .title {
          text-align: center;
          position: relative;
          width: 100%;
          font-size: px2rem(18);
          box-sizing: border-box;
          padding: px2rem(20);
          border-bottom: 1px solid #000;
          background: #fff;
          font-weight: 900;
          .hidTitle {
            font-size: px2rem(21);
            font-weight: 900;
            position: absolute;
            left: px2rem(20);
            top: px2rem(20);
          }
        }
      }
    }
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
