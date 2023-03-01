<template>
  <div class="layout">
    <n-layout>
      <n-layout-header>
        <layout-header />
      </n-layout-header>
      <n-dialog-provider>
        <n-layout-content style="background: #f5f5f5">
          <div class="content">
            <router-view></router-view>
          </div>
        </n-layout-content>
      </n-dialog-provider>
      <n-layout-footer>
        <layout-footer />
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import layoutHeader from './components/layout-header/layout-header.vue'
import layoutFooter from './components/layout-footer/layout-footer.vue'
import { useMessage } from 'naive-ui'

window.$message = useMessage()
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;

  .content {
    min-height: 100vh;
    background: #f5f5f5;
    margin-top: 60px;
    position: relative;
  }
}
</style>
