<template>
  <div class="tuijian">
    <div class="title">推荐文章</div>
    <div class="content" @click="toPost(props.recommend.postid)">
      <img :src="props.recommend.imgurl" alt="" />
      <div class="text">{{ props.recommend.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ISwiperType } from '@/service/api/home/type'

const props = defineProps<{ recommend: ISwiperType }>()
const toPost = (postid: string) => {
  window.open(`post/${postid}`)
}
</script>

<style lang="less" scoped>
.tuijian {
  width: 100%;
  background: #fff;
  padding: 35px 30px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  color: #282828;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  padding-bottom: 15px;
  margin-bottom: 25px;
  position: relative;
}
.title::after {
  content: '';
  background-color: #282828;
  left: 0;
  width: 50px;
  height: 2px;
  bottom: 0;
  position: absolute;
  transition: 0.5s;
}
.tuijian:hover {
  .title::after {
    width: 70px;
  }
}
.content {
  width: 100%;
  height: 192px;
  position: relative;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
    transition: all 0.6s;
  }
  img:hover {
    transform: scale(1.05);
  }
  .text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 20px;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
}
</style>
