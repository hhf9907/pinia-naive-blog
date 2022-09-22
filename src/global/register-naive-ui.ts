import { App } from 'vue'
import {
  // create naive ui
  create,
  // component
  NButton,
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutContent,
  NMenu,
  NGradientText,
  NScrollbar,
  NInput,
  NIcon,
  NAvatar,
  NEllipsis,
  NPopselect,
  NMessageProvider,
  NCard,
  NCheckbox,
  NGrid,
  NGi,
  NCarousel,
  NGridItem,
  NForm,
  NFormItem,
  NSelect,
  NRadio,
  NSkeleton,
  NDropdown,
  NPopconfirm,
  NBackTop,
  NUpload,
  NMention,
  NEmpty
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutContent,
    NMenu,
    NGradientText,
    NScrollbar,
    NInput,
    NIcon,
    NAvatar,
    NEllipsis,
    NPopselect,
    NMessageProvider,
    NCard,
    NCheckbox,
    NGrid,
    NGi,
    NCarousel,
    NGridItem,
    NForm,
    NFormItem,
    NSelect,
    NRadio,
    NSkeleton,
    NDropdown,
    NPopconfirm,
    NBackTop,
    NUpload,
    NMention,
    NEmpty
  ]
})

export default function (app: App): void {
  app.use(naive)
}
