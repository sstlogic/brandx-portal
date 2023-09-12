<template>
  <div class="w-full main-section">
    <div class="mt-2 mx-auto main-section d-flex justify-center" :max-width="md ? '1080px' : '100%'">
      <div class="artist-section">
        <img alt="artist_pass" class="artist_pass" src="../../assets/artist_pass.png" />
      </div>
      <div class="form-section">
        <v-sheet class="py-5 form-inner-section shadow">
          <div class="d-flex mr-10 mt-3 justify-space-between pb-5" v-if="route.name != 'home'">
            <v-app-bar-title class="pa-2">
              <v-img :src="require('@/assets/brandx-black.svg')" height="100%" max-height="75px" width="260px"
                @click="goHome" contain class="cursor-pointer logo-image" />
            </v-app-bar-title>
            <router-link :to="{ name: routeNames.home }" class="tab-title close-route">X</router-link>
          </div>
          <slot />
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';
import { useAuthStore } from '@/composables/useAuthStore';

export default defineComponent({
  name: 'SubscriptionPage',
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
    const { isAuthed, isMember } = useAuthStore();
    const { router } = useRouter();
    const goHome = () => {
      if (!isAuthed.value) {
        return router.push('/');
      }

      if (!isMember.value) {
        return router.push('/');
      }

      router.push({ name: routeNames.dashboard });
    };
    return {
      goHome,
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
  .logo-image {
    margin-left: 10px;
  }

  .artist_pass {
    height: 100%;
    bottom: 0px;
  }

  .main-section {
    background-color: #F4E44C;
    position: relative;
  }

  .form-section {
    width: 100%;
    max-width: 600px;
    margin-left: 0px;
  }

  .form-inner-section {
    margin-bottom: 28px;
    margin-top: 28px;
    padding: 10px;
    padding-bottom: 50px !important;
    box-shadow: 0px 4px 4px 0px #00000040;
  }


  .artist-section {
    width: 100%;
    max-width: 600px;
    margin-right: 50px;
  }

  .tab-title {
    font-family: 'Roboto-Medium' !important;
    font-size: 24px !important;
    font-weight: 900;
    line-height: 42px;
    letter-spacing: 0em;
  }
}

@media only screen and (max-width: 1024px) {

  .artist_pass {
    height: 100%;
    bottom: 0px;
  }

  .main-section {
    background-color: #ffffff;
  }

  .form-section {
    width: 100%;
    /* max-width: 600px; */
    margin-left: 1em !important;
    margin-right: 1em !important;
    /* margin-bottom: 15px; */
    /* margin-top: 15px; */
    /* padding: 10px; */
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
