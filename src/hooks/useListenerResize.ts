import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils/util'

export default function useListenerResize(minWidth = 900) {
  let _onresize: any = undefined

  const isLTWindow = ref(false) // 是否小于窗口
  const clientWidth = ref(document.body.clientWidth)
  onMounted(() => {
    const width = document.body.clientWidth
    isLTWindow.value = width < minWidth

    // 监听屏幕宽度
    _onresize = debounce(() => {
      const width = document.body.clientWidth
      clientWidth.value = width
      isLTWindow.value = width < minWidth
    }, 200)
    window.onresize = _onresize
  })

  onUnmounted(() => {
    window.removeEventListener('resize', _onresize)
  })

  return {
    isLTWindow,
    clientWidth
  }
}
