<template xmlns:v="http://www.w3.org/1999/xhtml">
    <b-container>
        <b-form-input v-on:keyup.enter="searchArticles" v-model="kw" placeholder="按标签搜索，用空格隔开"></b-form-input>
        <b-row cols-xl="4" cols-lg="3" cols-md="2" cols-sm="1">
            <div v-for="item in articles" :key="item._id">
                <b-col>
                    <ArticleCard @showAlert="showAlert" class="article-card" @clickTagToSearch="clickTagToSearch"
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
        <b-alert :show="dismissCountDown" variant="success" class="position-fixed fixed-bottom m-0 rounded-0" fade
                 style="z-index: 2000;"
                 @dismiss-count-down="countDownChanged"
                 dismissible>
            {{alterMessage}}
        </b-alert>
    </b-container>

</template>

<script>
    import ArticleCard from './ArticleCard.vue'
    import {queryArticles} from "@/api/api";

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
                pageNum: 0,
                pageSize: 32,
                isLoading: true,
                // alter属性
                alterMessage: "",
                dismissCountDown: 0,
                dismissSecs: 2 //alter消失倒计时
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert(message) {
                this.alterMessage = message
                this.dismissCountDown = this.dismissSecs
            },
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
                this.query = {}
                if (this.kw)
                    this.query.tags = this.kw.trim().split(/\s+/).join(",")
                this.fetchMoreArticles()
            },
            /**
             * 子组件点击tag，触发重新搜索
             * @param tag
             */
            clickTagToSearch: function (tag) {
                this.kw = tag
                document.body.scrollIntoView() // 滚到顶端
                this.searchArticles()
            }
        },
        mounted() {
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
