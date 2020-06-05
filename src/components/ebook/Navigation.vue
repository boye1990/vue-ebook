<template>
    <transition name="fade-nav">
        <div class="ebook-navigation">
            <div class="ebook-navigation-search">
                <div class="searchInput">
                    <span class="icon-search"></span>
                    <input type="text" placeholder="搜索全书内容">
                </div>
                <div class="cancel">取消</div>
            </div>
            <div class="ebook-navigation-bookContent"></div>
            <div class="ebook-navigation-content">
                <div
                    v-for="(item, index) in navigation"
                    :key="index"
                    class="navItem"
                    @click="jumpTo(item.href)"
                    v-show="navigation.length > 0"
                >
                    <div class="label">{{item.label}}</div><div class="page">{{index+1}}</div>
                </div>
                <div
                    class="navItem"
                    v-show="navigation.length === 0"
                >
                    <div class="label">加载中...</div>
                </div>
            </div>
            <div class="ebook-navigation-bottom">
                <div>书签</div>
                <div>目录</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * 去到指定章节
     * @param String href 章节路径
     */
    jumpTo (href) {
      console.log(href, 1)
      this.$emit('jumpTo', href)
    }
  }

}
</script>

<style lang="scss">
@import '../../assets/styles/global.scss';
.ebook-navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 85%;
    height: 100%;
    background: #fff;
    z-index: 102;
    &-search{
        height: px2rem(36);
        padding: 0 px2rem(15);
        width: 100%;
        box-sizing: border-box;
        margin: px2rem(20) 0 px2rem(10) 0;
        @include center;
        .searchInput {
            @include center;
            height: 100%;
            box-sizing: border-box;
            border: 1px solid rgb(184, 185, 187);
            border-radius: px2rem(4);
            .icon-search {
                font-size: px2rem(12);
            }
            input {
                flex: 1;
                height: px2rem(32);
                outline: none;
                border: none;
                border-radius: px2rem(4);
                width: px2rem(208);
            }
            span {
                width: px2rem(28);
                height: px2rem(12);
                color: #4c5059;
                text-align: center;
            }
        }
        .cancel{
            flex: 1;
            font-size: px2rem(14);
            color: #346cb9;
            font-weight: 900;
            text-align: right;
        }
    }
    &-bookContent{
        width: 100%;
        padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
        height: px2rem(90);
        box-sizing: border-box;
        border-bottom: 1px solid rgb(184, 185, 187);
    }
    &-content{
        padding: 0 px2rem(15) px2rem(40) px2rem(15);
        width: 100%;
        box-sizing: border-box;
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;
        .navItem{
            height: px2rem(16);
            @include center;
            font-size: px2rem(14);
            padding: px2rem(20) 0;
            border-bottom: 1px solid #b8b9bb;
            .label {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                flex: 1;
            }
            .page {
                min-width: px2rem(50);
                text-align: right;
            }
        }
    }
    &-bottom {
        @include center;
        height: px2rem(45);
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        background-color: #fff;
        box-sizing: border-box;
        border-top: 1px solid rgb(184, 185, 187);
        div{
            height: 100%;
            font-size: px2rem(12);
            width: 50%;
            @include center;
            color: #4c5059;
        }
    }
}
.fade-nav-enter, .fade-nav-leave-to{
    transform: translate3d(-100%, 0, 0);
}
.fade-nav-leave, .fade-nav-enter-to{
    transition: translate3d(0, 0, 0);
}
.fade-nav-enter-active, .fade-nav-leave-active{
  transition: all .3s linear;
}

</style>
