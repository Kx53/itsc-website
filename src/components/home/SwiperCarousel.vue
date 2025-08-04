<template>
  <div class="flex items-center justify-center gap-2 sm:gap-4">
    <!-- Custom Prev Button -->
    <button ref="prev" class="btn btn-circle">❮</button>

    <swiper
      :modules="[Navigation, Pagination, Virtual]"
      :slides-per-view="1"
      :space-between="50"
      :loop="true"
      :pagination="{ clickable: true, el: '.swiper-pagination-custom' }"
      :navigation="{ prevEl: prev, nextEl: next }"
      :virtual="true"
      class="w-full max-w-4xl"
    >
      <swiper-slide
        v-for="(post, index) in posts"
        :key="index"
        :virtualIndex="index"
      >
        <div class="card lg:card-side bg-base-200 shadow-xl">
          <figure class="lg:w-1/2">
            <img
              :src="post.optimizedImage.src"
              :alt="post.title"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div class="card-body lg:w-1/2">
            <h2 class="card-title text-2xl font-bold">{{ post.title }}</h2>
            <p class="py-4">{{ post.description }}</p>
            <div class="card-actions justify-end">
              <a :href="post.link" class="btn btn-primary"> อ่านต่อ </a>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Custom Next Button -->
    <button ref="next" class="btn btn-circle">❯</button>
  </div>
  <!-- Custom Pagination -->
  <div class="swiper-pagination-custom text-center mt-4"></div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Virtual } from "swiper/modules";

defineProps({
  posts: Array,
});

const prev = ref(null);
const next = ref(null);
</script>

<style>
.swiper-pagination-custom .swiper-pagination-bullet {
  background-color: hsl(var(--bc) / 0.5); /* Base content color with opacity */
}
.swiper-pagination-custom .swiper-pagination-bullet-active {
  background-color: hsl(var(--p)); /* Primary color */
}
</style>
