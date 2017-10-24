<template>
  <div id="app">
    <Vheader :seller="seller"></Vheader>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  const ERR_OK = 0
  import Vheader from './components/header/header'
  import {urlParse} from './assets/js/util.js'
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            // console.log(queryParam)
            return queryParam.id
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          // this.seller = response.data
          this.seller = Object.assign({}, this.seller, response.data)
          // console.log(this.seller.id)
        }
      })
    },
    components: {
      Vheader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "assets/stylus/mixin.styl"
  .tab
    display: flex;
    height: 40px
    line-height: 40px;
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex: 1;
      text-align: center;
      font-size 14px
      & > a
        display block
        color rgb(77, 85, 93)
      & > a.active
        color: rgb(240, 20, 20);
</style>
