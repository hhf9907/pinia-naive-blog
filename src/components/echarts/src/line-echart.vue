<template>
  <base-echart :options="echartOptions"></base-echart>
</template>

<script setup lang="ts">
import BaseEchart from '@/common/echart'
import { computed } from 'vue'
import { IDataType } from '../types/index'
// echarts 使用方法
/**
 * echarts.init(dom, theme, optios) 1.绑定的dom 2.
 */
const props = defineProps<{
  lineData: number[]
}>()
const echartOptions = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    tooltip: {
      trigger: 'item'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.lineData,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
