<template>
  <el-container class="connection-container">
    <el-header>
      <header-button class="header-button" icon="el-icon-plus" @click="openConnectionDialog"
                     :name="$t('lang.header.newConnection')"></header-button>
      <header-button class="header-button" icon="el-icon-delete" @click="removeConnection"
                     :name="$t('lang.header.removeConnection')" :disabled="activeIndex === -1"></header-button>
      <header-button class="header-button" icon="el-icon-setting" @click="openEditDialog"
                     :name="$t('lang.header.connectionProperties')" :disabled="activeIndex === -1"></header-button>
      <header-button class="header-button" icon-type="terminal" @click="openTerminalTab"
                     :name="$t('lang.header.openTerminal')" :disabled="activeIndex === -1"></header-button>
      <header-button class="header-button" icon="el-icon-refresh" @click="refreshKeys"
                     :name="$t('lang.header.refresh')" :disabled="activeIndex === -1"></header-button>
      <lang-dropdown></lang-dropdown>
    </el-header>
    <el-container class="menu-container">
      <div class="aside-drag-container" :style="{width: sideWidth + 'px'}">
        <el-aside class="aside">
          <el-menu @select="handleMenuItemSelected" @open="handleOpenSubMenu" @close="handleCloseSubMenu"
                   :unique-opened="true" :default-openeds="opened">
            <el-submenu v-for="(address, i) in addresses" :key="address.key" :index="i+''">
              <template slot="title">
                <span class="align-left">{{ address.host }}@{{ address.port }} </span>
                <el-tag class="align-left" :type="address.valid?'success':'danger'" size="mini"
                        v-if="address.valid!==undefined"> {{
                    address.valid ? $t('lang.connection.valid') : $t('lang.connection.invalid')
                  }}
                </el-tag>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-select v-model="address.database" placeholder="请选择" @change="handleDatabaseChange">
                        <el-option
                          v-for="item in address.databaseOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="12">
                      <el-button @click="openNewKeyDialog(address.key)" icon="el-icon-plus">{{
                          $t('lang.connection.newKey')
                        }}
                      </el-button>
                    </el-col>
                  </el-row>
                </template>
                <el-menu-item :index="i + '-'+index" v-for="(key, index) in address.keys" :key="index">{{
                    key
                  }}
                </el-menu-item>
                <div class="load-more-wrapper">
                  <el-button class="load-more" @click="loadMoreKeys(address)" :disabled="address.finished">
                    {{ $t('lang.connection.loadMore') }}
                  </el-button>
                </div>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- drag area -->
        <div id="drag-resize-container">
          <div id="drag-resize-pointer"></div>
        </div>
      </div>
      <el-main>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" closable @tab-remove="handleTabRemove">
          <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <redis-info :info="item.content" v-if="item.type === 0"></redis-info>
            <redis-value-info :info="item.content" v-if="item.type === 1" @refresh-data="refreshRedisValue"
                              @delete-key="handleDeleteKey" @update-key="handleUpdateKey"/>
            <redis-terminal :info="item.content" v-if="item.type===2"></redis-terminal>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-dialog
      :title="this.operationType==='edit' ? $t('lang.header.connectionProperties') :$t('lang.header.newConnection')"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-input v-show="false" v-model="form.key" v-if="this.operationType==='edit'"></el-input>
        <el-form-item :label="$t('lang.dialog.host')" prop="host">
          <el-input v-model="form.host" placeholder="127.0.0.1"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.dialog.port')" prop="port">
          <el-input v-model.number="form.port" placeholder="6379"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.dialog.auth')" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.dialog.name')" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.dialog.separator')" prop="separator">
          <el-input v-model="form.separator"></el-input>
        </el-form-item>
        <el-button @click="closeDialog">{{ $t('lang.dialog.cancel') }}</el-button>
        <el-button @click="addConnection" type="primary" v-if="this.operationType==='add'">{{
            $t('lang.dialog.confirm')
          }}
        </el-button>
        <el-button @click="editConnection" type="primary" v-if="this.operationType==='edit'">
          {{ $t('lang.dialog.confirm') }}
        </el-button>
        <el-button @click="testConnection" type="primary">{{ $t('lang.dialog.testConnection') }}</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :title="$t('lang.connection.newKey')" :visible.sync="newKeyDialogVisible">
      <el-form ref="form" :model="newKeyForm" label-width="80px" :rules="rules">
        <el-input v-show="false" v-model="newKeyForm.connectionKey"></el-input>
        <el-form-item :label="$t('lang.dialog.keyName')" prop="name">
          <el-input v-model="newKeyForm.name" :placeholder="$t('lang.dialog.enterKeyName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lang.dialog.keyType')" prop="type">
          <el-select v-model="newKeyForm.type" :placeholder="$t('lang.dialog.selectKeyType')" style="width: 100%">
            <el-option label="string" value="string"></el-option>
            <el-option label="list" value="list"></el-option>
            <el-option label="set" value="set"></el-option>
            <el-option label="zset" value="zset"></el-option>
            <el-option label="hash" value="hash"></el-option>
          </el-select>
        </el-form-item>
        <el-button @click="closeNewKeyDialog">{{ $t('lang.dialog.cancel') }}</el-button>
        <el-button @click="addNewKey" type="primary">{{
            $t('lang.dialog.confirm')
          }}
        </el-button>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
