<template>
  <el-container>
    <el-header>
      <el-button icon="el-icon-plus" @click="openConnectionDialog" circle></el-button>
    </el-header>
    <el-container>
      <el-aside width="300px">

        <el-menu @select="handleMenuItemSelected" @open="handleOpenSubMenu" :unique-opened="true">
          <el-submenu v-for="(address, i) in addresses" :key="address.key" :index="i+''">
            <template slot="title">
              <span>{{ address.host }}@{{ address.port }}</span>
              <el-button-group>
                <el-button icon="el-icon-s-home" type="text" size="mini" plain></el-button>
                <el-button icon="el-icon-s-home" type="text" size="mini" plain></el-button>
                <el-button icon="el-icon-refresh" type="text" size="mini" plain></el-button>
                <el-button icon="el-icon-menu" type="text" size="mini" plain></el-button>
              </el-button-group>
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
            <redis-info :info="item.content"></redis-info>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-dialog title="新建连接" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Host">
          <el-input v-model="form.host" placeholder="127.0.0.1"></el-input>
        </el-form-item>
        <el-form-item label="Port">
          <el-input v-model="form.port" placeholder="6379"></el-input>
        </el-form-item>
        <el-form-item label="Auth">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Separator">
          <el-input v-model="form.separator"></el-input>
        </el-form-item>
        <el-button @click="closeDialog">取消</el-button>
        <el-button @click="addConnection" type="primary">确定</el-button>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
// @ is an alias to /src

import {getInfo, getKeys, getValueByKey, listAddresses, newConnection} from '@/api/redis';
import RedisInfo from '@/components/RedisInfo';

export default {
  name: 'Home',
  components: {RedisInfo},
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
      activeIndex: -1
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
      this.dialogVisible = true
    },
    addConnection() {
      newConnection(this.form).then(res => console.log(res))
    },
    handleMenuItemSelected(index) {
      const indexPath = index.split('-')
      const addressIndex = parseInt(indexPath[0])
      const keyIndex = parseInt(indexPath[1])
      console.log(index, indexPath, addressIndex, keyIndex)
      const address = this.addresses[addressIndex]
      const redisKey = address.keys[keyIndex]

      const title = redisKey + ' | ' + address.host + '@' + address.port + ' | db' + address.database

      getValueByKey(address.key, address.database, redisKey).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.editableTabs.push({
            title: title,
            name: title,
            type: 1,
            content: {}
          })
          this.activeName = title
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
          existsFlag = true
          console.log('exists')
          break
        }
      }
      if (!existsFlag) {
        getInfo(this.addresses[index].key).then(res => {
          if (res.data.code === 200) {
            const info = res.data.data
            console.log(info)
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
    }
  },
  mounted() {
    listAddresses().then(res => {
      console.log(res)
      if (res.data.code === 200) {
        this.addresses = res.data.data
        this.addresses.forEach(address => {
          this.$set(address, 'database', 0)
        })
        console.log(this.addresses)
      }
    })
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

</style>
