<template>
  <div>
    <v-select
      label="Repeating"
      dense
      outlined
      :items="options"
      item-text="text"
      item-value="value"
      v-model="interval"
      hide-details
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@/plugins/composition';

export default defineComponent({
  name: 'RecurringInput',
  props: {
    value: {
      type: String,
      required: false,
      default: 'single',
    },
  },
  setup(props, { emit }) {
    const interval = computed({
      get: () => props.value,
      set: (value: string) => emit('input', value),
    });
    const options = [
      { value: 'single', text: 'Does Not Repeat' },
      { value: 'daily', text: 'Daily' },
      { value: 'weekly', text: 'Weekly' },
      { value: 'monthly-day', text: 'Monthly (on the day)' },
      { value: 'monthly-date', text: 'Monthly (on the date)' },
    ];
    return {
      options,
      interval,
    };
  },
});
</script>

<style></style>
