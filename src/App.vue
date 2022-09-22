<template>
  <div class="app">
    <app-provider>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </app-provider>
    <n-back-top :right="100" listen-to="app" />
  </div>
</template>

<script setup lang="ts">
import AppProvider from './AppProvider.vue'
</script>

<style lang="less">
.app {
  height: 100%;
}
body {
  margin: 0;
}
</style>
