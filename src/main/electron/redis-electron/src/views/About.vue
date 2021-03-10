<template>
  <el-container>
    <el-header>
      <header-button class="header-button" icon-type="update" @click="checkUpdate"
                     :name="$t('lang.about.checkUpdate')"></header-button>
      <header-button class="header-button" icon-type="feedback" @click="openFeedbackDialog"
                     :name="$t('lang.about.feedback')"></header-button>
      <header-button class="header-button" icon-type="manual" @click="openManualPage"
                     :name="$t('lang.about.manual')"></header-button>
      <header-button class="header-button" icon-type="github" @click="openProjectPage"
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
    <el-dialog :title="$t('lang.dialog.messageTitle')" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form">
        <el-form-item :label="$t('lang.dialog.leaveMessage')" prop="message">
          <el-input type="textarea" v-model="form.message" :rows="5" resize="none" :placeholder="$t('lang.dialog.leaveMessageHolder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.dialog.contact')" prop="contact">
          <el-input v-model="form.contact" :placeholder="$t('lang.dialog.contactHolder')"></el-input>
        </el-form-item>
        <el-button @click="sendFeedback" type="primary">{{ $t('lang.dialog.submit') }}</el-button>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import LangDropdown from '@/components/LangDropdown';
import HeaderButton from '@/components/HeaderButton';

export default {
  name: 'About',
  components: {LangDropdown, HeaderButton},
  data() {
    return {
      form: {},
      dialogVisible: false
    }
  },
  methods: {
    openProjectPage() {
      require('electron').shell.openExternal('https://github.com/lhing17/gsein-redis-client')
    },
    openManualPage() {
      require('electron').shell.openExternal('https://github.com/lhing17/gsein-redis-client/wiki')
    },
    sendFeedback() {
      const success = this.$t('lang.dialog.success').toString()
      const message = this.$t('lang.dialog.thanksForFeedback').toString()
      this.dialogVisible = false
      this.$notify({
        title: success,
        message: message,
        type: 'success'
      });
    },
    checkUpdate() {
    },
    openFeedbackDialog() {
      this.dialogVisible = true
      this.form = {}
    }
  }
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
