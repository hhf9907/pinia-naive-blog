<template>
  <div class="line-charts">
    <n-grid
      x-gap="20"
      y-gap="20"
      cols="3 s:1 m:2 l:2 xl:3 2xl:3"
      responsive="screen"
    >
      <n-grid-item>
        <n-card title="文章浏览量top5">
          <pie-echart :pieData="pieData"></pie-echart>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="散点图">
          <ScatterEchart :scatterData="scatterData"></ScatterEchart>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="玫瑰图">
          <RoseEchart :roseData="roseData"></RoseEchart>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="折线图">
          <LineEchart :lineData="lineData"></LineEchart>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="近30天登录人数">
          <bar-echart :y-data="loginCountData.counts" :x-data="loginCountData.days"></bar-echart>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="柱状图2">
          <bar-echart :y-data="loginCountData.counts" :x-data="loginCountData.days"></bar-echart>
        </n-card>
      </n-grid-item>
    </n-grid>
    <!-- <n-grid
      x-gap="20"
      y-gap="20"
      style="margin-top: 20px"
      cols="2 s:1 m:2 l:2 xl:2 2xl:2"
      responsive="screen"
    >
      <n-grid-item>
        <n-card title="折线图">
          <LineEchart :lineData="lineData"></LineEchart>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="柱状图">
          <bar-echart :barData="barData"></bar-echart>
        </n-card>
      </n-grid-item>
    </n-grid> -->
    <n-card title="地图" style="margin-top: 20px">
      <MapEchart height="600px"></MapEchart>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  PieEchart,
  LineEchart,
  ScatterEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from '@/components/echarts'

// api
import { getPvTopFive, getLoginCount } from '@/service/api/statistic/statistic'

const pieData = ref()

const scatterData = [
  [10.0, 8.04],
  [8.07, 6.95],
  [13.0, 7.58],
  [9.05, 8.81],
  [11.0, 8.33],
  [14.0, 7.66],
  [13.4, 6.81],
  [10.0, 6.33],
  [14.0, 8.96],
  [12.5, 6.82],
  [9.15, 7.2],
  [11.5, 7.2],
  [3.03, 4.23],
  [12.2, 7.83],
  [2.02, 4.47],
  [1.05, 3.33],
  [4.05, 4.96],
  [6.03, 7.24],
  [12.0, 6.26],
  [12.0, 8.84],
  [7.08, 5.82],
  [5.02, 5.68]
]
const lineData = [820, 932, 901, 934, 1290, 1330, 1320]

const roseData = [
  { value: 40, name: 'rose 1' },
  { value: 38, name: 'rose 2' },
  { value: 32, name: 'rose 3' },
  { value: 30, name: 'rose 4' }
]

const loginCountData = reactive<{
  days: string[]
  counts: number[]
}>({
  days: [],
  counts: []
})

onMounted(() => {
  getPieData()
  getLoginCountData()
})

async function getPieData() {
  const data = await getPvTopFive()
  pieData.value = data.map((item) => {
    return {
      name: item.postName,
      value: item.pv
    }
  })
}

async function getLoginCountData() {
  const data = await getLoginCount()
  data.forEach((item) => {
    loginCountData.days.push(item.days)
    loginCountData.counts.push(item.count)
  })
}
</script>

<style lang="less" scoped>
.line-charts {
  padding: 20px;
  .grid {
    margin-top: 20px;
  }
}
</style>
