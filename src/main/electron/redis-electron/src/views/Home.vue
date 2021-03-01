<template>
  <el-container>
    <el-header>
      <el-button icon="el-icon-plus" @click="openConnectionDialog" circle></el-button>
    </el-header>
    <el-container>
      <el-aside width="300px">

        <el-menu @select="showInfo" @open="refreshKeys">
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
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
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

import {getInfo, listAddresses, newConnection} from '@/api/redis';
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
      tabIndex: 0
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
    showInfo(index, indexPath) {
      console.log('selected', index, indexPath)
    },
    refreshKeys(index, indexPath) {
      getInfo(this.addresses[index].key).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          const newTabName = this.addresses[index].key
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: res.data.data
          })
          this.activeName = newTabName
        }
      })
      console.log('open', index, indexPath)
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
    }
  },
  mounted() {
    listAddresses().then(res => {
      console.log(res)
      if (res.data.code === 200) {
        this.addresses = res.data.data
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
