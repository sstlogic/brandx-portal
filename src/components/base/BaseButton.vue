<template>
  <v-btn class="custom-btn" v-bind="$attrs" tile x-large v-on="$listeners" :color="color" :dark="isDark"
    :outlined="isOutlined">
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { computed, defineComponent } from '@/plugins/composition';

export default defineComponent({
  name: 'BaseButton',
  props: {
    black: {
      type: Boolean,
      default: false,
    },
    yellow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs }) {
    const isDark = computed(() => {
      if (props.black && !attrs.disabled) {
        return true;
      }

      if (props.yellow && !attrs.disabled) {
        return true;
      }
    });
    const color = computed(() => {
      if (props.black) {
        return 'black';
      }
    });
    const isOutlined = computed(() => !props.black);

    return {
      isDark,
      color,
      isOutlined,
    };
  },
});
</script>

<style scoped lang="scss">
@media only screen and (min-width: 1025px) {
  .custom-btn {
    font-size: 30px !important;
    font-weight: 900;
    font-family: 'Roboto-Regular' !important;
    text-transform: none !important;
    font-style: normal !important;
    letter-spacing: 0em;
    text-align: left;
    padding: 10px 30px !important;
    color: #F4E44C;
    background: #231F20;
  }

  .v-btn:not(.v-btn--round).v-size--x-large {
    height: auto;
    width: auto;
  }
}

@media only screen and (max-width: 1024px) {
  // ::v-deep .v-btn__content {
  //   font-size: 36px !important;
  //   font-weight: 900;
  //   font-family: 'Roboto-Regular' !important;
  //   text-transform: none !important;
  //   font-style: normal !important;
  //   letter-spacing: 0em;
  // }

  .custom-btn {
    font-size: 36px !important;
    font-weight: 900;
    font-family: 'Roboto-Regular' !important;
    text-transform: none !important;
    font-style: normal !important;
    letter-spacing: 0em;
    text-align: left;
    padding: 10px 30px !important;
    color: #F4E44C;
    background: #231F20;
  }

  .v-btn:not(.v-btn--round).v-size--x-large {
    height: auto;
    width: auto;
  }
}
</style>
