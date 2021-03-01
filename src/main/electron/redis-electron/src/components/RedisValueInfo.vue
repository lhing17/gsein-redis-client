<template>
  <div>
    <el-row>
      <el-col :span="9">
        <el-input placeholder="KeyName" v-model="input1">
          <template slot="prepend">Hash</template>
          <i slot="suffix" class="el-input__icon el-icon-check"></i>
        </el-input>
      </el-col>
     <el-col :span="9">
       <el-input placeholder="KeyName" v-model="input1">
         <template slot="prepend">TTL</template>
         <i slot="suffix" class="el-input__icon el-icon-check"></i>
       </el-input>
     </el-col>
      <el-button type="danger" icon="el-icon-delete"></el-button>
      <el-button type="success" icon="el-icon-refresh"></el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RedisValueInfo'
}
</script>

<style scoped>

</style>
