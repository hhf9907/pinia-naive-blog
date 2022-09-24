<template>
  <div class="layout-header">
    <n-menu
      v-show="!isLTWindow"
      class="layout-header-menu"
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
      :on-update:value="routerTo"
    />
    <div class="layout-header-end">
      <n-input
        round
        placeholder="搜索"
        class="search-input"
        v-model:value="searchValue"
        clearable
      >
        <template #suffix>
          <n-icon
            class="search-icon"
            @click="handlerSearch"
            :component="Search"
          />
        </template>
      </n-input>
      <n-button
        style="margin-left: 20px"
        type="info"
        v-if="isShowPic"
        @click="routerTo('/post/editor')"
      >
        发布文章
      </n-button>
      <div class="user-info" v-if="isShowPic">
        <n-popselect :options="options" @update:value="popselectChange">
          <div class="username">{{ userStore.user.nickname }}</div>
        </n-popselect>
        <n-avatar size="small" :src="userStore.user.avatar" />
      </div>
      <n-button tertiary type="info" @click="toLogin" v-else>
        立即登录
      </n-button>
    </div>
    <login-popup v-if="showLogin" @hideLoginPop="hideLoginPop"></login-popup>
    <registerPopup v-if="showReg" @hideLoginPop="hideLoginPop"></registerPopup>
    <resetPopup v-if="showReset" @hideLoginPop="hideLoginPop"></resetPopup>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, onMounted } from 'vue'
import { Search } from '@vicons/ionicons5'
import { useRouter, useRoute } from 'vue-router'
import loginPopup from '@/components/login-popup'
import registerPopup from '@/components/register-popup'
import resetPopup from '@/components/reset-popup'
import bus from '@/utils/bus'
import localCache from '@/utils/cache'
import { useUserStore } from '@/store/user'
import useListenerResize from '@/hooks/useListenerResize'

// 菜单配置
import menuOptions from './config/menu-option'
import { menuKey } from '../layout-header/config/menu-keys'

const activeKey = ref<string>('')
const searchValue = ref<string | null>('')

const isShowPic = ref(false)
const showLogin = ref(false)
const showReg = ref(false)
const showReset = ref(false)
const routeLabel = ref('首页')

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

onMounted(() => {
  if (userStore.token) {
    isShowPic.value = true
  }
})
const { isLTWindow } = useListenerResize(900)

watchEffect(() => {
  activeKey.value = route.path
})
// const showReg = ref(false)
const options = [
  {
    label: '个人中心',
    value: 1
  },
  {
    label: '退出登录',
    value: 2
  }
]

const toLogin = () => {
  showLogin.value = true
}
bus.$on('showLogin', (data: boolean) => {
  showLogin.value = data
})
bus.$on('showReg', (data: boolean) => {
  showReg.value = data
})
bus.$on('showReset', (data: boolean) => {
  showReset.value = data
})

const outLogin = () => {
  localCache.deleteCache('token')
  localCache.deleteCache('user')
  router.go(0)
}
const popselectChange = (e: number) => {
  if (e === 2) {
    outLogin()
  }
  if (e === 1) {
    router.push({
      path: `/user/${userStore.user.userId}`
    })
  }
}
const hideLoginPop = () => {
  showLogin.value = false
  showReg.value = false
  showReset.value = false
}
const handlerSearch = () => {
  console.log('立即搜索：', searchValue.value)
  bus.$emit('searchPost', searchValue.value)
}

const routerTo = (key: string) => {
  router.push(key)
}

const handleSelect = (key: string) => {
  const titles = [
    {
      key: menuKey.HOME,
      title: '首页'
    },
    {
      key: menuKey.ABOUT,
      title: '关于我'
    },
    {
      key: menuKey.ABOUT_PROJECT,
      title: '关于项目'
    },
    {
      key: menuKey.CHARTS,
      title: '数据图表'
    }
  ]
  routerTo(key)
  routeLabel.value = titles.find((item: any) => item.key == key)?.title || ''
}
</script>
<style lang="less" scoped>
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 0 32px 0;
  display: flex;
  align-items: center;
  background: #fff;
  z-index: 100;
  border-bottom: 1px solid #f1f1f1;
  .layout-header-start {
    // flex: 1;
    width: 250px;
  }
  .layout-header-end {
    flex: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-input {
      width: 250px;
    }
    .search-icon {
      cursor: pointer;
    }

    .user-info {
      width: 150px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .username {
        cursor: pointer;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 20px;
      }
    }
  }
  .layout-header-menu {
    height: 100%;
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
