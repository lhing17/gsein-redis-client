<template>
  <div class="inline">
    <el-tooltip class="item" effect="dark" :content="name" placement="top-start">
      <el-button :icon="icon" @click="handleClick" size="mini">
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
    name: {
      type: String,
      default: () => ''
    },
    width: {
      type: String,
      default: () => '10%'
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
</style>
