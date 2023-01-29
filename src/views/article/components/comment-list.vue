<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error="error"
      error-text="加载失败，点击重试"
    >
      <comment-item
        v-for="(item,index) in list"
        :key="index"
        :comment="item"
        />

    </van-list>
  </div>
</template>

<script>
import {getComments} from '@/api/comment'
import CommentItem from '@/views/article/components/comment-item'

export default {
  name: 'comment-list',
  components:{
    CommentItem
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset:null,
      error:false
    };
  },
  props:{
    source:{
      type:[Number,String,Object],
      required:true
    },
    list:{
      type:Array,
      required:false,
      default:()=>[]
    }
  },
  methods: {
    async onLoad() {
      try{
        const {data} =await getComments({
          type:'a',
          source:this.source,
          offset:this.offset,
          limit:10
        })

        const {results} = data.data
        this.$emit('onload-success',data.data)

        this.list.push(...results)

        if (results.length){
          this.offset=data.data.last_id
        }else{
          this.finished=true
        }
      }catch (err){
        this.error=true
      }
      this.loading=false
    },
  },
  created () {
    this.onLoad()
  }
}
</script>

<style scoped lang="less">

</style>
