<template>
  <base-echart :options="echartOptions"></base-echart>
</template>

<script setup lang="ts">
import BaseEchart from '@/common/echart'
import { computed } from 'vue'
// echarts 使用方法
/**
 * echarts.init(dom, theme, optios) 1.绑定的dom 2.
 */
const props = defineProps<{
  scatterData: number[][]
}>()
const echartOptions = computed(() => {
  return {
    xAxis: {},
    yAxis: {},
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        symbolSize: 20,
        data: props.scatterData,
        type: 'scatter'
      }
    ]
  }
})
</script>

<style scoped></style>
