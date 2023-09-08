<template>
  <div>
    <v-select
      v-model="selected"
      :items="schedules"
      :loading="loading"
      dense
      outlined
      label="Select a Space"
      item-value="id"
      item-text="name"
      return-object
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from '@/plugins/composition';
import { useLoader } from '@/composables/useLoader';
import { Schedule } from '@/models/booked/Schedule';
import { useBookedSchedules } from '@/composables/useBookedResources';

export default defineComponent({
  name: 'ScheduleSelectInput',
  props: {
    value: {
      type: Object as PropType<Schedule | null>,
      default: null,
    },
    initial: {
      type: String,
      required: false,
    },
    showDefault: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { loading, withLoader } = useLoader();
    const { getSchedules } = useBookedSchedules();

    const selected = computed({
      get: () => props.value,
      set: (value: Schedule | null) => emit('input', value),
    });

    const schedules = ref<Schedule[]>([]);

    const fetchSchedules = async () =>
      withLoader(async () => {
        schedules.value = await getSchedules();
      });

    onMounted(async () => {
      await fetchSchedules();
      if (props.initial) {
        selected.value = schedules.value.find((schedule: Schedule) => schedule.id.toString() === props.initial) ?? null;
      } else {
        if (props.showDefault) {
          selected.value = schedules.value.find((schedule: Schedule) => schedule.isDefault) ?? null;
        }
      }
    });

    return {
      schedules,
      selected,
      loading,
    };
  },
});
</script>

<style></style>
