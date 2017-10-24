<template>
  <div>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="overview border-1px">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc border-1px">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <div class="stress">{{seller.minPrice}}<span class="text">元</span></div>
              </div>
            </li>
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <div class="stress">{{seller.deliveryPrice}}<span class="text">元</span></div>
              </div>
            </li>
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <div class="stress">{{seller.deliveryTime}}<span class="text">分钟</span></div>
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite($event)">
            <span class="icon-favorite" :class="{'active':this.favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <div class="title">公告与活动</div>
          <div class="content-wrapper">
            <div class="content border-1px">{{seller.bulletin}}</div>
          </div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item border-1px" v-for="(item,index) in seller.supports" :key="item.id">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
        <split></split>
        <div class="seller-pic">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pics" ref="pics">
              <li class="pic" v-for="pic in seller.pics" :key="pic.id"><img :src="pic" width="120" height="90"></li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="seller-info">
          <h1 class="title border-1px">商家信息</h1>
          <ul>
            <li class="info-item border-1px" v-for="info in seller.infos" :key="info.id">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../star/star.vue'
import split from '../split/split.vue'
import {saveToLocal, loadFromLocal} from '../../assets/js/store.js'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  components: {
    star,
    split
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._initPics()
    })
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = this.seller.pics.length * (picWidth + margin) - margin
        this.$refs.pics.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    },
    toggleFavorite (event) {
      if (!event._constructed) return
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
.seller
  position absolute
  top 174px
  bottom 0
  width 100%
  overflow hidden
  .seller-content
    .overview
      padding 18px
      border-1px(rgba(7,17,27,.1))
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 8px
      .desc
        font-size 0
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        .star,.text
          display inline-block
          vertical-align middle
        .star
          margin-right 8px
        .star-item
          margin-right 6px
        .text
          font-size 10px
          color rgb(77,85,93)
          line-height 18px
          margin-right 12px
      .remark
        margin-top 18px
        font-size 0
        display flex
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7,17,27,.1)
          &:last-child
            border 0
          h2
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            margin-bottom 4px
          .stress
            font-size 24px
            font-weight 200
            color rgb(7,17,27)
            line-height 24px
            .text
              font-size 10px
      .favorite
        position absolute
        right 11px
        top 18px
        text-align center
        width 50px
        .icon-favorite
          display block
          line-height 24px
          font-size 24px
          color #d4d6d9
          margin-bottom 4px
          &.active
            color rgb(240,20,20)
        .text
          font-size 10px
          line-height 10px
          color rgb(77,85,93)
    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
      .content-wrapper
        padding 0 12px 16px
        border-1px(rgba(7,17,27,.1))
        .content
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
          line-height 24px
    .supports
      font-size 0
      padding 0 18px
      .supports-item
        padding 16px 12px
        border-1px(rgba(7,17,27,.1))
        .icon
          display inline-block
          width 16px
          height 16px
          background-size 16px 16px
          vertical-align top
          &.decrease
            bg-img('decrease_4')
          &.discount
            bg-img('discount_4')
          &.guarantee
            bg-img('guarantee_4')
          &.invoice
            bg-img('invoice_4')
          &.special
            bg-img('special_4')
        .text
          font-size 12px
          font-weight 200
          line-height 16px
          margin-left 6px
        &:last-child
          border-none()
    .seller-pic
      padding 18px
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 12px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pics
          font-size 0
          .pic
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin-right 0
    .seller-info
      padding 18px
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        padding-bottom 12px
        border-1px(rgba(7,17,27,.1))
      .info-item
        font-size 12px
        font-weight 200
        color rgb(7,17,27)
        line-height 16px
        padding 16px 12px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
</style>

