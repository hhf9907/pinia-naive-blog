<template>
  <div class="detail">
    <template v-if="loading">
      <div style="width: 820px" class="skeleton">
        <n-skeleton text height="20px" style="width: 40%" />
        <n-skeleton text :repeat="5" />
        <n-skeleton text style="width: 60%" />
      </div>
    </template>
    <template v-else>
      <div
        class="left"
        :style="{ width: isLTWindow ? clientWidth + 'px' : '' }"
      >
        <PostHeader
          :post-detail="postDetail"
          @updateRelation="updateRelation"
        />
        <!-- <v-md-editor
          v-if="postDetail?.content"
          :model-value="postDetail?.content"
          mode="preview"
          ref="preview"
          @copy-code-success="handleCopyCodeSuccess"
        /> -->
        <div style="padding: 20px 35px; background-color: #fff">
          <md-editor
            v-if="postDetail?.content"
            v-model="postDetail!.content"
            @onGetCatalog="onGetCatalog"
            preview-only
          />
        </div>
        <PostComment :postId="postId" :post-detail="postDetail" />
      </div>
    </template>
    <div class="right" v-if="!isLTWindow">
      <div class="recom"></div>
      <div v-if="titles.length">
        <div class="catalogue" :class="{ fixed: isFixed }">
          <div class="title">目录</div>
          <div class="catalogue-list">
            <div
              v-for="anchor in titles"
              class="catalogue-item pointer text-omit"
              :class="{ active: currentLineIndex === anchor.id }"
              :style="{ padding: `10px 0 10px ${(anchor.level + 1) * 20}px` }"
              @click="handleAnchorClick(anchor.id)"
              :title="anchor.id"
              :key="anchor.id"
            >
              <a>{{ anchor.id }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import PostHeader from './cpns/post-header.vue'
import PostComment from './cpns/post-comment.vue'

import { getPostById } from '@/service/api/post/post'
import { PostDetailType } from '@/service/api/post/type'
import { debounce } from '@/utils/util'
import useListenerResize from '@/hooks/useListenerResize'

const route = useRoute()

const currentLineIndex = ref('1')

const loading = ref(false)
const postDetail = ref<PostDetailType>()
const titles = ref<{ id: string; level: number; offsetTop: number }[]>([])
const isFixed = ref(false)
const postId =
  typeof route.params.postId === 'string' ? route.params.postId : ''

let _scroll: any = undefined
let listenScrollTopFn: any = undefined

const { isLTWindow, clientWidth } = useListenerResize(1090)
// 监听滚动
onMounted(() => {
  _scroll = debounce(() => {
    const scrollTop = document.documentElement.scrollTop
    setLineIndex(scrollTop)
  }, 100)
  listenScrollTopFn = () => {
    const scrollTop = document.documentElement.scrollTop
    if (scrollTop >= 422) {
      isFixed.value = true
    } else {
      isFixed.value = false
    }
  }
  window.addEventListener('scroll', _scroll)
  window.addEventListener('scroll', listenScrollTopFn)
})
onUnmounted(() => {
  window.removeEventListener('scroll', _scroll)
  window.removeEventListener('scroll', listenScrollTopFn)
})

const getData = async () => {
  loading.value = true
  const post = await getPostById(postId)
  postDetail.value = post
  document.title = post.postName
  if (postDetail.value!.editorType === 2) {
    postDetail.value!.content = postDetail.value!.content
  }
  loading.value = false
}

onMounted(() => {
  getData()
})

// const getTitles = () => {
//   const anchors = preview.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
//   const titleList = Array.from(anchors).filter(
//     (title: any) => !!title.innerText.trim()
//   )

//   if (!titleList.length) {
//     titles.value = []
//     return
//   }

//   const hTags = Array.from(
//     new Set(titleList.map((title: any) => title.tagName))
//   ).sort()

//   titles.value = titleList.map((el: any, index: number) => {
//     const previewRef = preview.value.$el.querySelector(
//       `[data-v-md-line="${el.getAttribute('data-v-md-line')}"]`
//     )
//     if (index === 0) {
//       currentLineIndex.value = el.getAttribute('data-v-md-line')
//     }
//     return {
//       title: el.innerText,
//       lineIndex: el.getAttribute('data-v-md-line'),
//       indent: hTags.indexOf(el.tagName),
//       el: previewRef,
//       offsetTop: previewRef.offsetTop || 0
//     }
//   })
//   console.log(titles.value)
// }

const handleAnchorClick = (eleId: string) => {
  const offsetTop = document.getElementById(eleId)?.offsetTop
  currentLineIndex.value = eleId
  if (offsetTop) {
    // 滚动到指定的位置
    window.scrollTo({
      top: offsetTop + 100,
      behavior: 'smooth'
    })
  }
}

const setLineIndex = (scrollTo: number) => {
  titles.value.forEach((item, index) => {
    if (
      titles.value[index]?.offsetTop < scrollTo &&
      titles.value[index + 1]?.offsetTop > scrollTo
    ) {
      currentLineIndex.value = item.id
    }
    if (scrollTo > titles.value[titles.value.length - 1]?.offsetTop) {
      currentLineIndex.value = item.id
    }
  })
}

const onGetCatalog = (list: any) => {
  nextTick(() => {
    const titlelist = Array.from(list).map((item: any) => {
      return {
        id: item.text,
        level: item.level,
        offsetTop: document.getElementById(item.text)?.offsetTop || 0
      }
    })
    const maxNum = Math.max(...titlelist.map((item) => item.level))

    for (let i = 1; i < maxNum; i++) {
      const someI = titlelist.some((item) => item.level === i)
      if (!someI) {
        titlelist.forEach((item) => {
          if (item.level > 1) {
            item.level = item.level - 1
          }
        })
      }
    }
    titles.value = titlelist
    currentLineIndex.value = titlelist[0].id
  })
}

const updateRelation = (isRelation: number) => {
  postDetail.value!.isRelation = isRelation
}
</script>

<style scoped lang="less">
.detail {
  width: 1150px;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  .skeleton {
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
  }
  .left {
    width: 820px;
  }
  .right {
    width: 300px;
    .recom {
      box-sizing: border-box;
      padding: 20px;
      width: 100%;
      height: 400px;
      background-color: #fff;
      margin-bottom: 20px;
    }
    :deep(.catalogue-list::-webkit-scrollbar) {
      width: 5px; /*滚动条宽度*/
      height: 10px; /*滚动条高度*/
    }
    /*定义滚动条轨道 内阴影+圆角*/
    :deep(.catalogue-list::-webkit-scrollbar-track) {
      box-shadow: 0px 1px 3px #f1f1f1 inset; /*滚动条的背景区域的内阴影*/
      border-radius: 10px; /*滚动条的背景区域的圆角*/
      background-color: #f1f1f1; /*滚动条的背景颜色*/
    }
    /*定义滑块 内阴影+圆角*/
    :deep(.catalogue-list::-webkit-scrollbar-thumb) {
      box-shadow: 0px 1px 3px #c1c1c1 inset; /*滚动条的内阴影*/
      border-radius: 10px; /*滚动条的圆角*/
      background-color: #c1c1c1; /*滚动条的背景颜色*/
    }
    .catalogue {
      box-sizing: border-box;
      width: 300px;
      background-color: #fff;
      position: relative;

      .title {
        font-weight: 500;
        height: 46px;
        padding: 10px 20px;
        box-sizing: border-box;
        font-size: 16px;
        color: #1d2129;
        border-bottom: 1px solid #e4e6eb;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 90;
        background-color: #fff;
      }
      .catalogue-list {
        padding-right: 10px;
        padding-top: 46px;
        min-height: 400px;
        max-height: 700px;
        overflow-y: auto;
        .catalogue-item:hover {
          background-color: #f7f8fa;
        }
        .catalogue-item.active {
          color: #18a058;
          position: relative;
          ::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 0;
            margin-top: 7px;
            width: 4px;
            height: 16px;
            background: #18a058;
            border-radius: 0 4px 4px 0;
          }
        }
      }
    }
    .catalogue.fixed {
      position: fixed;
      top: 81px;
    }
  }
}
</style>
