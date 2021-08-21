<template xmlns:v="http://www.w3.org/1999/xhtml">
  <b-container>
    <b-row>
      <b-col cols="4" md="2">
        <b-form-select v-model="searchSelected" :options="searchOptions"></b-form-select>
      </b-col>
      <b-col cols="8" md="10">
        <b-form-input v-on:keyup.enter="searchArticles" v-model="kw" placeholder="搜索小作文,使用标签时用空格隔开"></b-form-input>
      </b-col>
    </b-row>
    <hr/>
    <b-row cols-xl="4" cols-lg="3" cols-md="2" cols-sm="1">
      <div v-for="item in articles" :key="item._id">
        <b-col>
          <ArticleCard class="article-card"
                       @handleAuthorClick="handleAuthorClick"
                       @handleTagClick="handleTagClick"
                       v-bind="item"
                       :key="item._id"></ArticleCard>
        </b-col>
      </div>
    </b-row>
    <h3 v-if="articles.length==0">没有符合条件的结果</h3>
    <hr>
    <div>
      <b-overlay :show="isLoading" rounded>
        <b-button v-if="hasNext" :disabled="isLoading" size="lg" block variant="outline-secondary"
                  @click="fetchMoreArticles">点击加载更多
        </b-button>
      </b-overlay>
    </div>

  </b-container>

</template>

<script>
import ArticleCard from './ArticleCard.vue'
import {queryArticles} from "@/api/api";
import {QueryParams} from "../store.js";

export default {
  name: 'TheArticleHome',
  components: {
    ArticleCard
  },
  data() {
    return {
      articles: [],
      hasNext: true,
      kw: "",
      query: QueryParams.state,
      pageNum: 0,
      pageSize: 32,
      isLoading: true,

      // search
      searchSelected: null,
      searchOptions: [
        {value: 'title', text: '标题'},
        {value: 'author', text: '作者'},
        {value: 'tags', text: '标签'}
      ]
    }
  },
  methods: {
    fetchMoreArticles: function () {
      if (this.hasNext) {
        this.isLoading = true
        let params = {pageNum: this.pageNum, pageSize: this.pageSize}
        params = Object.assign(params, this.query)// 合并查询参数
        queryArticles(params).then(res => {
          if (res.status == 200) {
            this.hasNext = res.data.count == this.pageSize//是否还有更多
            if (this.pageNum == 0) {
              // 从头搜索
              this.articles = res.data.articles
            } else {
              // 获取更多
              this.articles.push.apply(this.articles, res.data.articles)
            }
            this.pageNum++
          } else if (res.status == 429) {
            alert("请求太频繁了")
          } else {
            alert(res.statusText)
          }
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    searchArticles: function () {
      // 重新开始搜索
      this.pageNum = 0
      this.hasNext = true
      QueryParams.clear()
      let w = this.kw.trim()
      if (w) {
        switch (this.searchSelected) {
          case 'title':
            QueryParams.setTitle(w)
            break
          case 'author':
            QueryParams.setAuthor(w)
            break
          case 'tags':
            QueryParams.setTags(w.split(/\s+/).join(","))
            break
        }
      }
      this.fetchMoreArticles()
    },
    /**
     * 子组件点击tag，触发重新搜索
     * @param tag
     */
    handleTagClick: function (tag) {
      this.searchSelected = 'tags'
      this.kw = tag
      document.body.scrollIntoView() // 滚到顶端
      this.searchArticles()
    },
    /**
     * 子组件点击author，触发重新搜索
     * @param author
     */
    handleAuthorClick: function (author) {
      this.kw = author
      this.searchSelected = 'author'
      document.body.scrollIntoView() // 滚到顶端
      this.searchArticles()
    },
    changeQuery: function (mode, kw) {
      this.kw = kw
      this.searchSelected = mode
    }

  },
  mounted() {
    this.searchSelected = this.searchOptions[0].value
    // // 根据url查询参数筛选
    // let q = this.$route.query
    // if (q.author) {
    //   this.searchSelected='author'
    //   this.kw=q.author
    // }else if (q.title){
    //   this.searchSelected='title'
    //   this.kw=q.title
    // }
    this.searchArticles()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article-card {
  padding-top: 5%;
}

.load-btn {
  text-align: center;
  width: max-content;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
