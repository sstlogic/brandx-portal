<template>
  <div>
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
import SubscriptionMenu from './SubscriptionMenu.vue';
import { routeNames } from '@/router/routeNames';
import { useAuthStore } from '@/composables/useAuthStore';
import { useRouter } from '@/router/useRouter';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: { AppBarIcon, ScheduleSelectInput, BaseRouter, SubscriptionMenu, BaseButton },
  name: 'SubscriptionLayout',
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
