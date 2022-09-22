import { onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils/util'
export default function useScrollBottom(callback: Function) {
  let _scroll: any = undefined

  onMounted(() => {
    _scroll = debounce(() => {
      //scrollTop是滚动条滚动时，距离顶部的距离
      //为了保证兼容性，这里取两个值，哪个有值取哪一个
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      //windowHeight是可视区的高度
      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      //scrollHeight是滚动条的总高度
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      //滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight - 20) {
        //到了这个就可以进行业务逻辑加载后台数据了
        callback()
      }
    }, 200)

    window.addEventListener('scroll', _scroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', _scroll)
  })
}
