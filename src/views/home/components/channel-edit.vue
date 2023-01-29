<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="isEdit=!isEdit"
        class="edit-btn"
        type="danger"
        plain
        size="mini"
        round>{{ isEdit?'完成':'编辑' }}
      </van-button>
    </van-cell>

    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        @click="onMyChannelClick(channel,index)"
        v-for="(channel,index) in myChannels"
        :key="index">
        <van-icon
          v-show="isEdit&&!fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"></van-icon>
        <span
          class="text"
          :class="{active:index===active}"
          slot="text">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>

    <!--    频道推荐-->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>

    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        class="grid-item"
        @click="onAddChannel(channel)"
        v-for="(channel,index) in recommendedChannels"
        :key="index"
        :text="channel.name"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels,addUserChannel,deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props:{
    myChannels:{
      type:Array,
      required:true
    },
    active:{
      type:Number,
      required: true
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods:{
    async loadAllChannels(){
      try{
        const {data} =await getAllChannels()
        this.allChannels=data.data.channels
      }catch (err){
        this.$toast("数据获取失败")
      }
    },
    async onAddChannel(channel){
      this.myChannels.push(channel)
      if (this.user){
        try{
          await addUserChannel({
            id:channel.id,
            seq:this.myChannels.length
          })
        }catch (err){
          this.$toast('保存失败，稍后重试')
        }
      }else{
        setItem('TOUTIAO_CHANNELS',this.myChannels)
      }
    },
    onMyChannelClick(channel,index){
      if(this.isEdit){
        //固定频道
        if (this.fiexdChannels.includes(channel.id)){
          return
        }
        this.myChannels.splice(index,1)
        //删除
        if (index<=this.active){
          this.$emit('update-active',this.active-1,true)
        }
        //持久化
        this.deleteChannel(channel)
      }else{
        // 切换频道
        this.$emit("update-active",index,false)
      }
    },
    async deleteChannel(channel){
      try{
        if (this.user){
          await deleteUserChannel(channel.id)
        }else{
          setItem('TOUTIAO_CHANNELS',this.myChannels)
        }
      }catch (err){
        this.$toast("操作失败，清稍后重试")
      }
    }
  },
  data(){
    return {
      allChannels:[],
      isEdit:false,//控制编辑状态
      fiexdChannels:[0]//固定频道
    }
  },
  computed:{
    recommendedChannels () {
      const channels=[]
      this.allChannels.forEach(channel=>{
        let ret=this.myChannels.find(myChannel=>myChannel.id===channel.id)
        if(!ret){
          channels.push(channel)
        }
      })
      return channels
    },
    ...mapState(["user"])
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,.text{
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active{
        color: red;
      }
      .van-grid-item__icon-wrapper{
        position: unset;
      }
    }
  }

  /deep/ .my-grid{
    .grid-item{
      .van-icon-clear{
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid{
    .grid-item{
      .van-grid-item__content{
        flex-direction: row;
        .van-icon-plus{
          font-size: 28px;
          margin-right: 6px;
        }

      }
    }
  }
}
</style>
