<template>
  <v-sheet
    height="75"
    width="75"
    class="nav-icon d-flex justify-center align-center"
    :class="{
      dark: dark,
      light: light,
    }"
    v-on="$listeners"
  >
    <div>
      <svg width="32" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1" x2="45" y2="1" :stroke="stroke" stroke-width="2" />
        <line y1="11" x2="45" y2="11" :stroke="stroke" stroke-width="2" />
        <line y1="21" x2="45" y2="21" :stroke="stroke" stroke-width="2" />
        <line y1="31" x2="45" y2="31" :stroke="stroke" stroke-width="2" />
      </svg>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { computed, defineComponent } from '@/plugins/composition';

export default defineComponent({
  name: 'AppBarIcon',
  props: {
    light: {
      type: Boolean,
      required: false,
    },
    dark: {
      type: Boolean,
      required: false,
    },
  },

  setup(props) {
    const stroke = computed(() => {
      if (props.light) return 'black';
      if (props.dark) return 'white';
      return 'white';
    });

    return {
      stroke,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-icon {
  height: 100% !important;
  aspect-ratio: 1 / 1;
}
.dark {
  background-color: var(--v-black-base);
}
.light {
  background-color: var(--v-yellow-base);
}
</style>
