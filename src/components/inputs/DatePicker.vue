<template>
  <div>
    <v-menu v-model="menu" transition="scale-transition" offset-y min-width="auto" :close-on-content-click="true">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="formatDate(date)"
          :label="label"
          :prepend-icon="icon ? 'mdi-calendar' : ''"
          readonly
          v-bind="attrs"
          v-on="on"
          outlined
          dense
          hide-details
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        scrollable
        first-day-of-week="1"
        :allowed-dates="allowedDates"
        :min="minDate"
      >
        <v-spacer></v-spacer>
        <!-- <v-btn text color="primary" @click="menu = false"> Cancel </v-btn> -->
        <!-- <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn> -->
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@/plugins/composition';
import { formatDate } from '@/utils/date';
import { parse, parseISO, startOfWeek } from 'date-fns';
import { getDay } from 'date-fns/esm';

export default defineComponent({
  name: 'DatePicker',
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
    label: {
      type: String,
      default: 'Select a Date',
    },
    weekly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Date,
    },
  },
  setup(props, { emit }) {
    const menu = ref(false);
    const date = computed({
      get: () => {
        return formatDate(props.value, 'yyyy-MM-dd') as string;
      },
      set: (value: string) => {
        emit('input', parseISO(value));
      },
    });

    onMounted(() => {
      if (props.weekly) {
        date.value = formatDate(startOfWeek(props.value, { weekStartsOn: 1 }), 'yyyy-MM-dd') as string;
      }
    });

    const setDate = (string: string) => {
      date.value = string;
    };

    const allowedDates = (val: string) => {
      if (!props.weekly) {
        return true;
      }

      const date = parse(val, 'yyyy-MM-dd', new Date());

      return getDay(date) === 1;
    };

    const minDate = computed(() => {
      if (!props.min) {
        return null;
      }

      return formatDate(props.min, 'yyyy-MM-dd');
    });

    return {
      menu,
      date,
      formatDate,
      setDate,
      allowedDates,
      minDate,
    };
  },
});
</script>

<style></style>
