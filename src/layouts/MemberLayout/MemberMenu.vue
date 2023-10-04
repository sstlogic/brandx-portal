<template>
  <v-sheet color="yellow" class="fill-height">
    <template v-for="(item, i) in items">
      <v-list-item :to="{ name: item.to }" active-class="active-tab" :key="i" v-if="shouldShowItem(item)" exact-path>
        <v-list-item-title class="font-weight-bold text-h5 text-right">{{ item.text }}</v-list-item-title>
      </v-list-item>
    </template>

    <v-list-item v-if="isAuthed" @click="logout">
      <v-list-item-title class="font-weight-bold text-h5 text-right">Logout</v-list-item-title>
    </v-list-item>

    <div class="px-4 mt-8">
      <base-button v-if="!isAuthed" black block class="mb-4" :to="{ name: routeNames.auth.login }"> Login </base-button>

      <base-button v-if="!isMember && isAuthed" black block class="mb-4" :to="{ name: routeNames.profile.billing }">
        Get Artist Pass
      </base-button>
      <base-button block href="https://www.brandx.org.au" target="_blank">Brand X Home</base-button>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/composables/useAuthStore';
import { User } from '@/models';
import { defineComponent } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';

type MenuItem = {
  text: string;
  to: string;
  auth: boolean;
  member: boolean;
  guest?: boolean;
};

export default defineComponent({
  components: { BaseButton },
  name: 'MemberMenu',
  setup() {
    const { isAuthed, isMember } = useAuthStore();
    const { router } = useRouter();
    const items = [
      { text: 'View Calendar', to: routeNames.home, guest: true },
      { text: 'Book a Space', to: routeNames.spaces.book, auth: false, member: true },
      { text: 'View Spaces', to: routeNames.spaces.all, auth: false, member: true },
      { text: 'My Bookings', to: routeNames.my.bookings, auth: true, member: true },
      { text: 'My Profile', to: routeNames.profile.details, auth: true, member: false },
      { text: 'FAQ & Help', to: routeNames.help, auth: false, member: true },
      { text: 'Contact', to: routeNames.contact, auth: false, member: false },
    ];

    const shouldShowItem = (item: MenuItem) => {
      if (item.guest && !isMember.value) {
        return true;
      }

      if (item.guest && isMember.value) {
        return false;
      }

      if (item.auth && !isAuthed.value) {
        return false;
      }

      if (item.member && !isMember.value) {
        return false;
      }

      return true;
    };

    const logout = async () => {
      await User.logout();
      router.push('/');
    };

    return {
      items,
      isAuthed,
      logout,
      shouldShowItem,
      routeNames,
      isMember,
    };
  },
});
</script>

<style scope lang="scss">
.active-tab {
  color: white !important;

  &::before {
    background-color: black !important;
    opacity: 1 !important;
  }

  .v-list-item__title {
    z-index: 99 !important;
  }
}
</style>
