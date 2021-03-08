<template>
  <el-container>
    <el-header>
      <header-button class="header-button" icon="el-icon-plus" @click="openConnectionDialog"
                     name="新建连接"></header-button>
      <header-button class="header-button" icon="el-icon-delete" @click="removeConnection"
                     name="删除连接" :disabled="activeIndex === -1"></header-button>
      <header-button class="header-button" icon="el-icon-setting" @click="openConnectionDialog"
                     name="连接属性" :disabled="activeIndex === -1"></header-button>
      <header-button class="header-button" icon="el-icon-document-delete" @click="openConnectionDialog"
                     name="清理无效连接"></header-button>
      <header-button class="header-button" icon="el-icon-document-delete" @click="openConnectionDialog"
                     name="打开终端"></header-button>
      <header-button class="header-button" icon="el-icon-refresh" @click="openConnectionDialog"
                     name="刷新"></header-button>
      <header-button class="header-button" icon="el-icon-chat-round" @click="openConnectionDialog"
                     name="切换语言"></header-button>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-menu @select="handleMenuItemSelected" @open="handleOpenSubMenu" @close="handleCloseSubMenu"
                 :unique-opened="true" :default-openeds="opened">
          <el-submenu v-for="(address, i) in addresses" :key="address.key" :index="i+''">
            <template slot="title">
              <span class="align-left">{{ address.host }}@{{ address.port }}</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                <el-select v-model="address.database" placeholder="请选择" @change="handleDatabaseChange">
                  <el-option
                    v-for="item in address.databaseOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
              <el-menu-item :index="i + '-'+index" v-for="(key, index) in address.keys" :key="index">{{
                  key
                }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <div class="resize"> ⋮</div>
      <el-main>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" closable @tab-remove="handleTabRemove">
          <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <redis-info :info="item.content" v-if="item.type === 0"></redis-info>
            <redis-value-info :info="item.content" v-if="item.type === 1" @refresh-data="refreshRedisValue"
                              @delete-key="handleDeleteKey"/>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-dialog title="新建连接" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="Host" prop="host">
          <el-input v-model="form.host" placeholder="127.0.0.1"></el-input>
        </el-form-item>
        <el-form-item label="Port" prop="port">
          <el-input v-model.number="form.port" placeholder="6379"></el-input>
        </el-form-item>
        <el-form-item label="Auth" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Separator" prop="separator">
          <el-input v-model="form.separator"></el-input>
        </el-form-item>
        <el-button @click="closeDialog">取消</el-button>
        <el-button @click="addConnection" type="primary">确定</el-button>
        <el-button @click="testConnection" type="primary">测试连接</el-button>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
// @ is an alias to /src

import {
  getInfo,
  getKeys,
  getValueByKey,
  listAddresses,
  newConnection,
  removeConnection,
  testConnection
} from '@/api/redis';
import RedisInfo from '@/components/RedisInfo';
import RedisValueInfo from '@/components/RedisValueInfo';
import HeaderButton from '@/components/HeaderButton';

export default {
  name: 'Home',
  components: {HeaderButton, RedisValueInfo, RedisInfo},
  data() {
    return {
      form: {
        separator: ':'
      },
      dialogVisible: false,
      addresses: [],
      activeName: '',
      editableTabs: [],
      tabIndex: 0,
      activeKey: '',
      activeIndex: -1,
      rules: {
        port: [
          {type: 'integer', min: 1, max: 65535, trigger: 'blur', message: '端口号为1-65535之间的整数'}
        ]
      },
      opened: []
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    closeDialog() {
      this.dialogVisible = false
    },
    openConnectionDialog() {
      this.form = {}
      this.dialogVisible = true
    },
    addConnection() {
      this.$refs.form.validate(valid => {
        if (valid) {
          newConnection(this.form).then(res => {
            console.log(res.data)
            const message = res.data.message
            this.dialogVisible = false
            if (res.data.code === 200) {
              this.updateAddresses()
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: message,
                type: 'error'
              })
            }
          })
        } else {
          this.dialogVisible = false
          return false
        }
      })
    },
    removeConnection() {
      this.$confirm('是否确认删除当前连接？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeConnection(this.activeKey).then(res => {
          const message = res.data.message
          if (res.data.code === 200) {
            this.updateAddresses()
            this.activeKey = ''
            this.activeIndex = -1
            this.opened = []
            this.$message({
              showClose: true,
              message: message,
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: message,
              type: 'error'
            })
          }
        })
      })
    },
    testConnection() {
      testConnection(this.form).then(
        res => {
          console.log(res.data)
          const message = res.data.message
          this.dialogVisible = false
          if (res.data.code === 200) {
            this.$message({
              showClose: true,
              message: message,
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: message,
              type: 'error'
            })
          }
        }
      )
    },
    handleMenuItemSelected(index) {
      const indexPath = index.split('-')
      const addressIndex = parseInt(indexPath[0])
      const keyIndex = parseInt(indexPath[1])
      console.log(index, indexPath, addressIndex, keyIndex)
      const address = this.addresses[addressIndex]
      const redisKey = address.keys[keyIndex]

      const title = redisKey + ' | ' + address.host + '@' + address.port + ' | db' + address.database
      let existsFlag = false
      for (const tab of this.editableTabs) {
        if (tab.name === title) {
          existsFlag = true
          this.activeName = title
          console.log('exists')
          break
        }
      }
      if (!existsFlag) {
        getValueByKey(address.key, address.database, redisKey).then(res => {
          if (res.data.code === 200) {
            const info = res.data.data
            info.connectionKey = address.key
            info.database = address.database
            console.log('info: ', info)
            this.editableTabs.push({
              title: title,
              name: title,
              type: 1,
              content: info
            })
            this.activeName = title
          }
        })
      }
    },
    getAddressByKey(key) {
      for (const address of this.addresses) {
        if (address.key === key) {
          return address
        }
      }
    },
    refreshRedisValue(info) {
      console.log(`刷新key为${info.key}的数据`)
      const redisKey = info.key
      const key = info.connectionKey
      const database = info.database
      const address = this.getAddressByKey(key)

      const title = redisKey + ' | ' + address.host + '@' + address.port + ' | db' + database
      getValueByKey(key, database, redisKey).then(res => {
        if (res.data.code === 200) {
          const info = res.data.data
          info.connectionKey = address.key
          info.database = address.database
          console.log('info: ', info)
          for (const tab of this.editableTabs) {
            if (tab.name === title) {
              this.activeName = title
              tab.content = info
              break
            }
          }
        }
      })
    },
    handleOpenSubMenu(index) {
      this.activeKey = this.addresses[index].key
      this.activeIndex = index
      // 判断是否已经存在该redis信息的选项卡
      let existsFlag = false
      for (const tab of this.editableTabs) {
        if (tab.name === this.addresses[index].key) {
          this.activeName = tab.name
          existsFlag = true
          console.log('exists')
          break
        }
      }
      if (!existsFlag) {
        getInfo(this.addresses[index].key).then(res => {
          if (res.data.code === 200) {
            const info = res.data.data
            const newTabName = this.addresses[index].key
            this.editableTabs.push({
              title: this.addresses[index].host + '@' + this.addresses[index].port,
              name: newTabName,
              type: 0,
              content: info
            })
            this.$set(this.addresses[index], 'databaseOptions', [])
            // 获取所有有数据的database
            Object.keys(info.Keyspace).forEach((key) => {
              this.addresses[index].databaseOptions.push({
                label: key,
                value: parseInt(key.substring(2))
              })
            })
            // 获取db0的所有keys
            getKeys(this.addresses[index].key, 0).then(
              response => {
                if (response.data.code === 200) {
                  this.$set(this.addresses[index], 'keys', response.data.data)
                }
              }
            )
            console.log(this.addresses)
            this.activeName = newTabName
          }
        });
      }
    },
    handleCloseSubMenu(index) {
      this.activeKey = ''
      this.activeIndex = -1
    },
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    handleTabRemove(targetName) {
      const tabs = this.editableTabs;
      let activeName = this.activeName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.activeName = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    handleDatabaseChange(val) {
      if (this.activeKey) {
        const index = this.activeIndex
        // 获取db0的所有keys
        getKeys(this.addresses[index].key, val).then(
          response => {
            if (response.data.code === 200) {
              this.$set(this.addresses[index], 'keys', response.data.data)
            }
          }
        )
      }
    },
    handleDeleteKey(info) {
      console.log(`删除key为${info.key}的数据`)
      const redisKey = info.key
      const key = info.connectionKey
      const database = info.database
      const address = this.getAddressByKey(key)

      const title = redisKey + ' | ' + address.host + '@' + address.port + ' | db' + database

      // 关闭当前tab页
      this.handleTabRemove(title)

      // 更新keys
      address.keys = address.keys.filter(k => k !== redisKey)
    },
    updateAddresses() {
      listAddresses().then(res => {
        if (res.data.code === 200) {
          this.addresses = res.data.data
          this.addresses.forEach(address => {
            this.$set(address, 'database', 0)
          })
        }
      })
    }
  },
  mounted() {
    this.updateAddresses()
  }
}
</script>
<style scoped>
.resize {
  cursor: col-resize;
  float: left;
  position: relative;
  top: 45%;
  background-color: #d6d6d6;
  border-radius: 5px;
  margin-top: -10px;
  width: 10px;
  height: 100%;
  background-size: cover;
  background-position: center;
  /*z-index: 99999;*/
  font-size: 32px;
  color: white;
}

.el-header {
  background: #f3f2f1;
}

.header-button {
  line-height: 60px;
}

.el-submenu {
  text-align: left;
}

.el-submenu.is-opened /deep/ .el-submenu__title {
  background: #edf5ff;
}

</style>
