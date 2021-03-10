<template>
  <el-container>
    <el-header>
      <lang-dropdown></lang-dropdown>
    </el-header>
    <el-main>
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
    </el-main>
  </el-container>
</template>

<script>
import LangDropdown from '@/components/LangDropdown';
export default {
  name: 'About',
  components: {LangDropdown}
}
</script>

<style scoped>
.el-header {
  background: #f3f2f1;
}
.about {
  margin: 0 auto;
  width: 80%;
  text-align: left;
}
</style>
