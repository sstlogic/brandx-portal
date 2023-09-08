<template>
  <member-page heading="Confirm Booking" :show-title="false">
    <div class="mb-4">
      <div class="font-weight-bold">
        {{ currentResource.name }}
      </div>
      <div v-if="!isRepeating">
        {{ formatTimeRange(calendarSelection.startSlot.startDateTime, calendarSelection.endSlot.endDateTime) }}
      </div>
      <div v-else>
        <div v-for="(date, index) in dates" :key="index">{{ formatTimeRange(date.start, date.end) }}</div>
      </div>
      <div>
        Something not right?
        <router-link :to="{ name: routeNames.bookingsCalendar, query: { id: currentSchedule.id } }"
          >Edit Booking</router-link
        >
      </div>
    </div>
    <div class="mb-4">
      To complete your booking at Brand X, tell us about your activity so we can prepare the space for your arrival.
    </div>
    <div>
      <v-form v-model="valid">
        <v-textarea
          label="Describe the Activity"
          v-model="currentBooking.description"
          outlined
          dense
          :rules="[rules.required]"
          placeholder="Describe your activity, the equipment you require and any other details we should know about."
          persistent-placeholder
        />
        <v-text-field
          label="How many people will be attending this booking?"
          v-model="currentBooking.attendees"
          outlined
          dense
          :rules="[rules.required, rules.min(0), capacityRule]"
          hint="Enter a number"
          persistent-hint
        />
        <div class="subtitle-1 mb-2">Select all that apply</div>
        <v-checkbox label="I am generating income from this activity" v-model="currentBooking.generatingIncome" dense />
        <v-checkbox label="Yes, I have received funding for this activity" v-model="currentBooking.funded" dense />
        <v-checkbox label="This booking is for an event" v-model="currentBooking.performance" dense />
      </v-form>
      <div class="mb-2">
        <v-expand-transition>
          <quote-card v-if="price" :price="price" :loading="loading" />
        </v-expand-transition>
      </div>
      <div class="mb-2">
        <v-checkbox v-model="terms" dense>
          <template #label>
            <p>
              I agree with Brand X hirers
              <a href="https://www.brandx.org.au/studio-hire-terms-and-conditions" target="_blank" @click.stop>
                terms and conditions</a
              >
            </p>
          </template>
        </v-checkbox>
      </div>
      <div class="d-flex">
        <v-spacer />
        <base-button black :disabled="!valid || loading || !price || !terms" @click="confirm"
          >Confirm Booking</base-button
        >
      </div>

      <v-dialog v-model="success" max-width="600">
        <v-card>
          <v-card-title>
            <div class="font-weight-bold text-h5 mb-2">Your Booking is Held</div>
          </v-card-title>

          <v-card-text class="d-flex align-center">
            <div class="mr-2">
              <v-icon large>mdi-clock</v-icon>
            </div>
            <div>
              Your booking has been successfully secured. You have 10 minutes to complete your payment to retain your
              booking.
            </div>
          </v-card-text>

          <v-card-actions>
            <base-button @click="goToBookings">Add A Booking</base-button>
            <v-spacer></v-spacer>
            <base-button black :to="{ name: routeNames.checkout }">Pay Now</base-button>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="error" width="500">
        <v-card>
          <v-card-title>
            <div class="font-weight-bold text-h5 mb-2">Error</div>
          </v-card-title>

          <v-card-text class="d-flex align-center">
            <div class="mr-2">
              <v-icon large color="error">mdi-alert-box</v-icon>
            </div>
            <div>
              {{ errorMessage }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <base-button :to="{ name: routeNames.bookingsCalendar, query: { id: currentSchedule.id } }">
              Edit Booking
            </base-button>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useCreatingBooking, currentBooking, calendarSelection } from '@/composables/useCreatingBooking';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { defineComponent, onMounted, onUnmounted, ref } from '@/plugins/composition';
import { formatTimeRange } from '@/utils/date';
import { routeNames } from '@/router/routeNames';
import { useApi } from '@/composables/useApi';
import { debouncedWatch } from '@vueuse/core';
import { PriceResult } from '@/composables/useBookedResources/types';
import QuoteCard from './components/QuoteCard.vue';
import { createReservation, createRepeatingReservation } from '@/composables/useBookedResources/useBookedReservations';
import { useAuthStore } from '@/composables/useAuthStore';
import { useRouter } from '@/router/useRouter';
import { formatISO } from 'date-fns';
import { rules } from '@/composables/useValidation/validations';
import { Resource } from '@/models/booked/Resource';
import { useBookedResources } from '@/composables/useBookedResources';

type DatePair = {
  start_time: string;
  end_time: string;
};

