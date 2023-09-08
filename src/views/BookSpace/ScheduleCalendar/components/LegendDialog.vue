<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on"><slot></slot></div>
      </template>

      <v-card>
        <v-card-title class="text-text-lowercase d-flex">
          <div class="text-h5 font-weight-bold">Get Started</div>
          <v-spacer />
          <v-icon @click="dialog = false">mdi-close</v-icon>
        </v-card-title>

        <v-card-text>
          <div>
            Welcome to the Brand X calendar. Find this useful key anytime by tapping on the
            <v-icon small>mdi-information</v-icon> information icon.

            <div class="mt-4">
              <div class="font-weight-bold">Calendar Availability</div>
              <div class="mb-1">The colours below refer to;</div>
              <v-row
                ><v-col cols="6" v-for="color in colors" :key="color.text" class="d-flex align-center">
                  <v-sheet
                    width="50"
                    height="50"
                    :color="color.color"
                    class="mr-2 d-flex align-center justify-center"
                    :class="color.color === 'lightYellow' ? 'available-border' : ''"
                  >
                    <div>{{ color.icon }}</div>
                  </v-sheet>
                  <div>{{ color.text }}</div>
                </v-col>
              </v-row>
            </div>

            <div class="mt-4">
              <div class="font-weight-bold">Repeating Bookings</div>
              <div class="d-flex align-center">
                <v-btn fab color="yellow" class="ma-2 mr-4"> <v-icon>mdi-tune</v-icon></v-btn>
                <div>Select the filter icon to find specific times and for recourring bookings.</div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <base-button @click="dialog = false">Continue</base-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent, ref } from '@/plugins/composition';

export default defineComponent({
  components: { BaseButton },
  name: 'LegendDialog',
  setup() {
    const dialog = ref(false);

    const colors = [
      {
        color: 'black',
        text: 'Closed',
      },
      {
        color: 'lightYellow',
        text: 'Available',
        icon: '+',
      },
      {
        color: 'darkGray',
        text: 'Booked',
      },
      {
        color: 'lightYellow darken-1',
        text: 'Your Selection',
      },
      {
        color: 'error',
        text: 'Unavailable',
      },
    ];

    return {
      dialog,
      colors,
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
