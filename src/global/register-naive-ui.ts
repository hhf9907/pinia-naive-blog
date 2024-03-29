import { App } from 'vue'
import {
  create,
  NAvatar,
  NBackTop,
  NButton,
  NCard,
  NCarousel,
  NCheckbox,
  NDescriptions,
  NDescriptionsItem,
  NDropdown,
  NEllipsis,
  NEmpty,
  NForm,
  NFormItem,
  NGi,
  NGradientText,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NMention,
  NMenu,
  NMessageProvider,
  NPopconfirm,
  NPopselect,
  NRadio,
  NScrollbar,
  NSelect,
  NSkeleton,
  NSpace,
  NUpload,
  NDialogProvider
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
    NEmpty,
    NDescriptions,
    NDescriptionsItem,
    NDialogProvider
  ]
})

export default function (app: App): void {
  app.use(naive)
}
