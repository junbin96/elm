<template>
  <transition name='move'>
    <div v-show="showFlag" class="food" ref="food">
      <div class="foodWrapper">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content border-1px">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="description border-1px">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <ratingselect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" @select="selectedFood" @toggle="toggleContent"></ratingselect>
        <div class="rating-list">
          <ul>
            <li v-show="needShow(rating.rateType,rating.text)" class="item border-1px" v-for="rating in food.ratings" :key="rating.id">
              <div class="desc">
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="avatar"><img :src="rating.avatar" width="12" height="12"></div>
                <div class="name">{{rating.username}}</div>
              </div>
              <div class="text"><i :class="hands(rating.rateType)"></i>{{rating.text}}</div>
            </li>
          </ul>
          <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂时没有评价</div>
        </div> 
      </div>
    </div>
  </transition>
</template>

<script>
  import {formatDate} from '../../assets/js/date.js'
  const ALL = 2
  import BScroll from 'better-scroll'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import cartcontrol from '../cartControl/cartcontrol.vue'
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      selectedFood (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      hands (type) {
        if (type === 0) {
          return 'icon-thumb_up'
        } else {
          return 'icon-thumb_down'
        }
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      addFirst (event) {
        if (!event._constructed) return
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
      },
      addFood (target) {
        this.$emit('add', target)
      }
    },
    components: {
      split,
      ratingselect,
      cartcontrol
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
.move-enter-active, .move-leave-active 
  transition: all .5s ease
  transform translate3d(0,0,0)
.move-enter, .move-leave-to 
  transform translate3d(100%,0,0)
.food
  position fixed
  width 100%
  top 0
  left 0
  bottom 48px
  z-index 30
  background #fff
  .image-header
    width 100%
    height 0
    padding-top 100%
    position relative
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      top 20px
      left 15px
      font-size 18px
      color #fff
      padding 5px
  .content
    padding 18px
    border-1px(rgba(7,17,27,.1))
    .title
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 8px
    .detail
      font-size 10px
      color rgb(147,153,159)
      line-height 10px
      margin-bottom 18px
      .sell-count
        margin-right 12px
    .price
      .new
        font-size 14px
        font-weight 700
        color rgb(240,20,20)
        line-height 24px
      .old
        font-size 10px
        font-weight normal
        color rgb(147,153,159)
        line-height 24px
        text-decoration line-through
    .cartcontrol-wrapper
      position absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 18px
      z-index 10
      height 24px
      line-height 24px
      padding 0 12px
      box-sizing border-box
      font-size 10px
      border-radius 12px
      color #fff
      background rgb(0,160,220)
      opacity: 1
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.2s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        z-index: -1
  .description
    padding 18px
    border-1px(rgba(7,17,27,.1))
    .title
      font-weight 500
      margin-bottom 6px
    .text
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      line-height 24px
      padding 0 8px
  .rating-list
    padding 0 18px
    .item
      border-1px(rgba(7,17,27,.1))
      padding 16px 0
      .desc
        margin-bottom 6px
        .time,.name
          font-size 10px
          color rgb(147,153,159)
          line-height 12px
          display inline-block
        .avatar
          display inline-block
          width 12px
          height 12px
          margin-left 6px
          img
            border-radius 50%
        .name,.avatar
          float right
      .text
        font-size 12px
        color rgb(7,17,27)
        line-height 16px
        .icon-thumb_up,.icon-thumb_down
          font-size 12px
          color rgb(0,160,220)
          line-height 24px
          margin-right 4px
        .icon-thumb_down
          color rgb(147,153,159)
  .no-rating
    padding 16px 0
    font-size 12px
    color rgb(147,139,159)
    
</style>
