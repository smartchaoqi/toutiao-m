<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        @focus="isResultShow=false"
        background="#3296fa"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <search-result
      :search-text="searchText"
      v-if="isResultShow"></search-result>
    <search-suggestion
      @search="onSearch"
      :search-text="searchText"
      v-else-if="searchText"></search-suggestion>
    <search-history
      @search="onSearch"
      @clear-search-histories="searchHistories=[]"
      :search-histories="searchHistories"
      v-else></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchResult from '@/views/search/components/search-result'
import SearchSuggestion from '@/views/search/components/search-suggestion'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: "SearchPage",
  components: {
    SearchHistory,SearchResult,SearchSuggestion
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow:false,
      searchHistories:getItem('search-histories')||[]
    };
  },
  computed: {},
  watch: {
    searchHistories(val){
      setItem('search-histories', val)
    }
  },
  created() {},
  methods: {
    onSearch(val) {
      const index=this.searchHistories.indexOf(val)
      if (index!==-1){
        this.searchHistories.splice(index,1)
      }
      this.searchHistories.unshift(val)
      this.searchText=val
      this.isResultShow=true
    },
    onCancel() {
      this.$router.back()
    },
  },
};
</script>

<style scoped lang="less">
.search-container{
  padding-top: 108px;
  .van-search__action{
    color: #fff;
  }
  .search-form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
