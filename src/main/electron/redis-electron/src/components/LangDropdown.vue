<template>
  <el-dropdown trigger="click" class="lang" @command="onChangeLang">
    <header-button class="header-button" icon-type="i18n"
                   :name="$t('lang.header.switchLanguage')"></header-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh_CN">简体中文</el-dropdown-item>
      <el-dropdown-item command="en_US">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import HeaderButton from '@/components/HeaderButton';

export default {
  name: 'LangDropdown',
  components: {HeaderButton},
  methods: {
    onChangeLang(e) {
      this.$i18n.locale = e
    }
  }
}
</script>

<style scoped>
.lang {
  float: left;
  line-height: 60px;
}
</style>
