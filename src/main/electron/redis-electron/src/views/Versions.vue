<template>
  <el-container>
    <el-header>
      <lang-dropdown></lang-dropdown>
    </el-header>
    <el-main>
      <div class="versions">
        <h1>{{ $t('lang.versions.changelog') }}</h1>
        <h3>{{ $t('lang.versions.v1_0.title') }}</h3>
        <p>{{ $t('lang.versions.v1_0.content') }}</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import LangDropdown from '@/components/LangDropdown';

export default {
  name: 'Versions',
  components: {LangDropdown}
}
</script>

<style scoped>
.versions {
  margin: 0 auto;
  width: 80%;
  text-align: left;
}

.el-header {
  background: #f3f2f1;
}
</style>
