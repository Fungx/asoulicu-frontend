<template>
    <div id="app" class>
        <b-navbar toggleable="lg" variant="info">
            <b-container>
                <b-navbar-brand to="/">🥰</b-navbar-brand>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item>
                        <b-link to="/editor">
                            <b-icon-pencil alt="编辑器" title="编辑器" class="nav-icon"></b-icon-pencil>
                        </b-link>
                    </b-nav-item>
                    <b-nav-item v-b-modal="'modal-help'">
                        <b-icon-question-circle class="nav-icon"></b-icon-question-circle>
                    </b-nav-item>
                </b-navbar-nav>
            </b-container>
        </b-navbar>
        <b-modal id="modal-help" title="帮助" ok-only size="lg">
            <p>做了个小网站来存放一个魂儿们的小作文和定型文，因为第一次用vue和fastapi所以非常简陋，以后会继续改进的。</p>
            <p>欢迎大家使用jiaranicu@outlook.com投稿和联系，如果不愿意您的作品被收录也可以联系我删除。以下是准备添加的功能</p>
            <ul>
                <li>投稿界面</li>
                <li>多条件搜索</li>
            </ul>
            <hr>
            <p>谢谢大家,谢谢大家</p>
            <p>一个魂儿，一个魂儿在哪里？</p>
            <p>一个魂儿！！！</p>
            <p>这个小网站通过了嘛</p>
            <p>我可是…vue没有准备好</p>
            <p>我下次还会准备的</p>
            <p>果咩拿塞</p>
            <p>我，我写，写…我写错代码了</p>
            <p>我，我太紧张了</p>
            <p>果咩</p>
            <p>对不起</p>
            <p>我下次一定会</p>
            <p>一定会写好的</p>
            <p>呜呜呜…我的网站</p>
            <p>我不耽误大家的时间了</p>
            <p>嘤嘤</p>
            梗来源：<a target="_blank" href="https://www.bilibili.com/video/BV1FN411o7nt">可爱小向晚</a>
        </b-modal>
        <div class="page-content">
            <transition name="fade">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>

            </transition>
        </div>


    </div>
</template>

<script>
    import {BIconQuestionCircle, BIconPencil} from 'bootstrap-vue'

    export default {
        name: 'App',
        components: {
            BIconQuestionCircle, BIconPencil
        },
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .page-content {
        padding-top: 1%;
        padding-bottom: 5%;
    }

    .nav-icon {
        color: white;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
