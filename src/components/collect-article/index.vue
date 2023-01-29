<template>
  <van-button :loading="loading">
    <van-icon
      @click="onCollect"
      :color="value?'#ffa500':''"
      :name="value?'star':'star-o'"
    />
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        setTimeout(()=>{
          this.$toast.success(this.value?'收藏成功':'取消收藏')
        },0)
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>

<style scoped lang="less">

</style>
