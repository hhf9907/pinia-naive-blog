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
        <v-md-editor
          v-if="postDetail?.content"
          :model-value="postDetail?.content"
          mode="preview"
          ref="preview"
          @copy-code-success="handleCopyCodeSuccess"
        />
        <PostComment :postId="postId" :post-detail="postDetail" />
      </div>
    </template>
    <div class="right" v-if="!isLTWindow">
      <div class="recom"></div>
      <div v-if="titles.length">
        <div class="catalogue" :class="{ fixed: isFixed }">
          <div class="title">目录</div>
          <div
            v-for="anchor in titles"
            class="catalogue-item pointer text-omit"
            :class="{ active: currentLineIndex === anchor.lineIndex }"
            :style="{ padding: `10px 0 10px ${(anchor.indent + 1) * 20}px` }"
            @click="handleAnchorClick(anchor)"
            :title="anchor.title"
            :key="anchor.title"
          >
            <a>{{ anchor.title }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'

import PostHeader from './cpns/post-header.vue'
import PostComment from './cpns/post-comment.vue'

import { getPostById } from '@/service/api/post/post'
import { PostDetailType } from '@/service/api/post/type'
import { debounce, generateUId } from '@/utils/util'
import useListenerResize from '@/hooks/useListenerResize'

const route = useRoute()
const message = useMessage()
const preview = ref()
const currentLineIndex = ref('1')

const loading = ref(false)
const postDetail = ref<PostDetailType>()
const titles = ref<any[]>([])
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
    postDetail.value!.content = setHtmlContent(postDetail.value!.content)
  }
  loading.value = false
  nextTick(() => {
    getTitles()
  })
}

onMounted(() => {
  getData()
})

const setHtmlContent = (content: string) => {
  content = replaceHtml(content, '<h1')
  content = replaceHtml(content, '<h2')
  content = replaceHtml(content, '<h3')
  content = replaceHtml(content, '<h4')
  content = replaceHtml(content, '<h5')
  content = replaceHtml(content, '<h6')
  return content
}

const replaceHtml = (content: string, subStr: string) => {
  let pos = content.indexOf(subStr)
  let index = 0

  while (pos > -1) {
    index++
    if (index == 100) {
      // 防止死循环。。。。预防万一电脑炸
      break
    }
    content =
      content.slice(0, pos + 3) +
      ` data-v-md-line=${generateUId()} ` +
      content.slice(pos + 3, content.length)
    pos = content.indexOf(subStr, pos + 50)
  }
  return content
}

const getTitles = () => {
  const anchors = preview.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
  const titleList = Array.from(anchors).filter(
    (title: any) => !!title.innerText.trim()
  )

  if (!titleList.length) {
    titles.value = []
    return
  }

  const hTags = Array.from(
    new Set(titleList.map((title: any) => title.tagName))
  ).sort()

  titles.value = titleList.map((el: any, index: number) => {
    const previewRef = preview.value.$el.querySelector(
      `[data-v-md-line="${el.getAttribute('data-v-md-line')}"]`
    )
    if (index === 0) {
      currentLineIndex.value = el.getAttribute('data-v-md-line')
    }
    return {
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName),
      el: previewRef,
      offsetTop: previewRef.offsetTop || 0
    }
  })
  console.log(titles.value)
}

const handleAnchorClick = (anchor: any) => {
  const { lineIndex, el } = anchor
  currentLineIndex.value = lineIndex
  if (el) {
    // 滚动到指定的位置
    window.scrollTo({
      top: el.offsetTop,
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
      currentLineIndex.value = item.lineIndex
    }
    if (scrollTo > titles.value[titles.value.length - 1]?.offsetTop) {
      currentLineIndex.value = item.lineIndex
    }
  })
}

const handleCopyCodeSuccess = () => {
  message.success('复制成功~')
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
    :deep(.catalogue::-webkit-scrollbar) {
      width: 5px; /*滚动条宽度*/
      height: 10px; /*滚动条高度*/
    }
    /*定义滚动条轨道 内阴影+圆角*/
    :deep(.catalogue::-webkit-scrollbar-track) {
      box-shadow: 0px 1px 3px #f1f1f1 inset; /*滚动条的背景区域的内阴影*/
      border-radius: 10px; /*滚动条的背景区域的圆角*/
      background-color: #f1f1f1; /*滚动条的背景颜色*/
    }
    /*定义滑块 内阴影+圆角*/
    :deep(.catalogue::-webkit-scrollbar-thumb) {
      box-shadow: 0px 1px 3px #c1c1c1 inset; /*滚动条的内阴影*/
      border-radius: 10px; /*滚动条的圆角*/
      background-color: #c1c1c1; /*滚动条的背景颜色*/
    }
    .catalogue {
      box-sizing: border-box;
      width: 300px;
      min-height: 400px;
      max-height: 700px;
      overflow-y: auto;
      background-color: #fff;
      position: relative;
      padding-right: 10px;
      .title {
        font-weight: 500;
        padding: 10px 20px;
        font-size: 16px;
        line-height: 2rem;
        color: #1d2129;
        border-bottom: 1px solid #e4e6eb;
      }
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
    .catalogue.fixed {
      position: fixed;
      top: 81px;
    }
  }
}
</style>
