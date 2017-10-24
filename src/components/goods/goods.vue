<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item menu-item-hook" v-for="(item,index) in goods" :key="item.id" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="item.id">
          <h1 class="title" :class="{'current':currentIndex===index}">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" class="food-item border-1px" v-for="food in item.foods" :key="food.id">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span v-if="food.rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol @add="addFood" :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></shopcart>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart.vue'
import cartcontrol from '../cartControl/cartcontrol.vue'
import food from '../food/food.vue'
const ERR_OK = 0
export default {
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        // console.log(this.goods)
        this.$nextTick(() => {
          this._initScroll()
          this._caculateHeight()
        })
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    selectMenu (index, event) {
      if (!event._constructed) return
      let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodsList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood (food, event) {
      if (!event._constructed) return
      this.selectedFood = food
      this.$refs.food.show()
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _caculateHeight () {
      let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodsList.length; i++) {
        let item = foodsList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    addFood (target) {
      // console.log(target)
      this._drop(target)
    },
    _drop (target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
.goods
  display flex
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow-y hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    .menu-item
      padding 0 12px
      height 54px
      display table
      background #f3f5f7
      &.current
        font-weight 700
        z-index 10
        position relative
        background #fff
        margin-top -1px
        .text
          border-none()
          color rgb(250,20,20)
      .text
        display table-cell
        color rgb(0,0,0)
        line-height 14px
        font-size 12px
        vertical-align middle
        width 56px
        border-1px(rgba(7,17,27,.1))
        .icon
          display inline-block
          width 12px
          height 12px
          background-size 12px 12px
          vertical-align bottom
          margin-right 2px
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
  .foods-wrapper
    flex 1
    .food-list
      .title
        font-size 12px
        color rgb(147,153,159)
        line-height 26px
        padding-left 14px
        border-left 2px solid #d9dde1
        background #f3f5f7
        &.current
          color rgb(240,20,20)
      .food-item
        padding 18px 0
        margin 0 18px
        display flex
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
        .icon
          flex 0 0 57px
        .content
          flex 1
          vertical-align top
          margin-left 10px
          .name
            margin-top 2px
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
          .desc,.extra
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            margin-top 8px
          .desc
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            .now
              font-size 14px
              font-weight 700
              color rgb(240,20,20)
              line-height 24px
              margin-right 8px
            .old
              font-size 10px
              font-weight 700
              color rgb(147,153,159)
              line-height 24px
              text-decoration line-through
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>
