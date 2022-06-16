<template>
  <div class="card card-bordered drop-shadow-xl mx-2 my-3 w-fit text-base-content bg-base-300">
    <div class="card-body">
      <div>
        <h2 class="card-title line-clamp-1 ">{{ title }}</h2>
        <div class="block flex flex-row">
          <div class="line-clamp-1 cursor-pointer text-base-content hover:text-primary-focus  mb-2 "
             v-on:click="$emit('handleAuthorClick',author)">
            {{ author }}</div>
        </div>

        <p class="line-clamp-4 text-justify cursor-pointer hover:text-primary-focus" @click="openArticle">
          {{ brief }}
        </p>
        <div class="flex flex-wrap flex-row mt-2 ">
          <div v-for="(tag,index) in tags" :key="index" v-on:click="$emit('handleTagClick',tag)"
               class="mr-1 mb-1 block-inline cursor-pointer text-xs hover:text-primary-focus"> {{ tag }}<span
              v-if="index!=tags.length-1">,</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    id: Number,
    title: String,
    author: String,
    createTime: Number,
    brief: String,
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
      this.$router.push({path: `/articles/${this.title}`})
    },
  }
}
</script>

<style scoped>

.line-clamp-4 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}


</style>