export default defineComponent({
  components: { MemberPage, BaseButton, QuoteCard },
  name: 'ConfirmBookingPage',
  setup() {
    const price = ref<PriceResult | null>(null);
    const booking = useCreatingBooking();
    const loading = ref(false);
    const valid = ref(false);
    const success = ref(false);
    const error = ref(false);
    const errorMessage = ref('');
    const dates = ref<{ start: Date; end: Date }[]>([]);
    const resource = ref<null | Resource>(null);
    const { getResource } = useBookedResources();
    const terms = ref(false);

    const { user } = useAuthStore();

    const { post } = useApi();

    const { router } = useRouter();

    const goToBookings = () => {
      router.push({ name: routeNames.spaces.book });
    };

    onMounted(async () => {
      const id = booking.currentResource.value?.id;

      if (!id) {
        return;
      }

      resource.value = await getResource(id);
    });

    const getRepeatingQuote = async () => {
      return await post<PriceResult>('/reservations/repeating/quote', {
        start_date: formatISO(booking.repeatingOptions.value.startDate),
        end_date: formatISO(booking.repeatingOptions.value.endDate),
        start_time: formatISO(booking.repeatingOptions.value.startTime),
        end_time: formatISO(booking.repeatingOptions.value.endTime),
        interval_type: booking.repeatingOptions.value.intervalType,
        interval: booking.repeatingOptions.value.interval,
        weekly_days: booking.repeatingOptions.value.days,
        generatingIncome: currentBooking.generatingIncome,
        funded: currentBooking.funded,
        performance: currentBooking.performance,
        attendees: currentBooking.attendees,
      });
    };

    const getNonRepeatingQuote = async () => {
      return await post<PriceResult>('/reservations/quote', {
        start: calendarSelection.startSlot?.startDateTime,
        end: calendarSelection.endSlot?.endDateTime,
        generatingIncome: currentBooking.generatingIncome,
        funded: currentBooking.funded,
        performance: currentBooking.performance,
        attendees: currentBooking.attendees,
      });
    };

    const getDates = async () => {
      const _dates = await post<DatePair[]>('/reservations/repeating/dates', {
        start_date: formatISO(booking.repeatingOptions.value.startDate),
        end_date: formatISO(booking.repeatingOptions.value.endDate),
        start_time: formatISO(booking.repeatingOptions.value.startTime),
        end_time: formatISO(booking.repeatingOptions.value.endTime),
        interval_type: booking.repeatingOptions.value.intervalType,
        interval: booking.repeatingOptions.value.interval,
        weekly_days: booking.repeatingOptions.value.days,
        generatingIncome: currentBooking.generatingIncome,
        funded: currentBooking.funded,
        performance: currentBooking.performance,
        attendees: currentBooking.attendees,
      });

      dates.value = _dates.map((pair: DatePair) => ({
        start: new Date(pair.start_time),
        end: new Date(pair.end_time),
      }));
    };

    onMounted(async () => {
      if (!booking.currentResource.value) {
        router.push({ name: routeNames.spaces.book });
      }
      if (booking.isRepeating.value) {
        await getDates();
      }
    });

    const calculatePrice = async () => {
      const result = booking.isRepeating.value ? await getRepeatingQuote() : await getNonRepeatingQuote();

      price.value = result;
      setTimeout(() => {
        loading.value = false;
      }, 250);
    };

    const confirm = async () => {
      if (booking.isRepeating.value) {
        return await confirmRepeatingBookings();
      } else {
        return await confirmBooking();
      }
    };

    const confirmBooking = async () => {
      const response = await createReservation(
        {
          start: calendarSelection.startSlot?.startDateTime as unknown as Date,
          end: calendarSelection.endSlot?.endDateTime as unknown as Date,
          description: currentBooking.description as string,
          attendees: currentBooking.attendees as number,
          income: currentBooking.generatingIncome,
          funding: currentBooking.funded,
          performance: currentBooking.performance,
        },
        user.value.uuid,
        booking.currentResource.value?.id as number,
        booking.currentResource.value?.name as string
      ).catch(() => {
        error.value = true;
        errorMessage.value =
          'Something went wrong when creating your booking. Some availabilities may have changed. Please edit your booking and try again.';
      });

      if (response) {
        success.value = true;
      }
    };

    const confirmRepeatingBookings = async () => {
      const response = await createRepeatingReservation(
        {
          start: booking.repeatingOptions.value.startDate,
          end: booking.repeatingOptions.value.endDate,
          description: currentBooking.description as string,
          attendees: currentBooking.attendees as number,
          income: currentBooking.generatingIncome,
          funding: currentBooking.funded,
          performance: currentBooking.performance,
          start_time: formatISO(booking.repeatingOptions.value.startTime),
          end_time: formatISO(booking.repeatingOptions.value.endTime),
          interval_type: booking.repeatingOptions.value.intervalType,
          interval: booking.repeatingOptions.value.interval,
          weekly_days: booking.repeatingOptions.value.days,
        },
        user.value.uuid,
        booking.currentResource.value?.id as number,
        booking.currentResource.value?.name as string
      ).catch(() => {
        error.value = true;
        errorMessage.value =
          'Something went wrong when creating your booking. Some availabilities may have changed. Please edit your booking and try again.';
      });

      if (response) {
        success.value = true;
      }
    };

    onUnmounted(() => {
      booking.resetCurrentBooking();
      booking.resetCalendar();
    });

    debouncedWatch(
      currentBooking,
      () => {
        if (valid.value) {
          loading.value = true;
          calculatePrice();
        }
      },
      { debounce: 500 }
    );

    const capacityRule = (v: number) => {
      const cap = resource.value?.capacity as string;
      if (!cap) {
        return true;
      }

      return v <= parseInt(cap) || 'The limit for this resource is ' + cap;
    };

    return {
      formatTimeRange,
      ...booking,
      routeNames,
      price,
      loading,
      valid,
      confirm,
      success,
      goToBookings,
      error,
      errorMessage,
      currentBooking,
      calendarSelection,
      rules,
      dates,
      terms,
      capacityRule,
    };
  },
});
</script>

<style></style>
