<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error="error"
      error-text="加载失败，点击重试"
      :immediate-check="false"
    >
      <comment-item
        @reply-click="$emit('reply-click',$event)"
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
    },
    type:{
      type:String,
      default:'a',
      validator(value){
        return ['a','c'].includes(value)
      }
    }
  },
  methods: {
    async onLoad() {
      try{
        const {data} =await getComments({
          type:this.type,
          source:this.source.toString(),
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
    this.loading=true
    this.onLoad()
  }
}
</script>

<style scoped lang="less">

</style>
