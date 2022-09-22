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
  yData: number[]
  xData: string[]
}>()
const echartOptions = computed(() => {
  return {
    xAxis: {
      type: 'category',
      data: props.xData
    },
    tooltip: {
      trigger: 'item'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.yData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
})
</script>

<style scoped></style>