// @ is an alias to /src

import {
  addNewKey,
  addressStatus,
  editConnection, exists,
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
import RedisTerminal from '@/components/RedisTerminal';
import LangDropdown from '@/components/LangDropdown';

export default {
  name: 'Home',
  components: {LangDropdown, RedisTerminal, HeaderButton, RedisValueInfo, RedisInfo},
  data() {
    return {
      form: {
        separator: ':'
      },
      newKeyForm: {
        type: 'string'
      },
      dialogVisible: false,
      newKeyDialogVisible: false,
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
      opened: [],
      operationType: 'add',
      sideWidth: 300
    }
  },
  methods: {
    bindSideBarDrag() {
      const that = this;
      const dragPointer = document.getElementById('drag-resize-pointer');

      function mousemove(e) {
        const mouseX = e.x;
        const dragSideWidth = mouseX - 19;

        if ((dragSideWidth > 200) && (dragSideWidth < 500)) {
          that.sideWidth = dragSideWidth;
        }
      }

      function mouseup(e) {
        document.documentElement.removeEventListener('mousemove', mousemove);
        document.documentElement.removeEventListener('mouseup', mouseup);

        // store side bar with
        localStorage.sideWidth = that.sideWidth;
      }

      dragPointer.addEventListener('mousedown', (e) => {
        e.preventDefault();

        document.documentElement.addEventListener('mousemove', mousemove);
        document.documentElement.addEventListener('mouseup', mouseup);
      });
    },
    handleClose(done) {
      done()
    },
    closeDialog() {
      this.dialogVisible = false
    },
    openConnectionDialog() {
      this.form = {separator: ':'}
      this.dialogVisible = true
      this.operationType = 'add'
    },
    openEditDialog() {
      this.dialogVisible = true
      this.operationType = 'edit'
      const address = this.addresses[this.activeIndex]
      this.form = {
        host: address.host,
        port: parseInt(address.port),
        username: address.username,
        password: address.password,
        separator: address.separator,
        key: address.key
      }
    },
    openTerminalTab() {
      // 判断是否已经存在该redis终端的选项卡
      let existsFlag = false
      const prefix = 'terminal_'
      for (const tab of this.editableTabs) {
        if (tab.name === prefix + this.activeKey) {
          this.activeName = tab.name
          existsFlag = true
          console.log('exists')
          break
        }
      }
      if (!existsFlag) {
        const address = this.addresses[this.activeIndex]
        const form = {
          host: address.host,
          port: address.port,
          username: address.username,
          password: address.password,
          separator: address.separator
        }
        testConnection(form).then(
          res => {
            const message = res.data.message
            if (res.data.code === 200) {
              const newTabName = prefix + this.activeKey
              const host = address.host
              const port = address.port
              const key = address.key
              const database = address.database
              const info = {host, port, key, database}
              this.editableTabs.push({
                title: host + '@' + port,
                name: newTabName,
                type: 2,
                content: info
              })
              this.activeName = newTabName
            } else {
              this.$message({
                showClose: true,
                message: message,
                type: 'error'
              })
            }
          }
        )
      }
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
    editConnection() {
      this.$refs.form.validate(valid => {
        if (valid) {
          editConnection(this.form).then(res => {
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
    openTabForKey(redisKey, address) {
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
    handleMenuItemSelected(index) {
      const indexPath = index.split('-')
      const addressIndex = parseInt(indexPath[0])
      const keyIndex = parseInt(indexPath[1])
      console.log(index, indexPath, addressIndex, keyIndex)
      const address = this.addresses[addressIndex]
      const redisKey = address.keys[keyIndex]

      this.openTabForKey(redisKey, address)
    },
    getAddressByKey(key) {
      for (const address of this.addresses) {
        if (address.key === key) {
          return address
        }
      }
    },
    openNewKeyDialog(key) {
      this.newKeyDialogVisible = true
      this.newKeyForm = {type: 'string'}
      this.$set(this.newKeyForm, 'connectionKey', key)
    },
    closeNewKeyDialog() {
      this.newKeyDialogVisible = false
      this.$set(this.newKeyForm, 'connectionKey', '')
    },
    addNewKey() {
      this.newKeyDialogVisible = false
      console.log(this.newKeyForm)
      const form = this.newKeyForm
      const connectionKey = form.connectionKey
      const redisKey = form.name
      const type = form.type
      const address = this.getAddressByKey(connectionKey)
      const database = address.database
      exists(connectionKey, database, redisKey).then(res => {
        if (res.data.code === 200) {
          const existsFlag = res.data.data
          // 判断key是否已存在，如果已存在，打开tab
          if (existsFlag) {
            this.openTabForKey(redisKey, address)
          } else {
            // 如果不存在，新建key，将key插到address.keys中，打开tab
            addNewKey(connectionKey, database, redisKey, type).then(res => {
              if (res.data.code === 200) {
                address.keys.push(redisKey)
                this.openTabForKey(redisKey, address)
              }
            })
          }
        }
      })
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
            this.$set(this.addresses[index], 'database', 0)
            // 获取db0的所有keys
            getKeys(this.addresses[index].key, 0, '0').then(
              response => {
                if (response.data.code === 200) {
                  const data = response.data.data
                  console.log(data)
                  this.$set(this.addresses[index], 'keys', data.keys.sort())
                  this.$set(this.addresses[index], 'cursor', data.cursor)
                  this.$set(this.addresses[index], 'finished', data.finished)
                }
              }
            )
            console.log(this.addresses)
            this.activeName = newTabName
          }
        }).catch(() => {
          this.$message({
            showClose: true,
            message: this.$t('lang.connection.invalidConnection').toString(),
            type: 'error'
          })
        });
      }
    },
    unique(arr) {
      const hash = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) === i) {
          hash.push(arr[i]);
        }
      }
      return hash;
    },
    loadMoreKeys(address) {
      getKeys(address.key, address.database, address.cursor).then(
        response => {
          if (response.data.code === 200) {
            const data = response.data.data
            this.$set(address, 'keys', this.unique(address.keys.concat(data.keys.sort())))
            this.$set(address, 'cursor', data.cursor)
            this.$set(address, 'finished', data.finished)
          }
        }
      )
    },
    refreshKeys() {
      const index = this.activeIndex
      // 获取db0的所有keys
      getKeys(this.addresses[index].key, this.addresses[index].database, '0').then(
        response => {
          if (response.data.code === 200) {
            const data = response.data.data
            const message = this.$t('lang.connection.refreshSuccess').toString()
            this.$set(this.addresses[index], 'keys', data.keys.sort())
            this.$set(this.addresses[index], 'cursor', data.cursor)
            this.$set(this.addresses[index], 'finished', data.finished)
            this.$message({
              showClose: true,
              message: message,
              type: 'success'
            })
          }
        }
      ).catch(
        () => {
          const message = this.$t('lang.connection.refreshFail').toString()
          this.$message({
            showClose: true,
            message: message,
            type: 'success'
          })
        }
      )
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
        this.$set(this.addresses[index], 'database', val)
        // 获取db0的所有keys
        getKeys(this.addresses[index].key, val, '0').then(
          response => {
            if (response.data.code === 200) {
              const data = response.data.data
              this.$set(this.addresses[index], 'keys', data.keys.sort())
              this.$set(this.addresses[index], 'cursor', data.cursor)
              this.$set(this.addresses[index], 'finished', data.finished)
            }
          }
        )
        // 更新终端的database
        const prefix = 'terminal_'
        for (const tab of this.editableTabs) {
          if (tab.name === prefix + this.activeKey) {
            this.$set(tab.content, 'database', val)
            break
          }
        }
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
    handleUpdateKey(data) {
      const address = this.getAddressByKey(data.key)
      const keys = address.keys.map(key => {
        if (key === data.oldKey) {
          return data.newKey
        } else {
          return key
        }
      })
      this.$set(address, 'keys', keys)
    },
    updateAddresses() {
      listAddresses().then(res => {
        if (res.data.code === 200) {
          this.addresses = res.data.data
          this.addresses.forEach(address => {
            if (!address.database) {
              this.$set(address, 'database', 0)
              this.updateAddressStatus()
            }
          })
        }
      })
    },
    updateAddressStatus() {
      addressStatus().then(res => {
        if (res.data.code === 200) {
          const statusMap = res.data.data
          this.addresses.forEach(address => {
            this.$set(address, 'valid', statusMap[address.key])
          })
        }
      })
    }
  },
  mounted() {
    this.updateAddresses()
    this.bindSideBarDrag()
  }
}
</script>
<style scoped>

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

/deep/ .el-menu-item, /deep/ .el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}

.load-more {
  width: 100%;
  padding: 2px 20px;
}

.load-more-wrapper {
  margin: 0 10px;
}

/deep/ .el-menu-item-group__title {
  padding-left: 0 !important;
}

/deep/ .el-submenu__title {
  padding-left: 40px !important;
}

/deep/ .el-submenu__icon-arrow {
  left: 20px;
  right: auto;
}

.connection-container {
  height: calc(100% - 43px);
}

.menu-container {
  height: calc(100% - 60px);
}

.aside-drag-container {
  position: relative;
  user-select: none;
  max-width: 50%;
}

#drag-resize-container {
  position: absolute;
  /*height: 100%;*/
  width: 10px;
  right: -5px;
  top: 0;
}

#drag-resize-pointer {
  position: fixed;
  height: 100%;
  width: 18px;
  cursor: col-resize;
}

#drag-resize-pointer::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 20px;
  border-left: 1px solid #adabab;
  border-right: 1px solid #adabab;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.aside {
  width: 100% !important;
  height: 100%;
  border-right: solid 1px #e6e6e6;
  overflow-x: hidden;
}

.el-menu {
  border: 0;
}

/*fix el-select bottom scroll bar*/
.el-scrollbar__wrap {
  overflow-x: hidden;
}

</style>
