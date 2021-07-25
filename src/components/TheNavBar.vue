<template>
  <div>
    <b-navbar variant="info">
      <b-container>
            <b-navbar-brand to="/articles">🥰</b-navbar-brand>
          <b-navbar-nav class="ml-auto nav-toolbar" >
            <b-nav-item v-b-modal="'modal-help'">
              <b-icon-question-circle title="帮助" class="nav-icon"></b-icon-question-circle>
            </b-nav-item>
          </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-modal id="modal-help" title="帮助" ok-only size="lg">
      <p>做了个小网站来存放大家的小作文，主要来自B站评论区、S1、A吧，没什么标准，一般看到就会偷进来。</p>
      <p>如果你也有想分享的作文，欢迎大家使用jiaranicu@outlook.com投稿和联系，如果不愿意您的作品被收录也可以联系我删除。</p>
      <hr>
      <h5>使用方法</h5>
      <ul>
        <li>上方搜索栏可以选择“标题”，“作者”或“标签”，按回车搜索。其中标签搜索需要输入完整的名称，
          多个标签用空格隔开（比如“嘉然 向晚”，会显示包含这两个标签的文章）
        </li>
        <li>点击小卡片上的作者或标签，也可以直接搜索</li>
        <li>想要显示全部内容，可以 直接刷新 或者 将搜索栏清空再搜索</li>
        <li>点击小作文标题旁的
          <b-icon-file-earmark-text/>
          可以直接复制全文
        </li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
import {BIconQuestionCircle, BIconFileEarmarkText} from 'bootstrap-vue'

export default {
  name: "TheNavBar",
  components: {BIconQuestionCircle, BIconFileEarmarkText}
}
</script>

<style scoped>
.nav-toolbar{
  display: flex;
  justify-content: flex-end;
}
</style>
