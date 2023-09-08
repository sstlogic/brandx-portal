<template>
  <v-dialog persistent :value="pending" width="450">
    <v-card tile>
      <v-card-title>{{ confirmTitle }}</v-card-title>
      <v-card-text v-html="message" />
      <v-card-actions>
        <base-button color="cancel" class="text-capitalize" @click="cancel">{{ cancelText }}</base-button>
        <v-spacer />

        <base-button black class="text-capitalize" @click="confirm">{{ confirmText }}</base-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  cancel,
  cancelText,
  confirm,
  confirmText,
  confirmTitle,
  confirmType,
  confirmed,
  message,
  pending,
} from '@/composables/useConfirmation/useConfirmation';
import { defineComponent } from '@/plugins/composition';
import BaseButton from './base/BaseButton.vue';

export default defineComponent({
  components: { BaseButton },
  name: 'ConfirmDialog',
  setup() {
    return {
      confirmed,
      pending,
      cancel,
      confirm,
      message,
      confirmText,
      cancelText,
      confirmType,
      confirmTitle,
    };
  },
});
</script>

<style></style>
