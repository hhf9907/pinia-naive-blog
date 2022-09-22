<template>
  <div class="user-tabbar">
    <div
      class="tabbar-item pointer"
      v-for="item in options"
      :key="item.router"
      :class="{ active: item.router === route.path }"
      @click="toRouter(item.router)"
    >
      {{ item.label }}
    </div>
    <!-- <div class="tabbar-item pointer">文章</div>
    <div class="tabbar-item pointer">收藏</div> -->
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'

const route = useRoute()
const router = useRouter()

const routeUserId = ref(route.params.userId)
const options = computed(() => {
  return [
    { label: '动态', router: `/user/${routeUserId.value}` },
    { label: '文章', router: `/user/${routeUserId.value}/posts` },
    { label: '收藏', router: `/user/${routeUserId.value}/collections` },
    { label: '关注', router: `/user/${routeUserId.value}/concerns` },
    { label: '粉丝', router: `/user/${routeUserId.value}/fans` }
  ]
})

watch(
  route,
  (toRoute: RouteLocationNormalizedLoaded) => {
    routeUserId.value = toRoute.params.userId
  },
  {
    deep: true
  }
)

const toRouter = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="less">
.user-tabbar {
  margin-top: 20px;
  background-color: #fff;
  height: 48px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid rgba(230, 230, 231, 0.5);
  .tabbar-item {
    width: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #515767;
  }
  .tabbar-item:hover {
    color: #18a058;
  }
  .tabbar-item.active {
    color: #18a058;
    position: relative;
  }
  .tabbar-item.active::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 3px;
    border-radius: 50px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    z-index: 10;
    background-color: #00a35d;
  }
}
</style>
