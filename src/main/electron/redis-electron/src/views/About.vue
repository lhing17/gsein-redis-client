<template>
  <div class="about">
    <h1>{{ $t('lang.about.name') }}</h1>
    <p>{{ $t('lang.about.power') }}</p>
    <p>{{ $t('lang.about.copyright') }}</p>
    <div>
      <el-button round>{{ $t('lang.about.checkUpdate') }}</el-button>
      <el-button round>{{ $t('lang.about.feedback') }}</el-button>
      <el-button round>{{ $t('lang.about.manual') }}</el-button>
      <el-button round>{{ $t('lang.about.projectHome') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  margin: 0 auto;
  width: 80%;
  text-align: left;
}
</style>
