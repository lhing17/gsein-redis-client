<template>
  <el-container>
    <el-header>
      <el-button icon="el-icon-plus" @click="openConnectionDialog" circle></el-button>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-row v-for="address in addresses" :key="address.key">
          <el-col :span="15">
            <span>{{ address.host }}@{{ address.port }}</span>
          </el-col>
          <el-col :span="9">
            <el-button icon="el-icon-s-home" type="text" size="mini" plain></el-button>
            <el-button icon="el-icon-s-home" type="text" size="mini" plain></el-button>
            <el-button icon="el-icon-refresh" type="text" size="mini" plain></el-button>
            <el-button icon="el-icon-menu" type="text" size="mini" plain></el-button>
            <el-button icon="el-icon-arrow-down" type="text" size="mini" plain></el-button>
          </el-col>
        </el-row>
      </el-aside>
      <div class="resize"> ⋮</div>
      <el-main>Main</el-main>
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

import {listAddresses, newConnection} from '@/api/redis';

export default {
  name: 'Home',
  data() {
    return {
      form: {
        separator: ':'
      },
      dialogVisible: false,
      addresses: []
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
<style>
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
