<template>
  <div>
    <v-app-bar app height="75" flat clipped-right fixed dense style="z-index: 90">
      <v-app-bar-title class="pa-2">
        <v-img
          :src="require('@/assets/brandx-black.svg')"
          height="100%"
          max-height="75px"
          width="170px"
          @click="goHome"
          contain
          class="cursor-pointer"
        />
      </v-app-bar-title>
      <v-spacer />
      <v-sheet
        v-if="isAuthed && isMember"
        width="75"
        height="75"
        color="yellow"
        class="d-flex justify-center align-center"
      >
        <v-btn icon outlined :to="{ name: routeNames.checkout }">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-sheet>
      <div v-else>
        <v-img :src="require('@/assets/space.jpg')" width="75px" />
      </div>
      <app-bar-icon :dark="nav ? false : true" :light="nav ? true : false" @click="toggleNav" />
    </v-app-bar>

    <v-navigation-drawer v-model="nav" right app temporary clipped :style="`margin-top: ${$vuetify.application.top}px`">
      <member-menu />
    </v-navigation-drawer>

    <v-main>
      <v-container class="pa-0" fluid>
        <v-layout>
          <base-router />
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import BaseRouter from '@/components/BaseRouter.vue';
import ScheduleSelectInput from '@/components/inputs/ScheduleSelect/ScheduleSelectInput.vue';
import { defineComponent, ref } from '@/plugins/composition';
import AppBarIcon from './AppBarIcon.vue';
import MemberMenu from './MemberMenu.vue';
import { routeNames } from '@/router/routeNames';
import { useAuthStore } from '@/composables/useAuthStore';
import { useRouter } from '@/router/useRouter';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: { AppBarIcon, ScheduleSelectInput, BaseRouter, MemberMenu, BaseButton },
  name: 'MemberLayout',
  setup() {
    const nav = ref(false);
    const toggleNav = () => {
      nav.value = !nav.value;
    };
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
      nav,
      toggleNav,
      routeNames,
      isAuthed,
      isMember,
      goHome,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content {
  padding: 0px !important;
}
</style>
