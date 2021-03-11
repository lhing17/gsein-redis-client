<template>
  <div>
    <el-input type="textarea" :value="content" :rows="10" readonly resize="none"></el-input>
    <el-input placeholder="输入Redis命令后，按Enter键执行，上下键切换历史"
              v-model="command"
              @keyup.enter.native="onSubmit"
              @keyup.up.native="onPressUp"
              @keyup.down.native="onPressDown"></el-input>
  </div>
</template>

<script>
import {sendCommand} from '@/api/redis';

export default {
  name: 'RedisTerminal',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      content: '',
      history: [], // 过去执行的命令
      command: '',
      currentIndex: -1
    }
  },
  methods: {
    onSubmit() {
      this.content = this.content + '>' + this.command + '\n'
      this.history.push(this.command)
      this.currentIndex = this.history.length
      console.log(this.info)
      sendCommand(this.info.key, this.info.database, this.command).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          const result = res.data.data
          if (result instanceof Array) {
            result.forEach(r => {
              this.content = this.content + r + '\n'
            })
          } else if (result instanceof Object) {
            Object.keys(result).forEach(k => {
              this.content = this.content + k + '\n'
              this.content = this.content + result[k] + '\n'
            })
          } else {
            this.content = this.content + result + '\n'
          }
        }
      })
      this.command = ''
    },
    onPressUp() {
      if (this.history.length !== 0) {
        this.currentIndex--;
        if (this.currentIndex < 0) {
          this.currentIndex = 0
        }
        this.command = this.history[this.currentIndex]
      }
    },
    onPressDown() {
      if (this.history.length !== 0) {
        this.currentIndex++;
        if (this.currentIndex >= this.history.length) {
          this.currentIndex = this.history.length - 1
        }
      }
      this.command = this.history[this.currentIndex]
    }
  },
  mounted() {
    this.content = `>${this.info.host}@${this.info.port} connected\n`
  }
}
</script>

<style scoped>

</style>
