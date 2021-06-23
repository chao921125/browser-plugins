<template>
  <div class="main-app">
    <div class="text-center">LOGO</div>
    <div class="row-input">查询间隔（秒）：<el-input v-model="searchTime" placeholder="请输入查询间隔时间，默认5s" class="input-val" size="mini"></el-input></div>
    <div class="row-input">查询页数：<el-input v-model="searchPage" placeholder="请输入查询页数，默认5" class="input-val" size="mini"></el-input></div>
    <div class="row-input text-center"><el-button type="primary" size="mini" @click="sendParams">提交参数设置</el-button></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      searchTime: 0,
      searchPage: 0
    }
  },
  methods: {
    sendParams () {
      // eslint-disable-next-line
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // eslint-disable-next-line
        chrome.tabs.sendMessage(tabs[0].id, "1111", function(response)
        {
          // eslint-disable-next-line
          alert(response);
        });
      });
    }
  }
}
</script>

<style lang="scss">
  .main-app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: right;
    color: #000;
    width: 200px;
    .row-input {
      margin-top: 5px;
    }
    .text-center {
      text-align: center;
    }
    .input-val {
      width: 100px;
    }
  }
</style>
