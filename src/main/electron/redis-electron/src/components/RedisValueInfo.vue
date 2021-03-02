<template>
  <div>
    <el-row>
      <el-col :span="9">
        <el-input placeholder="KeyName" v-model="info.key">
          <template slot="prepend">{{ info.type }}</template>
          <el-button slot="suffix" type="text" @click="updateKey" class="el-input__icon el-icon-check"></el-button>
        </el-input>
      </el-col>
      <el-col :span="9">
        <el-input placeholder="TTL" v-model="info.ttl">
          <template slot="prepend">TTL</template>
          <el-button slot="suffix" type="text" @click="updateTtl" class="el-input__icon el-icon-check"></el-button>
        </el-input>
      </el-col>
      <el-button type="danger" icon="el-icon-delete"></el-button>
      <el-button type="success" icon="el-icon-refresh"></el-button>
    </el-row>
    <div class="content">
      <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="info.value">
      </el-input>
      <el-button type="primary" @click="updateStringValue">保存</el-button>
    </div>
  </div>
</template>

<script>
import {updateKey, updateStringValue} from '@/api/redis';

export default {
  name: 'RedisValueInfo',
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
      originalKey: ''
    }
  },
  mounted() {
    this.originalKey = this.info.key
    console.log(this.originalKey)
  },
  methods: {
    updateStringValue() {
      const info = this.info
      updateStringValue(info.connectionKey, info.database, this.originalKey, info.value).then(res => {
        if (res.data.code === 200) {
          const message = res.data.message
          this.$message({
            showClose: true,
            message: message,
            type: 'success'
          })
        }
      })
    },
    updateKey() {
      if (this.info.key !== this.originalKey) {
        this.$confirm(`是否将key由${this.originalKey}修改为${this.info.key}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateKey(this.info.connectionKey, this.info.database, this.originalKey, this.info.key).then(res => {
            if (res.data.code === 200) {
              const message = res.data.message
              this.originalKey = this.info.key

              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '修改失败'
          });
        });
      }
    },
    updateTtl() {
    }
  }
}
</script>

<style scoped>
.content {
  margin-top: 30px
}
</style>
