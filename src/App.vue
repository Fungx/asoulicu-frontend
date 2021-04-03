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
            <p>欢迎大家使用jiaranicu@outlook.com投稿和联系，但是为了防止查水表过于黄暴的作品是不会收录的。如果不愿意您的作品被收录也可以联系我删除。</p>
            <p>下面是准备要做的功能</p>
            <ul>
                <li>投稿界面</li>
                <li>搜索</li>
            </ul>
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
    body{
        background: darkgray;
    }
</style>
