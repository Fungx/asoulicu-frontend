<template>
    <div>
        <b-card no-body>
            <b-card-body>
                <b-card-title class="title-limits">
                    {{title}}
                </b-card-title>
                <b-card-sub-title>
                    <p>{{author}} &nbsp;&nbsp;{{submissionDate}}</p>
                </b-card-sub-title>
                <!--content-->
                <div style="cursor: pointer">
                    <b-card-text class="text-limits" @click="showModal">
                        {{plainContent}}
                    </b-card-text>
                </div>
                <!-- tags -->
                <hr>
                <div>
                    <a href="#" v-for="(tag,index) in tags" :key="index" style="font-size: small">{{tag}}&nbsp;</a>
                </div>
            </b-card-body>
        </b-card>

        <!--expanded article-->
        <b-modal :id="modalId" :title="title" ok-only lazy size="lg">
            <div v-html="htmlContent">{{htmlContent==null?"Loading...":htmlContent}}</div>
        </b-modal>
    </div>
</template>

<script>
    import {fetchArticleHTML} from '../api/api'

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
                htmlContent: null
            }
        },
        methods: {
            showModal: function () {
                fetchArticleHTML(this._id).then(res => {
                    if (res.status == 200) {
                        this.htmlContent = res.data.htmlContent
                    }
                })
                this.$bvModal.show('modal-article-' + this._id)
            }
        },
        computed: {
            modalId() {
                return 'modal-article-' + this._id
            },
            submissionDate() {
                let date = new Date(this.submissionTime * 1000)
                return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
            }
        }
    }
</script>

<style scoped>
    .text-limits {
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
</style>
