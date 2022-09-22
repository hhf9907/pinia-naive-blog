<template>
  <div class="cart-box">
    <span>{{ props.pushPost.img_name }}</span>
    <img
      :src="pushPost.imgurl"
      alt=""
      @click.self="toPost(props.pushPost.postid)"
    />
    <div>{{ props.pushPost.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { ISwiperType } from '@/service/api/home/type'

const props = defineProps<{ pushPost: ISwiperType }>()
const toPost = (postid: string) => {
  window.open(`post/${postid}`)
}
</script>

<style lang="less" scoped>
.cart-box {
  height: 216px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #000;

  img {
    width: 100%;
    height: 216px;
    cursor: pointer;
  }
  div {
    position: absolute;
    margin: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 20px;
    color: #fff;
    display: block;
    font-style: 16px;
    font-weight: 400;
    background: rgba(0, 0, 0, 0.7);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  span {
    position: absolute;
    left: 20px;
    top: 20px;
    padding: 6px 10px;
    font-weight: 400;
    font-size: 12px;
    min-width: 50px;
    display: inline-block;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>
