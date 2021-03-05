<template>
  <div class="about">
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
</template>
<script>

import commands from '@/data/commands';

export default {
  name: 'CheatSheet',
  data() {
    return {
      data: commands
    }
  },
  methods: {
    handleClickCard(item) {
      console.log(item)
      const url = 'https://redis.io' + item.link
      window.open(url)
      // ipcRenderer.send('new-page', url)
      // const view = new BrowserView()
      // const win = BrowserWindow.getFocusedWindow()
      // win.setBrowserView(view)
      // view.setBounds({x: 0, y: 0, width: 300, height: 300})
      // view.webContents.loadURL(url)
    }
  }
}
</script>
<style scoped>
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
</style>
