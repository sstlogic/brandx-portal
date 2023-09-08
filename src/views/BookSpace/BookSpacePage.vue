<template>
  <member-page title="Book a Space" heading="What type of space are you looking for?">
    <v-row>
      <v-col cols="6" v-for="schedule in schedules" :key="schedule.id">
        <v-hover v-slot="{ hover }">
          <v-sheet
            color="black"
            height="100%"
            class="d-flex justify-center cursor-pointer transition-fast-in-fast-out"
            @click="bookForSchedule(schedule.id)"
            :elevation="hover ? 10 : 1"
          >
            <v-card-title
              class="bg-black text-yellow mb-4 text-center fill-height"
              style="word-break: break-word; font-size: 1rem"
            >
              {{ schedule.name }}
            </v-card-title>
          </v-sheet>
        </v-hover>
      </v-col>
    </v-row>
  </member-page>
</template>

<script lang="ts">
import { useBookedSchedules } from '@/composables/useBookedResources';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { Schedule } from '@/models/booked/Schedule';
import { defineComponent, onMounted, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';

export default defineComponent({
  components: { MemberPage },
  name: 'BookSpacePage',
  setup() {
    const schedules = ref<Schedule[]>([]);
    const { getSchedules } = useBookedSchedules();
    const { router } = useRouter();

    onMounted(async () => {
      schedules.value = await getSchedules();
    });

    const bookForSchedule = (id: number) => {
      router.push({ name: routeNames.bookingsCalendar, query: { id: id.toString() } });
    };

    return {
      schedules,
      bookForSchedule,
    };
  },
});
</script>

<style></style>
