<template>
  <div class="table-tr" v-for="(items, index) in dataArray" :key="index">
    <template v-for="(value, key) in items" :key="key">
      <div class="item" :title="String(key)">{{ key }}</div>
      <div class="item">{{ value }}</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  dataList: Object
})
let flag = 0
interface dataType {
  [name: string]: string | number
}
const dataArray: dataType[] = []
let dataItem: dataType = {}
for (const item in props.dataList) {
  if (flag % 3 === 0 && flag) {
    dataArray.push(dataItem)
    dataItem = {}
  }
  flag++
  dataItem[item] = props.dataList[item]
}
</script>

<style lang="less" scoped>
@import url(../assets/less/hf-table.less);
</style>
