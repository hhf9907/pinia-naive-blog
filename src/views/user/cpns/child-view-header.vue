<template>
  <div class="child-view-header">
    <div class="title">{{ titleText }}</div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
const { titleText } = defineProps<{
  titleText: string
}>()
</script>

<style scoped lang="less">
.child-view-header {
  height: 50px;
  background: #fff;
  border-bottom: 1px solid rgba(230, 230, 231, 0.5);
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .title {
    font-size: 15px;
    font-weight: 600;
    color: #000;
  }
}
</style>
