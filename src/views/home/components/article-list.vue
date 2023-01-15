<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isReFreshLoading"
      @refresh="onRefresh"
      success-duration="1500"
      :success-text="reFreshSuccessText">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <ArticleItem v-for="(article,index) in list"
                :key="index"
                :article="article"
                :title="article.title" />
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'article-list',
  components:{
    ArticleItem
  },
  props:{
    channel:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp:null,
      error:false,
      isReFreshLoading:false,
      reFreshSuccessText:"刷新成功"
    };
  },
  methods: {
    async onLoad() {
      try{
        const {data}=await getArticles({
          channel_id:this.channel.id,
          timestamp:this.timestamp||Date.now()
        })
        const {results} =data.data
        this.list.push(...results)
        console.log(data)

        this.loading=false

        if (results.length){
          this.timestamp=data.data.pre_timestamp
        }else{
          this.finished=true
        }
      }catch (err){
        this.error=true
        this.loading=false
      }
    },
    async onRefresh(){
      try{
        const {data}=await getArticles({
          channel_id:this.channel.id,
          timestamp:Date.now()
        })
        const {results}=data.data
        this.list.unshift(...results)
        this.isReFreshLoading=false
        this.reFreshSuccessText= `刷新成功,更新了${results.length}条数据`
      }catch (err){
        this.reFreshSuccessText="刷新失败"
        this.isReFreshLoading=false
      }
    }
  },
}
</script>

<style scoped lang="less">
.article-list{
  height: 79vh;
  overflow-y: auto;
}
</style>
