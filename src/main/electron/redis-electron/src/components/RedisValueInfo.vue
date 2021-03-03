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
      <div v-if="info.type==='string'">
        <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="info.value">
        </el-input>
        <el-button type="primary" @click="updateStringValue">保存</el-button>
      </div>
      <div v-if="info.type==='list'">
        <el-table border style="width: 100%" :data="info.value">
          <el-table-column
            prop="id"
            label="ID"
            type="index">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="updateListValue(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteListValue(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="info.type==='set'">
        <el-table border style="width: 100%" :data="info.value">
          <el-table-column
            prop="id"
            label="ID"
            type="index">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="updateSetValue(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteSetValue(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="info.type==='hash'">
        <el-table border style="width: 100%" :data="info.value">
          <el-table-column
            prop="id"
            label="ID"
            type="index">
          </el-table-column>
          <el-table-column
            prop="key"
            label="Key">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="updateHashValue(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteHashValue(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="info.type==='zset'">
        <el-table border style="width: 100%" :data="info.value">
          <el-table-column
            prop="id"
            label="ID"
            type="index">
          </el-table-column>
          <el-table-column
            prop="score"
            label="Score">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="updateZsetValue(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteZsetValue(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteKey, updateKey, updateStringValue, updateTtl} from '@/api/redis';

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
      originalKey: '',
      originalTtl: -1
    }
  },
  mounted() {
    this.originalKey = this.info.key
    this.originalTtl = this.info.ttl
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
          this.info.key = this.originalKey
        });
      }
    },
    updateTtl() {
      if (this.info.ttl <= 0) {
        this.$confirm('设置TTL<=0将删除该key，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteKey(this.info.connectionKey, this.info.database, this.originalKey).then(res => {
            console.log(res)
            if (res.data.code === 200) {
              const message = res.data.message
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
            }
          })
        })
      } else {
        updateTtl(this.info.connectionKey, this.info.database, this.originalKey, this.info.ttl).then(res => {
          if (res.data.code === 200) {
            this.originalTtl = this.info.ttl
            const message = res.data.message
            this.$message({
              showClose: true,
              message: message,
              type: 'success'
            })
          } else {
            this.info.ttl = this.originalTtl
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.content {
  margin-top: 30px
}
</style>
