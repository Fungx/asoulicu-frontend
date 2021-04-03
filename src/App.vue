<template>
    <div id="app" class>
        <b-navbar toggleable="lg" variant="info">
            <b-container>
                <b-navbar-brand href="#">🍬🥰</b-navbar-brand>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#" v-b-modal="'modal-help'">?</b-nav-item>
                </b-navbar-nav>
            </b-container>
        </b-navbar>
        <b-modal id="modal-help" title="帮助" ok-only size="lg">
            <p>做了个小网站来存放一个魂儿们的小作文和定型文，因为第一次用flask和vue所以非常简陋，以后会继续改进的。</p>
            <p>欢迎大家使用jiaranicu@outlook.com投稿和联系，但是为了防止查水表过于黄暴的作品是不会收录的。如果不愿意您的作品被收录也可以联系我删除。以下是准备添加的功能</p>
            <ul>
                <li>投稿界面</li>
                <li>搜索</li>
            </ul>
            <hr>
            <p>谢谢大家,谢谢大家</p>
            <p>一个魂儿，一个魂儿在哪里？</p>
            <p>一个魂儿！！！</p>
            <p>这个小网站通过了嘛</p>
            <p>我可是…技术没有准备好</p>
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
            梗来源：<a href="https://www.bilibili.com/video/BV1FN411o7nt">可爱小向晚</a>



        </b-modal>
        <div class="page-content">
            <TheArticle/>
        </div>


    </div>
</template>

<script>
    import TheArticle from './components/TheArticle.vue'

    export default {
        name: 'App',
        components: {
            TheArticle
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    body {
        background: darkgray;
    }

    .page-content {
        padding-top: 3%;
        padding-bottom: 5%;
    }
</style>
