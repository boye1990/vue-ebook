<template>
    <div class="ebook-footer">
        <span class="icon-menu"></span>
        <span class="icon-progress"></span>
        <span class="icon-bright"></span>
        <span class="icon-A"></span>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
@import "../../assets/styles/icon.css";
.ebook-footer {
    background-color: #ffffff;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(15) rgba(0,0,0,.15);
    @include center;
    justify-content: space-around;
    span {
        font-size: px2rem(22);
        flex: 1;
        @include center;
    }
    .icon-progress{
        font-size: px2rem(25)
    }
}
</style>
