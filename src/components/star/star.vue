<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :key="itemClass.id" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_HALF = 'half'
const CLS_ON = 'on'
const CLS_OFF = 'off'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
.star
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 24px
      height 24px
      margin-right 26px
      background-size 24px 24px
      &:last-child
        margin-right 0
      &.on
        bg-img('star48_on')
      &.half
        bg-img('star48_half')
      &.off
        bg-img('star48_off')
  &.star-36
    .star-item
      width 16px
      height 16px
      margin-right 18px
      background-size 16px 16px
      &:last-child
        margin-right 0
      &.on
        bg-img('star36_on')
      &.half
        bg-img('star36_half')
      &.off
        bg-img('star36_off')
  &.star-24
    .star-item
      width 12px
      height 12px
      margin-right 14px
      background-size 12px 12px
      &:last-child
        margin-right 0
      &.on
        bg-img('star24_on')
      &.half
        bg-img('star24_half')
      &.off
        bg-img('star24_off')

</style>
