<template>
  <div class="navbar text-base-content shadow">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost normal-case text-xl text-primary">asoul.icu</router-link>
    </div>
    <div class="flex-none">
      <!-- theme -->
      <div class="form-control ">
        <label class="label cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
          <input type="checkbox" data-toggle-theme="cupcake,night" data-act-class="ACTIVECLASS"
                 class="toggle toggle-primary" checked/>
        </label>
      </div>

      <!-- modal-help -->
      <label for="modal-help" class="btn btn-ghost modal-button">
        <!--question-mark-circle-->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </label>
    </div>
    <input type="checkbox" id="modal-help" class="modal-toggle"/>
    <label class="modal cursor-pointer modal-bottom sm:modal-middle" for="modal-help">
      <label class="modal-box relative">
        <h3 class="text-2xl font-bold">介绍</h3>
        <p>做了个小网站来存放大家的小作文，主要来自B站评论区、S1、A吧(
          <del>事实上基本变成了S1-A综小作文收集站</del>
          )，没什么标准，一般看到就会偷进来。
        </p>
        <p>如果你也有想分享的作文，欢迎大家使用jiaranicu@outlook.com投稿和联系，如果不愿意您的作品被收录也可以联系我删除。</p>
        <div class="modal-action">
          <label for="modal-help" class="btn btn-primary">关闭</label>
        </div>
      </label>
    </label>
  </div>

</template>

<script>
import {themeChange} from 'theme-change'
import {onMounted} from "vue";

export default {
  name: "TheNavBar",
  setup() {
    onMounted(() => {
      themeChange(false)
    })
  }
}
</script>

<style scoped>
</style>
