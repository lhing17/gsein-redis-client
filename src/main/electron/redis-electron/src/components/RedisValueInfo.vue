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
      <el-button type="danger" icon="el-icon-delete" @click="deleteKey"></el-button>
      <el-button type="success" icon="el-icon-refresh" @click="refreshData"></el-button>
    </el-row>
    <div class="content">
      <div v-if="info.type==='string'">
        <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="info.value">
        </el-input>
        <el-button type="primary" @click="updateStringValue">保存</el-button>
      </div>
      <div v-if="info.type==='list'">
        <div class="table-title">
          <el-button icon="el-icon-plus" circle @click="showAddDialog"></el-button>
        </div>
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
              <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteListValue(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="info.type==='set'">
        <div class="table-title">
          <el-button icon="el-icon-plus" circle @click="showAddDialog"></el-button>
        </div>
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
              <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteSetValue(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="info.type==='hash'">
        <div class="table-title">
          <el-button icon="el-icon-plus" circle @click="showAddDialog"></el-button>
        </div>
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
              <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteHashValue(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="info.type==='zset'">
        <div class="table-title">
          <el-button icon="el-icon-plus" circle @click="showAddDialog"></el-button>
        </div>
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
              <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteZsetValue(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="dialogType==='add' ? '添加新行': '修改行'" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="80px" v-if="info.type==='list' || info.type === 'set'">
        <el-input v-show="false" :value="form.index"></el-input>
        <el-form-item label="Value">
          <el-input v-model="form.value" placeholder="" type="textarea" :autosize="{ minRows: 3 }"></el-input>
        </el-form-item>
        <el-button @click="closeDialog">取消</el-button>
        <el-button @click="addListValue" type="primary" v-if="dialogType==='add' && info.type==='list'">确定</el-button>
        <el-button @click="addSetValue" type="primary" v-if="dialogType==='add' && info.type==='set'">确定</el-button>
        <el-button @click="updateListValue" type="primary" v-if="dialogType==='edit' && info.type==='list'">确定
        </el-button>
        <el-button @click="updateSetValue" type="primary" v-if="dialogType==='edit' && info.type==='set'">确定</el-button>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px" v-if="info.type==='hash' || info.type === 'zset'">
        <el-input v-show="false" :value="form.index"></el-input>
        <el-form-item v-if="info.type==='hash'" label="Field">
          <el-input v-model="form.field" placeholder="" :disabled="dialogType==='edit'"></el-input>
        </el-form-item>
        <el-form-item v-if="info.type==='zset'" label="Score">
          <el-input v-model="form.field" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="Value">
          <el-input v-model="form.value" placeholder="" type="textarea" :autosize="{ minRows: 3 }"
                    :disabled="info.type==='zset' && dialogType==='edit'"></el-input>
        </el-form-item>
        <el-button @click="closeDialog">取消</el-button>
        <el-button @click="addHashValue" type="primary" v-if="dialogType==='add' && info.type==='hash'">确定</el-button>
        <el-button @click="addZsetValue" type="primary" v-if="dialogType==='add' && info.type==='zset'">确定</el-button>
        <el-button @click="updateHashValue" type="primary" v-if="dialogType==='edit' && info.type==='hash'">确定
        </el-button>
        <el-button @click="updateZsetValue" type="primary" v-if="dialogType==='edit' && info.type==='zset'">确定
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  addHashValue,
  addListValue, addSetValue, addZsetValue, deleteHashValue,
  deleteKey,
  deleteListValue, deleteSetValue, deleteZsetValue, updateHashValue,
  updateKey,
  updateListValue, updateSetValue,
  updateStringValue,
  updateTtl, updateZsetValue
} from '@/api/redis';

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
      originalValue: '',
      originalTtl: -1,
      form: {
        field: '',
        value: '',
        index: 0
      },
      dialogVisible: false,
      dialogType: 'add'
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
          this.deleteKey()
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
    },
    showAddDialog() {
      this.dialogType = 'add'
      this.dialogVisible = true
      this.form.value = ''
      this.form.index = -1
      this.form.field = ''
    },
    showEditDialog(row, index) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.form.value = row.value
      if (this.info.type === 'zset') {
        this.form.field = row.score
      } else {
        this.form.field = row.key
      }
      this.form.index = index;
      this.originalValue = row.value
    },
    addListValue() {
      addListValue(this.info.connectionKey, this.info.database, this.originalKey, this.form.value)
        .then(res => this.showMessageAndRefreshData(res))
    },
    addSetValue() {
      addSetValue(this.info.connectionKey, this.info.database, this.originalKey, this.form.value)
        .then(res => this.showMessageAndRefreshData(res))
    },
    addHashValue() {
      addHashValue(this.info.connectionKey, this.info.database, this.originalKey, this.form.field, this.form.value)
        .then(res => this.showMessageAndRefreshData(res))
    },
    addZsetValue() {
      addZsetValue(this.info.connectionKey, this.info.database, this.originalKey, this.form.field, this.form.value)
        .then(res => this.showMessageAndRefreshData(res))
    },
    updateListValue() {
      updateListValue(this.info.connectionKey, this.info.database, this.originalKey, this.form.index, this.form.value)
        .then(res => this.showMessageAndRefreshData(res))
    },
    updateSetValue() {
      updateSetValue(this.info.connectionKey, this.info.database, this.originalKey, this.originalValue, this.form.value)
        .then(res => this.showMessageAndRefreshData(res))
    },
    updateHashValue() {
      updateHashValue(this.info.connectionKey, this.info.database, this.originalKey, this.form.field, this.form.value)
        .then(res => this.showMessageAndRefreshData(res))
    },
    updateZsetValue() {
      updateZsetValue(this.info.connectionKey, this.info.database, this.originalKey, this.form.field, this.form.value)
        .then(res => this.showMessageAndRefreshData(res))
    },
    refreshData() {
      this.info.key = this.originalKey
      this.$emit('refresh-data', this.info)
    },
    deleteListValue(row) {
      this.$confirm('是否确认删除这条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteListValue(this.info.connectionKey, this.info.database, this.originalKey, row.value)
          .then(res => this.showMessageAndRefreshData(res))
      })
    },
    deleteSetValue(row) {
      this.$confirm('是否确认删除这条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSetValue(this.info.connectionKey, this.info.database, this.originalKey, row.value)
          .then(res => this.showMessageAndRefreshData(res))
      })
    },
    deleteHashValue(row) {
      this.$confirm('是否确认删除这条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHashValue(this.info.connectionKey, this.info.database, this.originalKey, row.key)
          .then(res => this.showMessageAndRefreshData(res))
      })
    },
    deleteZsetValue(row) {
      this.$confirm('是否确认删除这条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteZsetValue(this.info.connectionKey, this.info.database, this.originalKey, row.value)
          .then(res => this.showMessageAndRefreshData(res))
      })
    },
    showMessageAndRefreshData(res) {
      console.log(res.data)
      if (res.data.code === 200) {
        this.dialogVisible = false
        const message = res.data.message
        this.info.key = this.originalKey
        this.$emit('refresh-data', this.info)
        this.$message({
          showClose: true,
          message: message,
          type: 'success'
        })
      } else {
        this.dialogVisible = false
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'error'
        })
      }
    },
    doDeleteKey() {
      deleteKey(this.info.connectionKey, this.info.database, this.originalKey).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          const message = res.data.message
          this.info.key = this.originalKey
          this.$emit('delete-key', this.info)
          this.$message({
            showClose: true,
            message: message,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    deleteKey() {
      this.$confirm(`是否确认删除${this.originalKey}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDeleteKey()
      })
    },
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.content {
  margin-top: 30px
}

.table-title {
  margin: 10px 0;
  text-align: left;
}
</style>
