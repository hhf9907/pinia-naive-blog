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
const randomData = () => {
  return Math.round(Math.random() * 1000)
}

// const props = defineProps<{
//   barData: number[]
// }>()
const echartOptions = computed(() => {
  return {
    title: {
      text: '销量',
      subtext: '纯属虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['iphone11', 'iphone12', 'iphone13']
    },
    visualMap: {
      min: 0,
      max: 2500,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {}
    },
    series: [
      {
        name: 'iphone11',
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: [
          { name: '北京', value: randomData() },
          { name: '天津', value: randomData() },
          { name: '上海', value: randomData() },
          { name: '重庆', value: randomData() },
          { name: '河北', value: randomData() },
          { name: '河南', value: randomData() },
          { name: '云南', value: randomData() },
          { name: '辽宁', value: randomData() },
          { name: '黑龙江', value: randomData() },
          { name: '湖南', value: randomData() },
          { name: '安徽', value: randomData() },
          { name: '山东', value: randomData() },
          { name: '新疆', value: randomData() },
          { name: '江苏', value: randomData() },
          { name: '浙江', value: randomData() },
          { name: '江西', value: randomData() },
          { name: '湖北', value: randomData() },
          { name: '广西', value: randomData() },
          { name: '甘肃', value: randomData() },
          { name: '山西', value: randomData() },
          { name: '内蒙古', value: randomData() },
          { name: '陕西', value: randomData() },
          { name: '吉林', value: randomData() },
          { name: '福建', value: randomData() },
          { name: '贵州', value: randomData() },
          { name: '广东', value: randomData() },
          { name: '青海', value: randomData() },
          { name: '西藏', value: randomData() },
          { name: '四川', value: randomData() },
          { name: '宁夏', value: randomData() },
          { name: '海南', value: randomData() },
          { name: '台湾', value: randomData() },
          { name: '香港', value: randomData() },
          { name: '澳门', value: randomData() }
        ]
      },
      {
        name: 'iphone12',
        type: 'map',
        mapType: 'china',
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: [
          { name: '北京', value: randomData() },
          { name: '天津', value: randomData() },
          { name: '上海', value: randomData() },
          { name: '重庆', value: randomData() },
          { name: '河北', value: randomData() },
          { name: '安徽', value: randomData() },
          { name: '新疆', value: randomData() },
          { name: '浙江', value: randomData() },
          { name: '江西', value: randomData() },
          { name: '山西', value: randomData() },
          { name: '内蒙古', value: randomData() },
          { name: '吉林', value: randomData() },
          { name: '福建', value: randomData() },
          { name: '广东', value: randomData() },
          { name: '西藏', value: randomData() },
          { name: '四川', value: randomData() },
          { name: '宁夏', value: randomData() },
          { name: '香港', value: randomData() },
          { name: '澳门', value: randomData() }
        ]
      },
      {
        name: 'iphone13',
        type: 'map',
        mapType: 'china',
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: [
          { name: '北京', value: randomData() },
          { name: '天津', value: randomData() },
          { name: '上海', value: randomData() },
          { name: '广东', value: randomData() },
          { name: '台湾', value: randomData() },
          { name: '香港', value: randomData() },
          { name: '澳门', value: randomData() }
        ]
      }
    ]
  }
})
</script>

<style scoped></style>
