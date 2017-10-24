<template>
  <div class="ratingselect border-1px">
    <div class="rating-type border-1px">
      <div @click="select(2,$event)" class="all block" :class="{'active':selectType===2}">{{desc.all}}<span class="num">{{ratings.length}}</span></div>
      <div @click="select(0,$event)" class="positive block" :class="{'active':selectType===0}">{{desc.positive}}<span class="num">{{positive.length}}</span></div>
      <div @click="select(1,$event)" class="negative block" :class="{'active':selectType===1}">{{desc.negative}}<span class="num">{{negative.length}}</span></div>
    </div>
    <div class="switch" :class="{'active':onlyContent}" @click="toggleContent($event)">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default{
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) return
        // this.selectType = type
        this.$emit('select', type)
      },
      toggleContent (event) {
        if (!event._constructed) return
        // this.onlyContent = !this.onlyContent
        this.$emit('toggle')
      }
    },
    computed: {
      positive () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negative () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    }
  }
</script>

<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
.ratingselect
  border-1px(rgba(7,17,27,.1))
  padding 0 18px
  .rating-type
    width 100%
    padding 18px 0
    border-1px(rgba(7,17,27,.1))
    font-size 0
    .block
      display inline-block
      font-size 12px
      color rgb(77,85,93)
      border-radius 4px
      padding 8px 12px
      margin-right 8px
      line-height 16px
      .num
        font-size 8px
        margin-left 3px
      &.positive,&.all
        background rgba(0,160,220,.2)
        &.active
          background rgb(0,160,220)
          color #fff
      &.negative
        color #4d555d
        background rgba(77,85,93,.2)
        &.active
          background rgb(77,85,93)
          color #fff
  .switch
    margin-top 12px
    padding-bottom 12px
    color rgb(147,153,159)
    line-height 24px
    &.active
      .icon-check_circle
        color #00c850
    .icon-check_circle
      font-size 24px
      vertical-align top
    .text
      font-size 12px
      vertical-align top
</style>
