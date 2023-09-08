<template>
  <member-page title="Artist Pass">
    <template #header>
      <v-tabs background-color="lightGray" color="black" fixed-tabs slider-size="4">
        <v-tab class="tab font-weight-bold text-capitalize" :to="{ name: routeNames.profile.details }">Profile</v-tab>
        <v-tab class="tab font-weight-bold text-capitalize" :to="{ name: routeNames.profile.billing }">Billing</v-tab>
        <v-tab class="tab font-weight-bold text-capitalize" :to="{ name: routeNames.profile.password }">Password</v-tab>
      </v-tabs>
    </template>
    <base-router />
  </member-page>
</template>

<script lang="ts">
import BaseRouter from '@/components/BaseRouter.vue';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { defineComponent } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';

export default defineComponent({
  components: { MemberPage, BaseRouter },
  name: 'ProfilePage',
  setup() {
    return {
      routeNames,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab {
  font-size: 1.125rem;
}
</style>
