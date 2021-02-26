<template>
  <el-container>
    <el-header>
      <el-button icon="el-icon-plus" @click="openConnectionDialog" circle></el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row v-for="address in addresses" :key="address.key">
          <span>{{ address.host }}@{{ address.port }}</span>
          <div>
            <el-button icon="el-icon-home"></el-button>
          </div>
        </el-row>
      </el-aside>
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
