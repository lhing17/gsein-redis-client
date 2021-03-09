<template>
  <div id="app">
<!--    <home></home>-->
    <div id="nav">
      <router-link to="/">{{ $t('lang.connection') }}</router-link> |
      <router-link to="/cheatsheet">{{ $t('lang.cheatsheet') }}</router-link> |
      <router-link to="/versions">{{ $t('lang.versions') }}</router-link> |
      <router-link to="/about">{{ $t('lang.about') }}</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
#nav
  background #f3f2f1
  padding 10px 0
</style>
<script>
export default {
}
</script>
