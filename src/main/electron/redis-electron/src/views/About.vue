<template>
  <el-container>
    <el-header>
      <header-button class="header-button" icon-type="update" @click="openConnectionDialog"
                     :name="$t('lang.about.checkUpdate')"></header-button>
      <header-button class="header-button" icon-type="feedback" @click="openConnectionDialog"
                     :name="$t('lang.about.feedback')"></header-button>
      <header-button class="header-button" icon-type="manual" @click="openConnectionDialog"
                     :name="$t('lang.about.manual')"></header-button>
      <header-button class="header-button" icon-type="github" @click="openConnectionDialog"
                     :name="$t('lang.about.projectHome')"></header-button>
      <lang-dropdown></lang-dropdown>
    </el-header>
    <el-main>
      <div class="about">
        <h1>{{ $t('lang.about.name') }}</h1>
        <p>{{ $t('lang.about.power') }}</p>
        <p>{{ $t('lang.about.copyright') }}</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import LangDropdown from '@/components/LangDropdown';
import HeaderButton from '@/components/HeaderButton';

export default {
  name: 'About',
  components: {LangDropdown, HeaderButton}
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

.header-button {
  line-height: 60px;
}
</style>
