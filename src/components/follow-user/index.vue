<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="followLoading"
    @click="onFollow"
  >已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    @click="onFollow"
  >关注
  </van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId:{
      type:[Number,String,Object],
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow () {
      try {
        this.followLoading = true
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed')
      } catch (err) {
        let msg = '操作失败，重试'
        if (err.response && err.response.status === 400) {
          msg = '不能关注自己'
        }
        this.$toast(msg)
      }
      this.followLoading = false
    }
  }
}
</script>

<style scoped>

</style>
