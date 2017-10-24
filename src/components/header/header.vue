<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title"><span class="brand"></span><span class="name">{{seller.name}}</span></div>
        <div class="desc">
          <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="ShowDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="ShowDetail">
      <span class="bulletin"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background"><img :src="seller.avatar" width="100%" height="100%"></div>
    <transition name="fade">
      <div class="detail" v-show="showDetail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h2 class="name">{{seller.name}}</h2>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <titleBar :title="{vtitle:'优惠信息'}"></titleBar>
            <ul v-if="seller.supports" class="supports">
              <li class="supports-item" v-for="(item,index) in seller.supports" :key="item.id">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <titleBar :title="{vtitle:'商家公告'}"></titleBar>
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close" @click="HideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  import titleBar from '../titleBar/titleBar.vue'
  export default {
    data () {
      return {
        showDetail: false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      ShowDetail () {
        this.showDetail = true
      },
      HideDetail () {
        this.showDetail = false
      }
    },
    components: {
      star,
      titleBar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixin.styl'
  .header
    color #fff
    position relative
    background-color rgba(7,17,27,.5)
    overflow hidden
    .content-wrapper
      padding 24px 12px 18px 24px
      font-size 0
      position relative
      .avatar
        display inline-block
      &>img
        border-radius 4px
      .content
        display inline-block
        margin-left 16px
        vertical-align top
        .title
          margin 2px 0 8px 0
          .name
            font-size 16px
            font-weight bold
            line-height 16px
            margin-left 6px
          .brand
            display inline-block
            width 30px
            height 18px
            background-size 30px 18px
            background-repeat no-repeat
            bg-img('brand')
            vertical-align top
        .desc
          font-size 12px
          line-height 12px
          margin-bottom 10px
        .support
          font-size 0
          margin-bottom 2px
          .icon
            display inline-block
            width 12px
            height 12px
            background-size 12px 12px
            vertical-align top
            &.decrease
              bg-img('decrease_2')
            &.discount
              bg-img('discount_2')
            &.guarantee
              bg-img('guarantee_2')
            &.invoice
              bg-img('invoice_2')
            &.special
              bg-img('special_2')
          .text
            font-size 10px
            line-height 12px
            margin-left 4px
        .support-count
          position absolute
          bottom 18px
          right 12px
          height 24px
          line-height 24px
          padding 0 8px
          border-radius 14px
          background rgba(0,0,0,.2)
          .count
            font-size 10px
            margin-right 2px
          .icon-keyboard_arrow_right
            font-size 10px
            line-height 24px
    .bulletin-wrapper
      padding 0 12px
      height 28px
      line-height 28px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      background-color rgba(7,17,27,.2)
      position relative
      .bulletin
        width 22px
        height 12px
        display inline-block
        bg-img('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
        vertical-align middle
      .text
        font-size 10px
        margin 0 4px
        vertical-align middle
      .icon-keyboard_arrow_right
        position absolute
        right 5px
        top 8px
    .background
      width 100%
      height 100%
      position absolute
      top 0
      left 0
      z-index -1
      filter blur(10px)
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-to 
      opacity: 0
    .detail
      width 100%
      height 100%
      position fixed
      top 0
      left 0
      background rgba(7,17,27,.8)
      backdrop-filter blur(10px)
      z-index 100
      overflow auto
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding 0 36px 64px
          .name
            font-size 16px
            font-weight 700
            line-height 16px
            text-align center
          .star-wrapper
            text-align center
            margin-top 16px
          .supports
            padding 0 12px
            .supports-item
              margin-bottom 12px
              .icon
                display inline-block
                width 16px
                height 16px
                background-size 16px 16px
                vertical-align top
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.invoice
                  bg-img('invoice_2')
                &.special
                  bg-img('special_2')
              .text
                font-size 12px
                font-weight 200
                line-height 12px
                margin-left 6px
          .content
            font-size 12px
            line-height 24px
            padding 0 12px
      .detail-close
        width 32px
        height 32px
        font-size 32px
        clear both
        margin -64px auto
        color rgba(255,255,255,.5)
      
</style>
