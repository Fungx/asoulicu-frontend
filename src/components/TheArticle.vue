<template xmlns:v="http://www.w3.org/1999/xhtml">
    <scroll-view>
        <b-container v-if="articles">
            <template>
                <b-row cols-lg="4" cols-sm="1">
                    <div v-for="item in articles" :key="item.id">
                        <b-col>
                            <ArticleCard class="article-card" v-bind="item" :key="item._id"></ArticleCard>
                        </b-col>
                    </div>
                </b-row>
            </template>
        </b-container>
    </scroll-view>
</template>

<script>
    import ArticleCard from './ArticleCard.vue'
    import {listArticles} from "@/api/api";
    import {$scrollview} from 'vue-scrollview'

    export default {
        name: 'TheArticle',
        components: {
            ArticleCard
        },
        data() {
            return {
                articles: [],
                pageNum: 0,
                pageSize: 4,
                hasNext: true
            }
        },
        methods: {
            fetchMoreArticles: function () {
                if (this.hasNext) {
                    listArticles(this.pageNum, this.pageSize).then(res => {
                        if (res.status == 200) {
                            this.articles = this.articles.concat(res.data.articles)
                            this.hasNext = res.data.count >= this.pageSize
                        }
                    })
                } else {
                    console.debug("no more")
                }
            }
        },
        watch: {
            pageNum: {
                immediate: true,
                handler: function () {
                    this.fetchMoreArticles()
                }
            }
        },
        mounted() {
            $scrollview.onLastEntered = () => {
                this.pageNum++
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .article-card {
        padding-top: 6%;
    }
</style>
