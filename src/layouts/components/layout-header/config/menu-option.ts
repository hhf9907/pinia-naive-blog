import type { MenuOption } from 'naive-ui'
import { h } from 'vue'
import { menuKey } from './menu-keys'

const routerJump = (label: string, path: string) => {
  return () => {
    return h('a', {}, { default: () => label })
  }
}

const menuOptions: MenuOption[] = [
  {
    label: routerJump('首页', menuKey.HOME),
    key: menuKey.HOME,
    title: '首页'
  },
  {
    label: routerJump('关于我', menuKey.ABOUT),
    key: menuKey.ABOUT,
    title: '关于我'
  },
  {
    label: routerJump('关于项目', menuKey.ABOUT_PROJECT),
    key: menuKey.ABOUT_PROJECT,
    title: '关于项目'
  },
  {
    label: routerJump('数据图表', menuKey.CHARTS),
    key: menuKey.CHARTS,
    title: '数据图表'
  }
]
export default menuOptions
