<template>
  <div class="versions">
    <h1>{{ $t('lang.versions.changelog') }}</h1>
    <h3>{{ $t('lang.versions.v1_0.title') }}</h3>
    <p>{{ $t('lang.versions.v1_0.content') }}</p>
  </div>
</template>

<script>
export default {
  name: 'Versions'
}
</script>

<style scoped>
.versions {
  margin: 0 auto;
  width: 80%;
  text-align: left;
}
</style>
