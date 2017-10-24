<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="ratings-top border-1px">
        <div class="score-left">
          <div class="score1">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="text1">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="score-right">
          <div class="service-score">
            <div class="text">服务态度</div>
            <div class="star-wrapper">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="food-score">
            <div class="text">食物分数</div>
            <div class="star-wrapper">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="delivery-time">
            <div class="text">送达时间</div>
            <div class="score">{{seller.deliveryTime}}分钟</div>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :selectType="selectType" :onlyContent='onlyContent' :desc="desc" @select="selectRating" @toggle="toggleContent"></ratingselect>
      <div class="ratings-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" :key="rating.id" class="rating-item border-1px">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">
                {{rating.username}}
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </h1>
              <div class="star-wrapper">
                <star :size="36" :score="rating.score"></star>
                <span class="deliverTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend.length>0">
                <i class="icon-thumb_up"></i>
                <span v-for="item in rating.recommend" :key="item.id" class="item">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const ALL = 2
const ERR_OK = 0
import BScroll from 'better-scroll'
import {formatDate} from '../../assets/js/date.js'
import star from '../star/star.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        // console.log(this.ratings)
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  components: {
    star,
    split,
    ratingselect
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    selectRating (type) {
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
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
.ratings
  position absolute
  top 174px
  left 0
  bottom 0
  width 100%
  overflow hidden
  .ratings-top
    display flex
    padding 18px 0
    border-1px(rgba(7,17,27,0.1))
    .score-left
      flex 0 0 137px
      width 137px
      text-align center
      position relative
      @media only screen and (max-width 320px)
        flex 0 0 120px
        width 120px
      &::after
        position absolute
        display block
        content ''
        width 1px
        height 62px
        background #f1f1f1
        right 0
        top 0
      .score1
        font-size 24px
        color rgb(255,153,0)
        line-height 28px
      .text
        margin-top 6px
        font-size 12px
        color rgb(7,17,27)
        line-height 10px
      .text1
        margin-top 8px
        font-size 10px
        color #a8a8a8
        line-height 10px
    .score-right
      flex 1
      padding-left 24px
      @media only screen and (max-width 320px)
        padding-left 6px
      .service-score,.food-score,.delivery-time
        font-size 0
        margin-bottom 8px
        .text
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
          display inline-block
          vertical-align top
        .star-wrapper
          display inline-block
          margin 0 12px
          .star.star-36 .star-item
            margin-right 3px
        .score
          display inline-block
          font-size 12px
          color rgb(255,153,0)
          line-height 18px
          vertical-align top
      .delivery-time
        .score
          color rgb(147,153,159)
          margin-left 12px
  .ratings-wrapper
    margin 0 18px
    .rating-item
      padding 18px 0
      display flex
      border-1px(rgba(7,17,27,0.1))
      .avatar
        width 28px
        height 28px
        vertical-align top
        flex 0 0 28px
        img
          border-radius 50%
      .content
        vertical-align top
        margin-left 12px
        flex 1
        .name
          font-size 10px
          color rgb(7,17,27)
          line-height 12px
          margin-bottom 4px
          .time
            float right 
            font-weight 200
            font-size 10
            color rgb(147,153,159)
            line-height 12px
        .star-wrapper
          margin-bottom 6px
          .star
            display inline-block
            vertical-align top
          .star.star-36 .star-item
            margin-right 3px
          .deliverTime
            font-size 10px
            font-weight 200
            color rgb(147,153,159)
            line-height 18px
            vertical-align top
        .text
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
        .recommend
          margin-top 8px
          font-size 0
          .icon-thumb_up,.item
            display inline-block
            margin 0 8px 4px 0
            vertical-align middle
            font-size 9px
          .icon-thumb_up
            font-size 12px
            color rgb(0,160,220)
            line-height 16px
          .item
            border 1px solid rgba(7,17,27,.1)
            border-radius 1px
            padding  0 6px
            background #fff
            line-height 16px
</style>
