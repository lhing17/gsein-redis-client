<template>
  <div :style="'width:' + width" class="inline">
    <el-button :icon="icon" @click="handleClick" type="text">
      <div>{{ name }}</div>
    </el-button>
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
}
</style>
