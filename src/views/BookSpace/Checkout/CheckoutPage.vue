<template>
  <member-page heading="Secure Payment" :show-title="false">
    <div class="mb-4" v-if="total > 0">
      Once payment is complete you will receive a booking confirmation and receipt via email.
    </div>
    <div class="yellow-border pa-2" v-if="total > 0">
      <div class="font-weight-bold mb-2">Payment Summary</div>
      <div v-for="(reservation, index) in reservations" :key="reservation.uuid">
        <div>Booking {{ index + 1 }}</div>
        <pending-reservation-list-item :reservation="reservation" @deleted="refresh" />

        <v-divider class="my-4" />
      </div>

      <div>
        <strong>Total:{{ formatPrice(total) }}</strong>
      </div>
    </div>

    <div v-if="total === 0 && !loading" class="mt-4">
      <div class="text-center">You have no pending reservations.</div>
      <base-button :to="{ name: routeNames.spaces.book }" black block class="mt-2">Create a Booking</base-button>
    </div>

    <div class="mt-4" v-if="total > 0">
      <div class="font-weight-bold" v-if="defaultPaymentMethod">
        Your default payment method ending in {{ defaultPaymentMethod.card.last4 }} will be charged immediately.
      </div>
      <div v-else class="font-weight-bold">You must add a payment method to finalise your bookings.</div>
      <div v-if="paymentError" class="error--text">
        {{ paymentError }}. Please update your details and try again. If the problem persists, please
        <router-link :to="{ name: routeNames.contact }">contact us</router-link>.
      </div>
      <div class="d-md-flex my-4" :class="defaultPaymentMethod ? 'flex-md-row-reverse' : 'd-flex'">
        <div class="d-flex justify-space-between mb-4">
          <base-button class="mr-2" @click="payByInvoice" :loading="loading">Pay By Invoice</base-button>
          <base-button black @click="pay" :loading="loading" v-if="defaultPaymentMethod">Pay Now</base-button>
        </div>
        <v-spacer />
        <div>
          <base-button @click="addPaymentMethod" :disabled="loading">Add Payment Method</base-button>
        </div>
      </div>
      <v-expand-transition>
        <payment-methods
          v-if="addingPaymentMethod"
          show-adding
          @cancel="addingPaymentMethod = false"
          @input="methodAdded"
        />
      </v-expand-transition>
    </div>

    <v-dialog v-if="payment" v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5 text-break"> Your booking is secured </v-card-title>
        <v-card-text class="black--text">
          <div>
            Please check your email for confirmation records and your receipt.
            <br /><br />
            If anything changes and you need to edit your booking, please log back in to your account.
          </div>

          <div class="my-4 pa-4 border-yellow">
            <div>Total Paid: {{ formatPrice(payment.total) }}</div>
            <div class="mt-2 font-weight-bold">Receipt #: {{ payment.reference }}</div>
          </div>

          <div class="mt-2">For any questions, contact us at bookings@brandx.org.au</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <base-button @click="goToBookings" black>Go To Dashboard</base-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </member-page>
</template>

<script lang="ts">
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/composables/useAuthStore';
import { PendingReservation } from '@/composables/useBookedResources/types';
import { getPendingReservations } from '@/composables/useBookedResources/useBookedReservations';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { defineComponent, onMounted, ref } from '@/plugins/composition';
import PendingReservationListItem from './components/PendingReservationListItem.vue';
import { formatPrice } from '@/utils/number';
import { routeNames } from '@/router/routeNames';
import BaseButton from '@/components/base/BaseButton.vue';
import { useLoader } from '@/composables/useLoader';
import { usePayments } from '@/composables/usePayments';
import { PaymentMethod } from '@stripe/stripe-js';
import { useRouter } from '@/router/useRouter';
import { useConfirmation } from '@/composables/useConfirmation';
import PaymentMethods from '@/views/ProfilePage/components/PaymentMethods.vue';

type Payment = {
  reference: string;
  total: number;
};

export default defineComponent({
  components: { MemberPage, PendingReservationListItem, BaseButton, PaymentMethods },
  name: 'CheckoutPage',
  setup() {
    const reservations = ref<PendingReservation[]>([]);
    const total = ref(0);
    const defaultPaymentMethod = ref<PaymentMethod | null>(null);
    const payment = ref<Payment | null>(null);
    const dialog = ref(false);
    const paymentError = ref<string | null>(null);
    const addingPaymentMethod = ref(false);

    const { get, post } = useApi();
    const { user } = useAuthStore();
    const { loading, withLoader } = useLoader({ initial: true });

    const { getDefaultPaymentMethod } = usePayments();
    const { router } = useRouter();
    const { confirmation } = useConfirmation();
    const fetchTotal = async () =>
      withLoader(async () => {
        const response = await get<{ total: number }>(`/users/${user.value.uuid}/checkout/details`);
        defaultPaymentMethod.value = await getDefaultPaymentMethod();

        total.value = response.total;
      });

    const fetchReservations = async () =>
      withLoader(async () => {
        reservations.value = await getPendingReservations();
      });

    const pay = async () =>
      withLoader(async () => {
        await user.value
          .makePayment()
          .catch((error) => {
            if (error.response.data.redirect) {
              window.location.href = error.response.data.redirect;
            } else {
              paymentError.value = error.response.data.message;
            }
          })
          .then((res) => {
            if (res.total) {
              dialog.value = true;
              payment.value = res;
            }
          });
      });

    const goToBookings = () => {
      router.push({ name: routeNames.my.bookings });
    };

    const refresh = async () => {
      await fetchReservations();
      await fetchTotal();
    };

    onMounted(async () => {
      await fetchReservations();
      await fetchTotal();
    });

    const payByInvoice = async () => {
      const text =
        'To request a booking and to pay by invoice, you will need to delete the booking you have just made and contact <a href="mailto:bookings@brandx.org.au">bookings@brandx.org.au</a> with your booking request (including location, date, time, billing name and address). <br><br> Please allow 48 hours for Brand X to confirm your request, which will be subject to availability at the time we answer your email.';
      const confirm = await confirmation(text, { confirmTitle: 'Are you sure?', confirmText: 'Delete Bookings' });

      if (confirm) {
        withLoader(async () => {
          const response = await post('empty-cart', {});
          if (response) {
            router.push({ name: routeNames.my.bookings });
          }
        });
      }
    };

    const methodAdded = async () => {
      await fetchTotal();
      addingPaymentMethod.value = false;
    };

    const addPaymentMethod = () => {
      addingPaymentMethod.value = true;
    };

    return {
      reservations,
      total,
      routeNames,
      formatPrice,
      loading,
      pay,
      defaultPaymentMethod,
      payment,
      dialog,
      goToBookings,
      refresh,
      paymentError,
      payByInvoice,
      user,
      addingPaymentMethod,
      addPaymentMethod,
      methodAdded,
    };
  },
});
</script>

<style></style>
