<template>
  <div class="w-full main-section">
    <!-- <v-expand-transition>
      <v-card-title v-if="showTitle" class="bg-black text-yellow" :class="titleClass">{{ title }}</v-card-title>
    </v-expand-transition> -->

    <!-- <slot name="header" /> -->
    <div class="mt-2 mx-auto main-section d-flex justify-center" :max-width="md ? '1080px' : '100%'">
      <!-- <div v-if="heading" class="font-weight-bold text-h5 mb-2">{{ heading }}</div> -->
      <div class="artist-section">
        <img alt="artist_pass" src="../../assets/artist_pass.png" />
      </div>
      <v-sheet class="form-section ">
        <slot />
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export default defineComponent({
  name: 'MemberPage',
  props: {
    title: {
      type: String,
      default: '',
    },
    heading: {
      type: String,
      default: null,
      required: false,
    },
    titleClass: {
      type: String,
      default: '',
      required: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  setup() {
    const { md } = useBreakpoints(breakpointsTailwind);

    return {
      md,
    };
  },
});
</script>

<style>
@media only screen and (min-width: 1025px) {
  .main-section {
    background-color: #F4E44C;
    position: relative;
  }

  .form-section {
    width: 100%;
    max-width: 600px;
    margin-left: 50px;
    padding: 10px;
  }

  .artist-section {
    width: 100%;
    max-width: 600px;
    margin-right: 50px;
  }
}

@media only screen and (max-width: 1024px) {
  .main-section {
    background-color: #ffffff;
  }

  .artist-section {
    display: none;
  }
}
</style>
