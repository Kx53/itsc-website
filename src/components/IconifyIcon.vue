<template>
  <Icon :icon="icon" :class="className" />
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});
</script>
