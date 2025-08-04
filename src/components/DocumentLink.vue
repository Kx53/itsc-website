<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="block border-b border-base-content/20 py-4 transition-colors hover:bg-base-200/50"
  >
    <div class="flex justify-between items-center">
      <p class="text-xl font-bold">{{ title }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  </a>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
</script>
