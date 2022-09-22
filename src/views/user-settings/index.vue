<template>
  <div class="user-settings">
    <div class="container">
      <div class="header">
        <div class="header-content pointer" @click="toRouter(`/user/${userStore.user.userId}`)">
          <n-icon
            size="20"
            style="margin-right: 2px"
            :component="ChevronBack"
          />
          <span>返回个人主页</span>
        </div>
      </div>
      <div class="setting-view">
        <div class="sidebar">
          <div
            class="sidebar-item pointer"
            :class="{ active: route.path === settingsRouter.PROFILE }"
            @click="toRouter(settingsRouter.PROFILE)"
          >
            <n-icon
              size="20"
              style="margin-right: 12px; margin-left: 24px"
              :component="DocumentTextOutline"
            />
            <span>个人资料</span>
          </div>
          <div
            class="sidebar-item pointer"
            :class="{ active: route.path === settingsRouter.ACCOUNT }"
            @click="toRouter(settingsRouter.ACCOUNT)"
          >
            <n-icon
              size="20"
              style="margin-right: 12px; margin-left: 24px"
              :component="SettingsOutline"
            />
            <span>账号设置</span>
          </div>
          <div class="sidebar-item pointer">
            <n-icon
              size="20"
              style="margin-right: 12px; margin-left: 24px"
              :component="DocumentTextOutline"
            />
            <span>个人资料</span>
          </div>
          <div class="sidebar-item pointer">
            <n-icon
              size="20"
              style="margin-right: 12px; margin-left: 24px"
              :component="DocumentTextOutline"
            />
            <span>个人资料</span>
          </div>
        </div>
        <div class="view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronBack,
  DocumentTextOutline,
  SettingsOutline
} from '@vicons/ionicons5'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
enum settingsRouter {
  PROFILE = '/userSetting/profile',
  ACCOUNT = '/userSetting/account'
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const toRouter = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="less">
.user-settings {
  padding-top: 41px;
  .container {
    width: 1200px;
    margin: 0 auto;
    .header {
      height: 46px;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding-left: 22px;
      .header-content {
        display: flex;
        align-items: center;
        color: #909090;
      }
      .header-content:hover {
        color: #18a058;
      }
    }
    .setting-view {
      display: flex;
      margin-top: 16px;
      .sidebar {
        width: 230px;
        margin-right: 20px;
        background-color: #fff;
        height: 626px;
        padding: 8px;
        box-sizing: border-box;
        .sidebar-item {
          height: 48px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          font-size: 16px;
          color: #4e5969;
        }
        .sidebar-item.active {
          background-color: #d9f1e7;
          color: #18a058;
        }
        .sidebar-item:hover {
          background-color: #d9f1e7;
          color: #18a058;
        }
      }
      .view {
        background-color: #fff;
        flex: 1;
        height: 626px;
        box-sizing: border-box;
        padding: 20px;
      }
    }
  }
}
</style>
