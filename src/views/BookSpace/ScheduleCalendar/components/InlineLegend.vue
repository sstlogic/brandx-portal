<template>
  <v-sheet class="d-flex justify-space-between mx-auto" max-width="600px">
    <div v-for="color in colorsToShow" :key="color.text" class="d-flex align-center">
      <v-sheet
        width="25"
        height="25"
        :color="color.color"
        class="mr-2 d-flex align-center justify-center"
        :class="color.color === 'lightYellow' ? 'available-border' : ''"
      >
        <div v-if="!guest">{{ color.icon }}</div>
      </v-sheet>
      <div>{{ color.text }}</div>
    </div>
    <div v-if="!guest">
      <legend-dialog>
        <v-icon class="ml-2">mdi-information</v-icon>
      </legend-dialog>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, defineComponent, ref } from '@/plugins/composition';
import LegendDialog from './LegendDialog.vue';

export default defineComponent({
  components: { BaseButton, LegendDialog },
  name: 'InlineLegend',
  props: {
    guest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const dialog = ref(false);

    const colorsToShow = computed(() => {
      return colors.filter((color) => {
        if (props.guest) {
          return color.guest === undefined ? true : color.guest;
        }

        return color.guestOnly === undefined ? true : !color.guestOnly;
      });
    });

    const colors = [
      {
        color: 'lightYellow',
        text: 'Available',
        icon: '+',
      },
      {
        color: 'black',
        text: 'Closed',
        guestOnly: true,
      },
      {
        color: 'darkGray',
        text: 'Booked',
      },
      {
        color: 'lightYellow darken-1',
        text: 'Your Selection',
        guest: false,
      },
      // {
      //   color: 'error',
      //   text: 'Unavailable',
      // },
    ];

    return {
      dialog,
      colorsToShow,
    };
  },
});
</script>

<style lang="scss" scoped>
.available-border {
  border: 1px solid;
  border-color: var(--v-lightYellow-darken1) !important;
}
</style>
