<template>
  <div class="home-container">
    <van-nav-bar fixed class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >搜索
      </van-button>
    </van-nav-bar>

<!--    频道列表-->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name">
        <ArticleList :channel="channel"/>
      </van-tab>
      <div slot="nav-right" class="placeholder">

      </div>
      <div slot="nav-right" class="hanburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticleList from '@/views/home/components/article-list'
export default {
  name: 'HomeIndex',
  components:{
    ArticleList
  },
  data(){
    return{
      active:0,
      channels:[]
    }
  },
  methods:{
    async loadChannels(){
      try{
        const {data} = await getUserChannels()
        this.channels=data.data.channels
      }catch (err){
        this.$toast('获取用户频道失败')
      }
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style scoped lang="less">
.home-container{
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title{
    max-width: unset;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs{
    .van-tabs__content{
      min-height: 79px;
    }

    .van-tabs__wrap{
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab{
      min-width: 200px;
      //height: 82px;
      font-size: 30px;
      border-right: 1px solid #edeff3;
      color: #777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .placeholder{
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .van-tabs__line{
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .hanburger-btn{
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao{
        font-size: 33px;
      }
      &:before{
        content: "";
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        position: absolute;
        left: 0;
        background-size: contain;
      }
    }
  }
}
</style>
