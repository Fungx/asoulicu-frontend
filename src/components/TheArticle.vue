<template xmlns:v="http://www.w3.org/1999/xhtml">
    <b-container>
        <b-form-input v-on:keyup.enter="searchArticles" v-model="kw" placeholder="按标签搜索，用空格隔开"></b-form-input>
        <scroll-view>
            <template>
                <b-row cols-lg="4" cols-sm="1">
                    <div v-for="item in articles" :key="item.id">
                        <b-col>
                            <ArticleCard class="article-card" v-bind="item" :key="item._id"></ArticleCard>
                        </b-col>
                    </div>
                </b-row>
            </template>
        </scroll-view>
        <h3 v-if="articles.length==0">没有符合条件的结果</h3>
    </b-container>

</template>

<script>
    import ArticleCard from './ArticleCard.vue'
    import {queryArticles} from "@/api/api";
    import {$scrollview} from 'vue-scrollview'

    export default {
        name: 'TheArticle',
        components: {
            ArticleCard
        },
        data() {
            return {
                articles: [],
                hasNext: true,
                kw: "",
                query: {},
                pageNum: -1,
                pageSize: 16
            }
        },
        methods: {
            fetchMoreArticles: function () {
                if (this.hasNext) {
                    let params = {pageNum: this.pageNum + 1, pageSize: this.pageSize}
                    params = Object.assign(params, this.query)// 合并查询参数
                    queryArticles(params).then(res => {
                        if (res.status == 200) {
                            this.hasNext = res.data.count == this.pageSize//是否还有更多
                            this.pageNum++
                            this.articles.push.apply(this.articles, res.data.articles)
                        }
                    })
                }
            },
            searchArticles: function () {
                // 重新开始搜索
                this.pageNum = 0
                this.hasNext = true
                this.query = {}
                let params = {pageNum: this.pageNum, pageSize: this.pageSize}
                if (this.kw)
                    this.query.tags = this.kw.trim().split(/\s+/).join(",")
                params = Object.assign(params, this.query)// 合并查询参数
                queryArticles(params).then(res => {
                    if (res.status == 200) {
                        this.hasNext = res.data.count == this.pageSize//是否还有更多
                        this.pageNum++
                        this.articles = res.data.articles
                    }
                })
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
        padding-top: 5%;
    }
</style>
