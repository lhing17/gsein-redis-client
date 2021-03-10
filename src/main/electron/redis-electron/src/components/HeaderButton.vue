<template>
  <div class="inline">
    <el-tooltip class="item" effect="dark" :content="name" placement="top-start">
      <el-button :icon="icon" @click="handleClick" size="mini" :disabled="disabled">
        <i :class="'iconfont icon-' + iconType" v-if="icon===''"></i>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'HeaderButton',
  data() {
    return {}
  },
  props: {
    icon: {
      type: String,
      default: () => ''
    },
    iconType: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      default: () => ''
    },
    width: {
      type: String,
      default: () => '10%'
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.inline {
  float: left;
  margin-right: 10px;
}

.el-button--mini {
  font-size: 15px;
  padding: 7px 10px;
}

.el-button {
  color: #000000;
  border-radius: 6px;
}

.el-button.is-disabled {
  color: #C0C4CC;
}
</style>
