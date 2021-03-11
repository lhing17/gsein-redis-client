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
        <el-button type="primary" @click="updateStringValue">{{ $t('lang.dialog.save') }}</el-button>
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
            :label="$t('lang.dialog.operation')"
            width="200">
            <template slot-scope="scope">
              <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">
                {{ $t('lang.dialog.edit') }}
              </el-button>
              <el-button @click="deleteListValue(scope.row)" type="text" size="small">{{
                  $t('lang.dialog.delete')
                }}
              </el-button>
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
            :label="$t('lang.dialog.operation')"
            width="200">
            <template slot-scope="scope">
              <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">
                {{ $t('lang.dialog.edit') }}
              </el-button>
              <el-button @click="deleteSetValue(scope.row)" type="text" size="small">{{
                  $t('lang.dialog.delete')
                }}
              </el-button>
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
            :label="$t('lang.dialog.operation')"
            width="200">
            <template slot-scope="scope">
              <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">
                {{ $t('lang.dialog.edit') }}
              </el-button>
              <el-button @click="deleteHashValue(scope.row)" type="text" size="small">{{
                  $t('lang.dialog.delete')
                }}
              </el-button>
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
            :label="$t('lang.dialog.operation')"
            width="200">
            <template slot-scope="scope">
              <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">
                {{ $t('lang.dialog.edit') }}
              </el-button>
              <el-button @click="deleteZsetValue(scope.row)" type="text" size="small">{{
                  $t('lang.dialog.delete')
                }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="dialogType==='add' ? $t('lang.dialog.newLine'): $t('lang.dialog.editLine')"
               :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="80px" v-if="info.type==='list' || info.type === 'set'">
        <el-input v-show="false" :value="form.index"></el-input>
        <el-form-item label="Value">
          <el-input v-model="form.value" placeholder="" type="textarea" :autosize="{ minRows: 3 }"></el-input>
        </el-form-item>
        <el-button @click="closeDialog">{{ $t('lang.dialog.cancel') }}</el-button>
        <el-button @click="addListValue" type="primary" v-if="dialogType==='add' && info.type==='list'">
          {{ $t('lang.dialog.confirm') }}
        </el-button>
        <el-button @click="addSetValue" type="primary" v-if="dialogType==='add' && info.type==='set'">
          {{ $t('lang.dialog.confirm') }}
        </el-button>
        <el-button @click="updateListValue" type="primary" v-if="dialogType==='edit' && info.type==='list'">
          {{ $t('lang.dialog.confirm') }}
        </el-button>
        <el-button @click="updateSetValue" type="primary" v-if="dialogType==='edit' && info.type==='set'">
          {{ $t('lang.dialog.confirm') }}
        </el-button>
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
        <el-button @click="closeDialog">{{ $t('lang.dialog.cancel') }}</el-button>
        <el-button @click="addHashValue" type="primary" v-if="dialogType==='add' && info.type==='hash'">
          {{ $t('lang.dialog.confirm') }}
        </el-button>
        <el-button @click="addZsetValue" type="primary" v-if="dialogType==='add' && info.type==='zset'">
          {{ $t('lang.dialog.confirm') }}
        </el-button>
        <el-button @click="updateHashValue" type="primary" v-if="dialogType==='edit' && info.type==='hash'">
          {{ $t('lang.dialog.confirm') }}
        </el-button>
        <el-button @click="updateZsetValue" type="primary" v-if="dialogType==='edit' && info.type==='zset'">
          {{ $t('lang.dialog.confirm') }}
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
      const updateHint = this.$t('lang.dialog.updateHint', {
        originalKey: this.originalKey,
        newKey: this.info.key
      }).toString()
      const hint = this.$t('lang.dialog.hint').toString()
      const confirm = this.$t('lang.dialog.confirm').toString()
      const cancel = this.$t('lang.dialog.cancel').toString()
      const updateFailure = this.$t('lang.dialog.updateFailure').toString()

      if (this.info.key !== this.originalKey) {
        this.$confirm(updateHint, hint, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'warning'
        }).then(() => {
          updateKey(this.info.connectionKey, this.info.database, this.originalKey, this.info.key).then(res => {
            if (res.data.code === 200) {
              const message = res.data.message
              this.$emit('update-key', {key: this.info.connectionKey, oldKey: this.originalKey, newKey: this.info.key})
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
            message: updateFailure
          });
          this.info.key = this.originalKey
        });
      }
    },
    updateTtl() {
      const updateTtlHint = this.$t('lang.dialog.updateTtlHint', {
        originalKey: this.originalKey,
        newKey: this.info.key
      }).toString()
      const hint = this.$t('lang.dialog.hint').toString()
      const confirm = this.$t('lang.dialog.confirm').toString()
      const cancel = this.$t('lang.dialog.cancel').toString()
      const updateFailure = this.$t('lang.dialog.updateFailure').toString()
      if (this.info.ttl <= 0) {
        this.$confirm(updateTtlHint, hint, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'warning'
        }).then(() => {
          this.deleteKey()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: updateFailure
          });
        });
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
      const deleteHint = this.$t('lang.dialog.deleteHint').toString()
      const hint = this.$t('lang.dialog.hint').toString()
      const confirm = this.$t('lang.dialog.confirm').toString()
      const cancel = this.$t('lang.dialog.cancel').toString()
      this.$confirm(deleteHint, hint, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        type: 'warning'
      }).then(() => {
        deleteListValue(this.info.connectionKey, this.info.database, this.originalKey, row.value)
          .then(res => this.showMessageAndRefreshData(res))
      })
    },
    deleteSetValue(row) {
      const deleteHint = this.$t('lang.dialog.deleteHint').toString()
      const hint = this.$t('lang.dialog.hint').toString()
      const confirm = this.$t('lang.dialog.confirm').toString()
      const cancel = this.$t('lang.dialog.cancel').toString()
      this.$confirm(deleteHint, hint, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        type: 'warning'
      }).then(() => {
        deleteSetValue(this.info.connectionKey, this.info.database, this.originalKey, row.value)
          .then(res => this.showMessageAndRefreshData(res))
      })
    },
    deleteHashValue(row) {
      const deleteHint = this.$t('lang.dialog.deleteHint').toString()
      const hint = this.$t('lang.dialog.hint').toString()
      const confirm = this.$t('lang.dialog.confirm').toString()
      const cancel = this.$t('lang.dialog.cancel').toString()
      this.$confirm(deleteHint, hint, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        type: 'warning'
      }).then(() => {
        deleteHashValue(this.info.connectionKey, this.info.database, this.originalKey, row.key)
          .then(res => this.showMessageAndRefreshData(res))
      })
    },
    deleteZsetValue(row) {
      const deleteHint = this.$t('lang.dialog.deleteHint').toString()
      const hint = this.$t('lang.dialog.hint').toString()
      const confirm = this.$t('lang.dialog.confirm').toString()
      const cancel = this.$t('lang.dialog.cancel').toString()
      this.$confirm(deleteHint, hint, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
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
      const deleteKeyHint = this.$t('lang.dialog.deleteKeyHint', {
        key: this.originalKey
      }).toString()
      const hint = this.$t('lang.dialog.hint').toString()
      const confirm = this.$t('lang.dialog.confirm').toString()
      const cancel = this.$t('lang.dialog.cancel').toString()
      this.$confirm(deleteKeyHint, hint, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
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
