<template>
  <van-button :loading="loading">
    <van-icon
      @click="onCollect"
      :color="value===1?'#e5645f':''"
      :name="value===1?'good-job':'good-job-o'"
    />
  </van-button>
</template>

<script>
import {addLike,deleteLike} from '@/api/article'

export default {
  name: 'LikeArticle',
  props:{
    value:{
      type:Number,
      required:true
    },
    articleId:{
      type:[Number,String,Object],
      required: true
    }
  },
  data(){
    return{
      loading:false
    }
  },
  methods:{
    async onCollect(){
      this.loading=true
      try{
        let status=-1;
        if (this.value===1){
          await deleteLike(this.articleId)
        }else{
          await addLike(this.articleId)
          status=1
        }
        this.$emit("input",status)
        this.$toast.success(status===1?'点赞成功':'取消点赞')
      }catch (err){
        this.$toast.fail('操作失败')
      }
      this.loading=false
    }
  }
}
</script>

<style scoped>

</style>
