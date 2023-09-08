<template>
  <member-page title="View Spaces">
    <v-expansion-panels>
      <v-expansion-panel v-for="resource in resources" :key="resource.id">
        <v-expansion-panel-header>
          <div class="font-weight-bold">{{ resource.name }}</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-if="resource.location" class="font-weight-bold">{{ resource.location }}</div>
          <div v-if="resource.capacity" class="text--disabled mt-2">Capacity up to {{ resource.capacity }} people</div>
          <div v-html="resource.description" />
          <div v-html="resource.notes.replace(/(?:\r\n|\r|\n)/g, '<br>')" />
          <base-button
            v-if="isMember"
            class="mt-4"
            :to="{ name: routeNames.bookingsCalendar, query: { id: resource.scheduleId.toString() } }"
            >Book Space</base-button
          >
          <base-button v-else class="mt-4" :to="{ name: routeNames.profile.billing }"
            >Get Artist Pass To Book</base-button
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/composables/useAuthStore';
import { useBookedResources } from '@/composables/useBookedResources';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { Resource } from '@/models/booked/Resource';
import { defineComponent, onMounted, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';

export default defineComponent({
  components: { BaseButton, MemberPage },
  name: 'ViewSpacesPage',
  setup() {
    const resources = ref<Resource[]>([]);

    const { getResources } = useBookedResources();

    const { isMember } = useAuthStore();

    const loadResources = async () => {
      resources.value = await getResources();
    };

    onMounted(() => {
      loadResources();
    });

    return {
      resources,
      isMember,
      routeNames,
    };
  },
});
</script>

<style></style>
