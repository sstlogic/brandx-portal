<template>
  <member-page title="My Bookings">
    <template #header>
      <v-tabs background-color="lightGray" color="black" fixed-tabs slider-size="4">
        <v-tab class="tab font-weight-bold text-capitalize" :to="{ name: routeNames.help }">FAQ</v-tab>
        <v-tab class="tab font-weight-bold text-capitalize" :to="{ name: routeNames.contact }">Contact</v-tab>
      </v-tabs>
    </template>

    <div>
      <getting-started />
      <menu-topic />
      <calendar />
    </div>
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { computed, defineComponent } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import Calendar from './Calendar/Calendar.vue';
import GettingStarted from './GettingStarted/GettingStarted.vue';
import MenuTopic from './Menu/Menu.vue';

export default defineComponent({
  components: { MemberPage, BaseButton, GettingStarted, MenuTopic, Calendar },
  name: 'HelpPage',
  setup() {
    const components = computed(() => {
      const comps = require.context('./components', false, /[A-Z]\w+\.(vue|js)$/);

      return comps.keys().map((x) => comps(x).default || comps(x));
    });

    return {
      routeNames,
      components,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab {
  font-size: 1.125rem;
}
</style>
