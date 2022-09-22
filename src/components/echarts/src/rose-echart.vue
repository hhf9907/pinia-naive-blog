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
  roseData: IDataType[]
}>()
const echartOptions = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
