import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)
export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el, undefined, { renderer: 'svg' })
  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }
  /**
   * 重新设置宽高
   */
  const updateResize = () => {
    echartInstance.resize()
  }
  window.addEventListener('resize', () => {
    updateResize()
  })
  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
