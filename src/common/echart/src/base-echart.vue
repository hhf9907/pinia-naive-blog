<template>
  <div class="base-echart">
    <div :style="{ width, height }" ref="baseEchartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { EChartsOption } from 'echarts'
import { ref, onMounted, watchEffect } from 'vue'
import useEcharts from '../hooks/useEcharts'
// withDefaults 自定义参数
const props = withDefaults(
  defineProps<{
    options: EChartsOption | any
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const baseEchartRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEcharts(baseEchartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
