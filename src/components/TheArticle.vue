<template xmlns:v="http://www.w3.org/1999/xhtml">
    <div class="page-content">
        <b-container v-if="articles">
            <b-row cols-lg="4" cols-sm="1">
                <div v-for="item in articles" :key="item.id" style="height: 100%;">
                    <b-col >
                        <ArticleCard class="article-card" v-bind="item"></ArticleCard>
                    </b-col>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import ArticleCard from './ArticleCard.vue'
    import {listArticles} from "@/api/api";

    export default {
        name: 'TheArticle',
        components: {
            ArticleCard
        },
        data() {
            return {
                articles: [],
                pageNum: 0,
                pageSize: 32,
                hasNext: true
            }
        },
        methods: {
            fetchArticles: function () {
                if (this.hasNext) {
                    listArticles(this.pageNum, this.pageSize).then(res => {
                        if (res.status == 200) {
                            this.articles.push.apply(this.articles,res.data.articles)
                            console.log(this.articles)
                            this.hasNext = res.data.count >= this.pageSize
                            this.pageNum++;
                        }
                    })
                }
            }
        },
        beforeMount: function () {
            this.fetchArticles()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .article-card {
        padding-top: 6%;
    }
</style>
