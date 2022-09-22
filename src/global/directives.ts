import { App } from 'vue'
type HTMLInputElementType = InstanceType<typeof HTMLInputElement>
export default function (app: App) {
  app.directive('scroll', {
    // 当绑定元素插入到 DOM 中
    created: function (el: HTMLInputElementType, binding: any) {
      const cb = binding.value
      el.addEventListener('mousewheel', function (e: any) {
        const isUp = e.deltaY > 0 ? true : false
        cb(isUp)
      })
    }
  })

  app.directive('focus', {
    // 当绑定元素插入到 DOM 中
    mounted: function (el: HTMLInputElementType) {
      el.focus()
    }
  })
}
