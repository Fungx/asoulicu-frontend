<template>
  <b-container>
    <div v-if="article">
      <b-row>
        <b-col cols="9">
          <h2><span>{{ article.title }}</span></h2>
        </b-col>
        <b-col cols="3" class="detail-toolbar">
          <h2>
            <BIconFileEarmarkText class="click-btn" @click="copyArticle" title="复制全文"></BIconFileEarmarkText>
          </h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h5>{{ article.author }}</h5>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col>
          <div ref="htmlContent" v-html="article.htmlContent"></div>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col>
          <b-button size="lg" block variant="outline-secondary" @click="goBack">
            <BIconBoxArrowLeft></BIconBoxArrowLeft>&nbsp;点击返回
          </b-button>

        </b-col>
      </b-row>
    </div>
    <div v-else>
      Loading...
    </div>
    <b-alert :show="dismissCountDown" variant="success" class="position-fixed fixed-bottom m-0 rounded-0" fade
             style="z-index: 2000;"
             @dismiss-count-down="countDownChanged"
             dismissible>
      {{ alterMessage }}
    </b-alert>
  </b-container>
</template>

<script>
import {fetchArticle} from "../api/api";
import {BIconFileEarmarkText, BIconBoxArrowLeft} from "bootstrap-vue";

export default {
  name: "TheArticle",
  components: {BIconFileEarmarkText, BIconBoxArrowLeft},
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
      }).finally(()=>document.body.scrollIntoView()) // 滚到顶端
    },
    /**
     * 点击复制作文
     */
    copyArticle: function () {
      this.$copyText(this.$refs.htmlContent.innerText, this.$refs.htmlContent)
          .then(() => {
            this.showAlert(`已复制《${this.article.title}》`)
          }, () => {
            this.showAlert(`复制失败`)
          })
    },
    /**
     * 返回上一页
     */
    goBack: function () {
      this.$router.go(-1)
    },

    /**
     * 控制alter时间
     * @param dismissCountDown 消失倒计时
     */
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(message) {
      this.alterMessage = message
      this.dismissCountDown = this.dismissSecs
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchTheArticle()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.article = null
    next()
  }


}
</script>

<style scoped>
.detail-toolbar {
  display: flex;
  justify-content: flex-end;
}
</style>