<template>
  <n-carousel show-arrow autoplay class="swiper-image">
    <img
      class="carousel-img"
      v-for="item in swiperImages"
      :src="item.imgurl"
      :key="item.id"
      @click="routerTo(item.postid)"
    />

    <template #arrow="{ prev, next }">
      <div class="custom-arrow">
        <button type="button" class="curtom-arrow--left" @click="prev">
          <n-icon><ArrowBack /></n-icon>
        </button>
        <button type="button" class="curtom-arrow--right" @click="next">
          <n-icon><ArrowForward /></n-icon>
        </button>
      </div>
    </template>
    <template #dots="{ total, currentIndex, to }">
      <ul class="custom-dots">
        <li
          v-for="index of total"
          :key="index"
          :class="{ ['is-active']: currentIndex === index - 1 }"
          @click="to(index - 1)"
        />
      </ul>
    </template>
  </n-carousel>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowBack, ArrowForward } from '@vicons/ionicons5'
import { ISwiperType } from '@/service/api/home/type'

defineProps<{
  swiperImages: ISwiperType[]
}>()

const router = useRouter()

const routerTo = (postid: string) => {
  // router.push(`https://www.coderhhf.cn/post/${postid}`)
  window.open(`https://www.coderhhf.cn/post/${postid}`)
}
</script>

<style scoped>
.swiper-image {
  height: 456px;
}
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
