import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from "vue-axios";
import {BootstrapVue} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueClipboard from "vue-clipboard2";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.config.productionTip = false

// Router
import TheEditor from "@/components/TheEditor";
import TheArticle from "@/components/TheArticle";

const routes = [
    {
        path: '/editor',
        component: TheEditor,
        keepAlive: true
    },
    {
        path: '/',
        component: TheArticle,
        keepAlive: true
    }]
const router = new VueRouter({mode: 'history', routes: routes})
//
new Vue({
    render: h => h(App), router
}).$mount('#app')
