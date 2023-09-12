<template>
  <div class="w-full">
    <v-expand-transition>
      <v-card-title v-if="showTitle" class="bg-black text-yellow" :class="titleClass">{{ title }}</v-card-title>
    </v-expand-transition>

    <slot name="header" />
    <v-sheet class="pa-2 mt-2 mx-auto" :max-width="md ? '1080px' : '100%'">
      <div v-if="heading" class="font-weight-bold text-h5 mb-2">{{ heading }}</div>
      <slot />
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';

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
    const { route } = useRouter();

    return {
      md,
      routeNames,
      route,
    };
  },
});
</script>

<style>
.close-route {
  color: #231F20 !important;
  text-decoration: none;
  cursor: pointer;
}

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

  /* .artist-section {
    width: 100%;
    max-width: 600px;
    margin-right: 50px;
  } */

  .tab-title {
    font-family: 'Roboto-Medium' !important;
    font-size: 30px;
    font-weight: 900;
    line-height: 42px;
    letter-spacing: 0em;
  }
}

@media only screen and (max-width: 1024px) {
  .main-section {
    background-color: #ffffff;
  }

  .artist-section {
    display: none;
  }

  .tab-title {
    font-family: 'Roboto-Medium' !important;
    font-size: 36px;
    font-weight: 900;
    line-height: 42px;
    letter-spacing: 0em;
  }
}
</style>
