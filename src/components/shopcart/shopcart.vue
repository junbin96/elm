<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls" :key="ball.id">
          <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span @click="empty" class="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food border-1px" v-for="food in selectFoods" :key="food.id">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span class="dollar">￥</span>{{food.price*food.count}}
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
  
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartControl/cartcontrol.vue'
  export default {
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '起送'
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return '还差￥' + diff + '起送'
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)'
            el.style.transform = 'translate3d(0,' + y + 'px,0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)'
            inner.style.transform = 'translate3d(' + x + 'px,0,0)'
          }
        }
      },
      dropping (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList () {
        if (!this.totalCount) return
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
.shopcart
  position fixed
  left 0
  bottom 0
  height 48px
  width 100%
  z-index 50
  .content
    display flex
    background #141d27
    .content-left
      flex 1
      font-size 0
      .logo-wrapper
        height 56px
        width 56px
        border-radius 50%
        margin 0 12px
        padding 6px
        display inline-block
        position relative
        bottom 10px
        background #141d27
        box-sizing border-box
        vertical-align top
        @media only screen and (max-width 320px)
          margin 0 0 0 5px
        .logo
          border-radius 50%
          text-align center
          width 100%
          height 100%
          background #2b343c
          &.highlight
            background rgb(0,160,220)
          .icon-shopping_cart
            font-size 24px
            color rgba(255,255,255,.4)
            line-height 44px
            &.highlight
              color #fff
        .num
          font-size 9px
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          color #fff
          font-weight 700
          background rgb(240,20,20)
          box-shadow 0px 4px 8px 0px rgba(0,0,0,.4)
      .price
        display inline-block
        font-size 16px
        vertical-align top
        line-height 24px
        font-weight 700
        color rgba(255,255,255,.4)
        margin-top 12px
        padding-right 12px
        border-right 1px solid rgba(255,255,255,.1)
        box-sizing border-box
        @media only screen and (max-width 320px)
          padding-right 5px
        &.highlight
          color #fff
      .desc
        display inline-block
        font-size 10px
        vertical-align top
        line-height 24px
        color rgba(255,255,255,.4)
        margin 12px 12px 0
        @media only screen and (max-width 320px)
          margin 12px 0 0 5px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        vertical-align top
        text-align center
        font-size 14px
        color rgba(255,255,255,.4)
        font-weight 700
        line-height 48px
        padding 0 8px
        height 100%
        background #2b343c
        &.not-enough
          background #2b343c
        &.enough
          background #00b43c
          color #fff
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      transition all .4s cubic-bezier(0.43,-0.24, 0.58, 1)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0,160,220)
        transition all .4s
  
  .shopcart-list
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    transform: translate3d(0, -100%, 0)
    &.fold-enter-active, &.fold-leave-active
      transition: all 0.5s
    &.fold-enter, &.fold-leave-active
      transform: translate3d(0, 0, 0)
    .list-header
      background #f3f5f7
      padding 0 18px
      height 40px
      line-height 40px
      border-bottom 1px solid rgba(7,17,27,.1)
      .title
        font-size 14px
        color rgb(7,17,27)
        display inline-block
      .empty
        font-size 12px
        color rgb(0,160,220)
        display inline-block
        float right
    .list-content
      max-height 217px
      overflow hidden
      background #fff
      padding 0 18px
      .food
        padding 12px 0
        line-height 24px
        border-1px (rgba(7,17,27,.1))
        position relative
        .name
          font-size 14px
          color rgb(7,17,27)
        .price
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          position absolute
          right 90px
          bottom 12px
          .dollar
            font-size 10px
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom -4px
.list-mask
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 40
  background rgba(7,17,27,.6)
  backdrop-filter blur(10px)
  &.fade-enter-active, &.fade-leave-active
    transition: opacity 0.5s
  &.fade-enter, &.fade-leave-active
    opacity 0
</style>
