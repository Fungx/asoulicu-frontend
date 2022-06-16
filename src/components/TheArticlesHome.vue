<template xmlns:v="http://www.w3.org/1999/xhtml">
  <div class="container mx-auto text-base-content">
    <!--query input-->
    <div class="block flex flex-row mb-2 ">

      <!--tag select-->
      <div class="dropdown">
        <!--        <label tabindex="0" class="select select-sm w-full select-bordered">Tags</label>-->
        <label tabindex="0" class="select select-sm w-full select-bordered "
               onclick="this.parentElement.classList.toggle('dropdown-open');document.activeElement.blur()">Tags</label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-max">
          <li v-for="tag in tagOptions" :key="`tag-${tag}`">
            <label class="label cursor-pointer">
              <label :for="`tag-${tag}`" class="label-text block-inline">{{ tag }}</label>
              <input :id="`tag-${tag}`" type="checkbox" :value="tag" class="checkbox checkbox-xs checkbox-primary"
                     v-model="query.tags"/>
            </label>
          </li>
        </ul>
      </div>
      <!--kw-->
      <input type="text" placeholder="输入 标题/作者/正文 搜索小作文,按回车确定"
             class="input input-sm w-full input-bordered flex-initial" v-model="kw"
             v-on:keyup.enter="searchArticles"/>

      <button class="btn btn-square btn-sm btn-ghost flex-none" @click="clearQuery();searchArticles()"
              :class="{'animate-spin':isLoading}" name="clearBtn">
        <!--refresh-->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      </button>
    </div>

    <!-- article cards -->
    <div class="divider"/>
    <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <ArticleCard v-for="item in articles" v-bind="item" :key="item.id"
                   @handleAuthorClick="handleAuthorClick"
                   @handleTagClick="handleTagClick"></ArticleCard>
    </div>
    <div class="text-center text-3xl" v-if="articles.length==0">没有符合条件的结果。</div>
    <div v-else>
      <button class="btn btn-outline w-full btn-primary my-6 self-center" :disabled="isLoading" :class="{loading:isLoading}" v-if="hasNext"
              @click="fetchMoreArticles">
        加载更多
      </button>
      <div v-else class="divider">已经没有了捏</div>
    </div>

  </div>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
import {queryArticles, fetchTags} from "@/api/api";

export default {
  name: 'TheArticleHome',
  components: {
    ArticleCard,
  },
  data() {
    return {
      articles: [],
      hasNext: true,
      kw: "",
      query: {
        kw: null,
        tags: []
      },
      pageNum: 1, // 第一页下标页码为1
      pageSize: 48,
      isLoading: true,
      tagOptions: []
    }
  },
  methods: {
    fetchMoreArticles: function () {
      if (this.hasNext) {
        this.isLoading = true
        let params = {pageNum: this.pageNum, pageSize: this.pageSize}
        params = Object.assign(params, this.query)// 合并查询参数
        params.tags = params.tags.toString()
        queryArticles(params).then(res => {
          if (res.status == 200) {
            this.hasNext = res.data.articles.length == this.pageSize//是否还有更多
            if (this.pageNum == 1) {
              // 第一次搜索
              this.articles = res.data.articles
            } else if (this.pageNum > 1) {
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
      this.pageNum = 1
      this.hasNext = true
      if (this.kw)
        this.kw = this.kw.trim()
      this.query.kw = this.kw
      this.fetchMoreArticles()
    },

    fetchTagItems: function () {
      fetchTags().then(res => {
        if (res.status == 200) {
          this.tagOptions = res.data.tags.map(item => {
            return item.name
          })
        } else {
          console.log(res.statusText)
        }
      })
    },
    /**
     * 子组件点击tag，触发重新搜索
     * @param tag
     */
    handleTagClick: function (tag) {
      this.clearQuery()
      this.query.tags.push(tag)
      document.body.scrollIntoView() // 滚到顶端
      this.searchArticles()
    },
    /**
     * 子组件点击author，触发重新搜索
     * @param author
     */
    handleAuthorClick: function (author) {
      this.kw = author
      document.body.scrollIntoView() // 滚到顶端
      this.searchArticles()
    },
    /**
     * 点击添加tag
     * */
    handleTagOptionClick: function (tag) {
      this.query.tags.push(tag)
    },

    clearQuery: function () {
      this.kw = ''
      this.query = {
        kw: null,
        tags: []
      }
      // this.searchArticles()
    },

  },
  mounted() {
    this.fetchTagItems()
    this.searchArticles()
  },
}
</script>

<style scoped>
</style>
