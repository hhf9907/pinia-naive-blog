<template>
  <div class="user">
    <div class="user-left">
      <UserInfo :user-info="info" @getUserInfo="getUserInfo" />
      <UserTabbar />
      <div class="user-child-view">
        <router-view></router-view>
      </div>
    </div>
    <div class="user-right">
      <div class="user-achievement">
        <h3>个人成就</h3>
        <div class="user-data">
          <div class="user-data-item">
            <n-icon size="20" :component="EyeOutline" />
            <div class="text">文章被阅读 {{ info?.pvTotal }}</div>
          </div>
          <div class="user-data-item">
            <n-icon size="20" :component="StarOutline" />
            <div class="text">文章被收藏 {{ info?.beCollectedTotal }}</div>
          </div>
        </div>
      </div>
      <div class="concern-and-fans">
        <div class="item pointer" @click="toRouter('concerns')">
          <div class="text">关注了</div>
          <div class="num">{{ info?.concerns }}</div>
        </div>
        <div class="item pointer" @click="toRouter('fans')">
          <div class="text">关注者</div>
          <div class="num">{{ info?.fans }}</div>
        </div>
      </div>
      <div class="more">
        <div class="more-item pointer" @click="toRouter('collections')">
          <div>收藏集</div>
          <div>{{ info?.collectTotal }}</div>
        </div>
        <div class="more-item">
          <div>加入于</div>
          <div>{{ dateFormat(info?.createTime || '') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
import { EyeOutline, StarOutline } from '@vicons/ionicons5'
import { getUserInfoById } from '@/service/api/user/user'
import { UserInfoType } from '@/service/api/user/type'
// 工具
import { dateFormat } from '@/utils/dateFormat'

// 组件
import UserInfo from './cpns/user-info.vue'
import UserTabbar from './cpns/user-tabbar.vue'

const route = useRoute()
const router = useRouter()

const userId = ref(String(route.params.userId))
const info = ref<UserInfoType | null>()

const getUserInfo = async () => {
  info.value = await getUserInfoById(userId.value)
}

onMounted(() => {
  getUserInfo()
})
watch(
  route,
  (toRoute: RouteLocationNormalizedLoaded) => {
    if (toRoute.params.userId !== userId.value) {
      userId.value = toRoute.params.userId + ''
      getUserInfo()
    }
  },
  {
    immediate: true,
    deep: true
  }
)
const toRouter = (name: string) => {
  router.push(`/user/${route.params.userId}/${name}`)
}
</script>

<style scoped lang="less">
.user {
  width: 970px;
  padding-top: 20px;
  margin: 0 auto;
  display: flex;
  .user-left {
    width: 710px;
  }
  .user-right {
    flex: 1;
    margin-left: 20px;
    .user-achievement {
      box-sizing: border-box;
      height: 164px;
      background-color: #fff;
      h3 {
        margin: 0;
        padding: 14px;
        border-bottom: 1px solid rgba(230, 230, 231, 0.5);
      }
      .user-data {
        padding: 14px;
        .user-data-item {
          display: flex;
          align-items: center;
          margin-top: 10px;
          .text {
            margin-left: 10px;
          }
        }
      }
    }
    .concern-and-fans {
      margin-top: 20px;
      background-color: #fff;
      height: 76px;
      display: flex;
      .item {
        flex: 1;
        padding: 16px 0;
        .text {
          text-align: center;
          color: #31445b;
        }
        .num {
          text-align: center;
          font-weight: 600;
        }
      }
    }
    .more {
      margin-top: 20px;
      .more-item {
        display: flex;
        padding: 15px 5px;
        font-size: 15px;
        justify-content: space-between;
        color: #000;
        border-top: 1px solid rgba(230, 230, 231, 0.5);
      }
      .more-item:hover {
        color: #18a058;
      }
    }
  }
}
</style>
