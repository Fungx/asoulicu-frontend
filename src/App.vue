<template>
  <div id="app">
    <TheNavBar></TheNavBar>
    <router-view class="mt-6" v-slot="{Component}">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>

import TheNavBar from "./components/TheNavBar";

export default {
  name: 'App',
  components: {
    TheNavBar
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


</style>
