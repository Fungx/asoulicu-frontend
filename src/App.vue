<template>
  <div id="app">
    <TheNavBar></TheNavBar>
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
import TheNavBar from "@/components/TheNavBar";

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

.page-content {
  padding-top: 1em;
  padding-bottom: 2em;
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

.click-btn {
  color: dimgray;
  cursor: pointer;
}

.click-btn:hover {
  color: #2c3e50;
}

</style>
