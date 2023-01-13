<template>
  <div class="layout-container">

    <router-view/>

    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item replace to="/layout/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="less">
.layout-container{
  .layout-tabbar{
    i.toutiao{
      font-size: 40px;
    }
    span.text{
      font-size: 20px;
    }
  }
}
</style>
