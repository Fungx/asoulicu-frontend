import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import VueClipboard from "vue-clipboard2";
import './assets/app.css'

VueClipboard.config.autoSetContainer = true


// Router
const router = createRouter({
    history: createWebHistory(),
    routes: [
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
})

const app = createApp(App).use(router).use(VueClipboard)
app.mount('#app')

