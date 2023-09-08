<template>
  <transition name="fade" mode="out-in">
    <router-view :name="name" />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';

export default defineComponent({
  name: 'BaseRouter',
  props: {
    name: {
      type: String,
      required: false,
    },
  },
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
