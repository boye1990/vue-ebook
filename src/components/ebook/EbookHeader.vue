<template>
    <div class="ebook-header">
        <div class="ebook-header-left">
            <span class="icon-back"></span>
        </div>
        <div class="ebook-header-right">
            <span class="icon-shelf"></span>
            <span class="icon-cart"></span>
            <span class="icon-more"></span>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
@import "../../assets/styles/icon.css";
.ebook-header {
    background-color: #ffffff;
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(8) px2rem(15) rgba(0,0,0,.15);
    &-left{
        width: px2rem(37);
        font-size: px2rem(22);
        @include center;
        justify-content: flex-end;
    }
    &-right{
        display: flex;
        @include center;
        justify-content: flex-end;
        flex: 1;
        span {
            display: block;
            width: px2rem(37);
            font-size: px2rem(22)
        }
    }
}
</style>
