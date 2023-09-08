<template>
  <v-dialog :value="true" persistent>
    <v-card>
      <v-card-title class="text-h5 text-break"> Request to Modify My Booking </v-card-title>
      <v-card-text class="black--text">
        <v-expand-transition group>
          <v-form v-model="valid" class="mt-2" v-if="!loading && !success">
            <div class="mb-2">
              To change or delete a booking, please message Brand X and we'll assist you within 24 hours.
            </div>

            <v-text-field
              v-model="formData.name"
              label="Your Name (required)"
              outlined
              dense
              :rules="[rules.required]"
            />
            <v-text-field v-model="formData.email" label="Email (required)" outlined dense :rules="[rules.required]" />
            <v-textarea
              v-model="formData.message"
              label="Message (required)"
              outlined
              dense
              hint="Please include date and time of booking to change"
              persistent-hint
              :rules="[rules.required]"
            />
          </v-form>
        </v-expand-transition>

        <v-expand-transition>
          <div v-if="success">
            <p>Thank you for your request.</p>

            <p>Brand X will respond within 24 hours to confirm your booking changes.</p>

            <p>
              Please note: Requests will not be updated in My Bookings until Brand X has processed them. Once confirmed
              you will receive an email notification.
            </p>
          </div>
        </v-expand-transition>
      </v-card-text>
      <v-card-actions>
        <base-button @click="cancel" v-if="!success">Cancel</base-button>
        <v-spacer></v-spacer>
        <base-button v-if="!success" black :disabled="!valid" :loading="loading" @click="submit">Submit</base-button>
        <base-button v-if="success" black @click="emit('input')">Close</base-button>
      </v-card-actions>

      <v-card-text class="mt-2">If urgent please SMS or call 0448 507 468</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/composables/useAuthStore';
import { Reservation } from '@/models/booked/Reservation';
import { defineComponent, onMounted, PropType, ref } from '@/plugins/composition';
import { rules } from '@/composables/useValidation/validations';
import { useApi } from '@/composables/useApi';
import { useLoader } from '@/composables/useLoader';

export default defineComponent({
  components: { BaseButton },
  name: 'UpdateBooking',
  props: {
    reservation: {
      type: Object as PropType<Reservation>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { user } = useAuthStore();
    const valid = ref(false);
    const success = ref(false);
    const formData = ref({
      reference: props.reservation.referenceNumber,
      name: '',
      email: '',
      message: '',
    });

    const { post } = useApi();

    const { loading, withLoader } = useLoader();

    onMounted(() => {
      formData.value.name = user.value.data.firstName + ' ' + user.value.data.lastName;
      formData.value.email = user.value.data.email;
    });

    const submit = async () =>
      withLoader(async () => {
        const response = await post('/reservations/update', formData.value);
        success.value = true;
      });

    const cancel = () => {
      emit('input');
    };

    return {
      user,
      formData,
      valid,
      cancel,
      rules,
      submit,
      loading,
      success,
      emit,
    };
  },
});
</script>

<style></style>
