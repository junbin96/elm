<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">
      <span class="inner icon-add_circle"></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) return
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('add', event.target)
      },
      decreaseCart (event) {
        if (!event._constructed) return
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus">
.cartcontrol
  font-size 0
  .move-enter-active, .move-leave-active 
    transition: all .5s
    transform translate3d(0,0,0)
    .inner
      transition: all .5s
      transform rotate(0)
  .move-enter, .move-leave-to 
    opacity: 0
    transform translate3d(24px,0,0)
    .inner
      transition: all .5s
      transform rotate(180deg)
  .cart-decrease,.cart-add
    display inline-block
    padding 6px
    .inner
      display inline-block
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
  .cart-count
    display inline-block
    font-size 10px
    color rgb(147,153,159)
    line-height 24px
    vertical-align top
    width 12px
    padding-top 6px
    text-align center
</style>
