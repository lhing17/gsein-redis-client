<template>
  <el-container>
    <el-header>
      <lang-dropdown></lang-dropdown>
    </el-header>
    <el-main>
      <div class="about">
        <el-row class="search-row" :gutter="10">
          <el-col :span="4" :offset="6">
            <el-input v-model="name" :placeholder="$t('lang.cheatsheet.name')"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="type" :placeholder="$t('lang.cheatsheet.type')" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button @click="handleSearch">{{ $t('lang.cheatsheet.search') }}</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8" v-for="(item, index) in data" :key="index">
            <el-card @click.native="handleClickCard(item)" class="command-card">
              <div class="card-title">
            <span class="command-name">{{ item.commandName }}
            <el-tooltip class="item" effect="dark" :content="item.args" placement="top-start">
              <span class="command-args">{{ item.args }}</span>
            </el-tooltip>
            </span>
              </div>
              <p class="command-summary">{{ item.summary }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>

import commands from '@/data/commands';
import LangDropdown from '@/components/LangDropdown';

export default {
  name: 'CheatSheet',
  components: {LangDropdown},
  data() {
    return {
      data: commands,
      fullData: commands,
      name: '',
      type: ''
    }
  },
  computed: {
    options() {
      const options = [...new Set(this.fullData.map(d => d.dataGroup))].sort()
      options.splice(0, 0, 'ALL')
      return options
    }
  },
  methods: {
    handleClickCard(item) {
      console.log(item)
      const url = 'https://redis.io' + item.link
      window.open(url)
    },
    handleSearch() {
      let data = this.fullData
      if (this.name) {
        data = data.filter(d => d.commandName.indexOf(this.name) !== -1)
      }
      if (this.type && this.type !== 'ALL') {
        data = data.filter(d => d.dataGroup === this.type)
      }
      this.data = data
    }
  }
}
</script>
<style scoped>

.about {
  padding: 0 10px;
}

.command-card {
  height: 150px;
  margin-top: 10px;
}

.command-card:hover {
  cursor: pointer;
}

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.command-name {
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-family: "Monaco", "Menlo", monospace;
  display: block;
  margin: 0 0 2px 0;
  color: #0066aa;
}

.command-args {
  color: #555555;
  font-size: 0.8em;
}

.command-summary {
  font-size: 0.8em;
  line-height: 1.5em;
}

.search-row {
  margin: 10px 0;
}

.el-header {
  background: #f3f2f1;
}
</style>
