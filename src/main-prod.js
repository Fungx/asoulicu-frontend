// import Vue from 'vue'
import App from './App.vue'
// uses CDN
// import axios from 'axios'
// import {BootstrapVue} from 'bootstrap-vue'
// import VueRouter from 'vue-router'
// import VueClipboard from "vue-clipboard2";

// Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(VueRouter)
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.config.productionTip = false

// Router

const routes = [
    {
        path: '/editor',
        component: () => import("@/components/TheEditor"), // 按需加载路由
        keepAlive: true
    },
    {
        path: '/',
        redirect: '/articles',
    },
    {
        path: '/articles',
        component: () => import("@/components/TheArticlesHome"),
        keepAlive: true
    },
    {
        path: '/articles/:s',
        component: () => import("@/components/TheArticle"),
        keepAlive: true
    }]
const router = new VueRouter({
    mode: 'history',
    routes: routes
})
//
new Vue({
    render: h => h(App), router
}).$mount('#app')
