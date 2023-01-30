<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="comment.reply_count>0?`${comment.reply_count}条回复`:'暂无回复'"
    >
      <van-icon
        @click="$emit('close')"
        slot="left"
        name="cross"/>
    </van-nav-bar>

    <div class="scroll-wrap">
      <!--    当前评论项-->
      <comment-item :comment="comment"></comment-item>

      <!--    评论回复列表-->
      <van-cell title="全部回复"/>

      <comment-list
        :list="commentList"
        :source="comment.com_id"
        type="c"
      ></comment-list>
    </div>

<!--    发布评论-->
    <div class="post-wrap">
      <van-button
        @click="isPostShow=true"
        class="post-btn"
        size="small"
        round>写评论</van-button>
    </div>

    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        @post-success="onPostSuccess"
        :target="comment.com_id"/>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/comment-item'
import CommentList from '@/views/article/components/comment-list'
import CommentPost from '@/views/article/components/comment-post'

export default {
  name: 'CommentReply',
  props:{
    comment:{
      type:Object,
      required:true
    },
  },
  data(){
    return {
      isPostShow:false,
      commentList:[]
    }
  },
  components:{
    CommentItem,CommentList,CommentPost
  },
  methods:{
    onPostSuccess(data){
      console.log(data)
      this.comment.reply_count++;
      this.isPostShow=false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap{
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap{
  height: 88px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display:flex;
  align-items:center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn{
    width: 60%;
  }
}
</style>
