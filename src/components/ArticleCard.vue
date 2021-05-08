<template>
    <div>
        <b-card no-body class="shadow-sm">
            <b-card-body>
                <b-card-title class="title-limits">
                    {{title}}
                </b-card-title>
                <b-card-sub-title>

                </b-card-sub-title><p><span >{{author}}</span></p>
                <!--content-->
                <div style="cursor: pointer">
                    <b-card-text class="content-limits" @click="showModal">
                        {{plainContent}}
                    </b-card-text>
                </div>
                <!-- tags -->
                <hr>
                <div>
                    <a v-for="(tag,index) in tags" :key="index" v-on:click="$emit('clickTagToSearch',tag)" class="tag">{{tag}}</a>
                </div>
            </b-card-body>
        </b-card>
        <!--the article expanded-->
        <b-modal  :id="modalId" :title="title" ok-only lazy size="lg">
            <div class="ql-snow" v-html="htmlContent">{{htmlContent}}</div>
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
                htmlContent: "Loading"
            }
        },
        methods: {
            showModal: function () {
                this.htmlContent = "Loading"
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

    .tag {
        font-size: small;
        cursor: pointer;
        margin-right: 2%;
        display: inline-block;
    }
    .subtitle-date{
        width: 88px;
        display: inline-block;
    }

</style>
