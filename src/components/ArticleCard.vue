<template>
    <div>
        <b-card no-body class="shadow-sm">
            <b-card-body>
                <b-card-title class="title-limits">
                    {{title}}
                </b-card-title>
                <b-card-sub-title>
                </b-card-sub-title>
                <p><span>{{author}}</span></p>
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
        <b-modal :id="modalId" ok-only lazy size="lg">
            <template #modal-header>
                <div class="mod-header">
                    <h4>{{title}}
                        <b-icon-file-earmark-text @click="copyArticle"
                                                  style="cursor: pointer"
                                                  title="复制全文"></b-icon-file-earmark-text>
                    </h4>
                    <h6>{{author}}</h6>
                </div>
            </template>
            <!-- body -->
            <div ref="content" v-html="htmlContent">{{htmlContent}}</div>
        </b-modal>


    </div>
</template>

<script>
    import {fetchArticleHTML} from '../api/api'
    import {BIconFileEarmarkText} from 'bootstrap-vue'

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
        components: {BIconFileEarmarkText},
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
            },
            copyArticle: function () {
                //必须要加this.$refs.content才能在modal中复制
                this.$copyText(this.$refs.content.innerText, this.$refs.content)
                    .then(() => {
                        this.$emit("showAlert",`已复制《${this.title}》`)
                    }, (e) => {
                        this.$emit("showAlert",`复制失败`)
                        console.log(e)
                    })
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

    .mod-header {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }


</style>
