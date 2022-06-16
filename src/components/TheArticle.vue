<template>
  <div class="container mb-20 text-base-content">
    <div v-if="article" class="prose-lg text-justify">
      <div class=" flex flex-row 	">
        <div class="text-3xl self-center">{{ article.title }}</div>
        <!-- document-duplicate -->
        <button class="btn btn-ghost self-center ml-1 tooltip tooltip-primary	" data-tip="复制全文" @click="copyArticle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
          </svg>
        </button>
      </div>
      <div>{{ article.author }}</div>
      <div class="divider my-0"/>
      <div ref="htmlContent" v-html="article.htmlContent"></div>

      <div class="divider"></div>
      <button class="btn btn-outline w-full btn-primary" @click="goBack">返&nbsp;回</button>
    </div>
    <div v-else>
      <p>loading...</p>
    </div>

  </div>
</template>

<script>
import {fetchArticle} from "../api/api";

export default {
  name: "TheArticle",
  data() {
    return {
      article: null,
      // alter属性
      alterMessage: "",
      dismissCountDown: 0,
      dismissSecs: 2, //alter消失倒计时
    }
  },
  methods: {
    /**
     * 获取文章详情
     */
    fetchTheArticle: function () {
      let s = this.$route.params.s
      fetchArticle(s).then(res => {
        switch (res.status) {
          case 200:
            this.article = res.data
            break
          case 404:
            this.article = null
            break
          default:
            alert(res.statusText)
        }
      }).finally(() => document.body.scrollIntoView()) // 滚到顶端
    },
    /**
     * 点击复制作文
     */
    copyArticle: function () {
      this.$copyText(this.$refs.htmlContent.innerText, this.$refs.htmlContent)
    },
    /**
     * 返回上一页
     */
    goBack: function () {
      if (window.history.length <= 1) {
        this.$router.push("/")
      } else {
        this.$router.go(-1)
      }
    },


  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.article = null
      vm.fetchTheArticle()
    })
  },
}
</script>

<style scoped>
</style>