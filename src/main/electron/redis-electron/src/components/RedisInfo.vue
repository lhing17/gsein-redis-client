<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span slot="label"><i class="el-icon-date"></i> {{ $t('lang.redisInfo.server') }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.version') }}</span>
            <span class="info-value">{{ info.Server.redis_version }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.os') }}</span>
            <span class="info-value">{{ info.Server.os }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.processId') }}</span>
            <span class="info-value">{{ info.Server.process_id }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span slot="label"><i class="el-icon-date"></i> {{ $t('lang.redisInfo.memory') }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.used') }}</span>
            <span class="info-value">{{ info.Memory.used_memory_human }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.peak') }}</span>
            <span class="info-value">{{ info.Memory.used_memory_peak_human }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.usedLua') }}</span>
            <span class="info-value">{{ info.Memory.used_memory_lua_human }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span slot="label"><i class="el-icon-date"></i> {{ $t('lang.redisInfo.status') }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.connected') }}</span>
            <span class="info-value">{{ info.Clients.connected_clients }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.connectionsReceived') }}</span>
            <span class="info-value">{{ info.Stats.total_connections_received }}</span>
          </div>
          <div class="info-line">
            <span class="info-key">{{ $t('lang.redisInfo.commandsProcessed') }}</span>
            <span class="info-value">{{ info.Stats.total_commands_processed }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header">
          <span slot="label"><i class="el-icon-date"></i> {{ $t('lang.redisInfo.keyValue') }}</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="db"
            label="DB">
          </el-table-column>
          <el-table-column
            prop="keys"
            label="Keys"
            sortable>
          </el-table-column>
          <el-table-column
            prop="expires"
            label="Expires"
            sortable>
          </el-table-column>
          <el-table-column
            prop="avg_ttl"
            label="Avg TTL"
            sortable>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header">
          <span slot="label"><i class="el-icon-date"></i> {{ $t('lang.redisInfo.completeInfo') }}</span>
        </div>
        <el-table
          :data="allInfo"
          style="width: 100%"
          :stripe="true">
          <el-table-column
            prop="type"
            label="Type"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="key"
            label="Key"
            sortable
            min-width="30%">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value"
            sortable
            min-width="50%">
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RedisInfo',
  data() {
    return {}
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    tableData() {
      console.log(this.info)
      // 从info中拿到的各个数据库的key数量、过期数量等信息
      const kvs = this.info.Keyspace
      const arr = []
      if (kvs) {
        // 将字符串解析转为对象
        for (const k of Object.keys(kvs)) {
          const v = kvs[k]
          const o = {}
          const dbInfos = v.split(',').map(d => d.split('='))
          dbInfos.forEach((dbInfo) => {
            o[dbInfo[0]] = dbInfo[1]
          })
          o.db = k
          arr.push(o);
        }
      }
      return arr
    },
    allInfo() {
      console.log(this.info)
      const arr = []
      Object.keys(this.info).forEach(key => {
        Object.keys(this.info[key]).forEach(k => {
          const v = {}
          v.type = key
          v.key = k
          v.value = this.info[key][k]
          arr.push(v)
        })
      })
      return arr
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.info-line {
  font-size: 12px;
  background: #f4f4f5;
  margin-top: 16px;
  padding: 8px;
  border: #e0e0e3 1px solid;
  border-radius: 4px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.info-key {
  color: #a7a9af;
}

.info-value {
  color: #71c331;
}

.el-table /deep/ .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
