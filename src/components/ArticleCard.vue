<template>
  <div>
    <b-card no-body class="shadow-sm">
      <b-card-body>
        <b-card-title class="title-limits">
          {{ title }}
        </b-card-title>
        <b-card-sub-title>
        </b-card-sub-title>
        <p class="click-btn" v-on:click="$emit('handleAuthorClick',author)"><span>{{ author }}</span></p>
        <!--content-->
        <div style="cursor: pointer">
          <b-card-text class="content-limits" @click="openArticle">
            {{ plainContent }}
          </b-card-text>
        </div>
        <!-- tags -->
        <hr>
        <div>
          <a v-for="(tag,index) in tags" :key="index" v-on:click="$emit('handleTagClick',tag)"
             class="card-tag">{{ tag }}</a>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    _id: String,
    title: String,
    author: String,
    submissionTime: Number,
    plainContent: String,
    tags: Array
  },
  data() {
    return {
      htmlContent: "Loading"
    }
  },
  methods: {
    /**
     * 打开文章，跳转到详细页
     */
    openArticle: function () {
      this.$router.push({path: `articles/${this.title}`})
    },
  },
  computed: {

    submissionDate() {
      let date = new Date(this.submissionTime * 1000)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  }
}
</script>

<style scoped>
.content-limits {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.title-limits {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.mod-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.mod-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/*小卡片样式*/
.card-tag {
  font-size: small;
  cursor: pointer;
  margin-right: 2%;
  display: inline-block;
}

</style>
