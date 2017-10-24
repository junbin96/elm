<template>
  <div class="titleBar">
    <div class="line border-1px"></div>
    <div class="title">{{title.vtitle}}</div>
    <div class="line border-1px"></div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
.titleBar
  width 100%
  display flex
  margin 28px 0 24px 0
  .line
    flex 1
    position relative
    top -6px
    border-1px (rgba(255,255,255,.2))
  .title
    padding 0 12px
    font-weight 700
    font-size 14px
</style>
