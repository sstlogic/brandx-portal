<template>
  <member-page heading="Artist Pass Subscription" :show-title="false">
    <div v-if="accountType">
      <div class="py-2" v-if="accountType">
        <div v-if="accountType == 'Arts_Organisation' || accountType == 'Individual'">
          <!-- <p>Once payment is complete you will be emailed your Artist Pass confirmation and receipt.</p> -->
          <p>
            Get heavily subsidised studio rates and discounted tickets to our programs for 12 months with an Artist Pass.
            Apply now as an arts organisation or professional artist (emerging or established) and activate your annual
            subscription by completing the application form and payment.
          </p>
        </div>
        <div v-else>
          <p>
            Artist Pass subscriptions are designed to support artists and arts organisations. A subscription is not
            available with this account type. Feel there has been an error?
            <!-- <a href="https://dev.brandx.org.au/contact">Contact Us</a> -->
          </p>
        </div>
      </div>
      <v-sheet max-width="45%" class="border-yellow pa-2 my-2">
        <div>
          <strong>
            {{ accountType == 'Arts_Organisation' ? 'Arts Organisations' : 'Individual' }}
          </strong>
        </div>
        <div>{{ formatPrice(price) }}</div>
        <div>Per Year, Billed Yearly</div>
      </v-sheet>

      <div>
        <p>
          <strong>Enter your card details. <br />
            Your subscription will start immediately.
          </strong>
        </p>
      </div>

      <div v-if="accountType == 'Arts_Organisation' || accountType == 'Individual'">
        <payment-input button-text="Subscribe" @success="susbcribed" />
      </div>
    </div>

    <v-dialog v-if="sub" v-model="dialog" persistent max-width="500px">
      <v-card class="width_dialog">
        <div class="d-flex mr-10 mt-3 justify-space-between pb-0 pt-5">
          <v-app-bar-title class="pa-2">
            <v-img :src="require('@/assets/brandx-black.svg')" height="100%" max-height="75px" width="260px"
              @click="goHome" contain class="cursor-pointer logo-image" />
          </v-app-bar-title>
          <router-link :to="{ name: routeNames.home }" class="tab-title close-route">X</router-link>
        </div>
        <v-card-title>
          <div class="d-flex justify-space-between">
            <img :src="require('@/assets/svg/subscription-confirm-icon.svg')" height="100%" max-height="50px"
              width="145px" />
            <div class="text-h5 text-break mt-10 pt-5 pl-5">
              Your artist pass is <br />
              confirmed
            </div>
          </div>
        </v-card-title>
        <v-card-text class="black--text">
          <div>
            Please check your email for your Artist Pass details which will enable you to login and book spaces at
            subsidised rates.<br />
            It may take a few minutes for the email to arrive.

            <!-- Please check your email for your Artist Pass receipt. Please allow a few minutes for this email to arrive.
            You can now book spaces with Brand X at subsidised rates. -->
          </div>

          <div class="my-4 pa-4 border-yellow">
            <div class="font-weight-bold">Artist Pass</div>
            <div>Subscriber Expiry: {{ formatDate(sub.memberExpiry) }}</div>
            <div>Next Billing Date: {{ formatDate(sub.memberExpiry) }}*</div>
            <div class="mt-2 font-weight-bold">Receipt #: {{ sub.reference }}</div>
          </div>
          <div>* You will be emailed 7 days prior to renewal.</div>

          <div class="mt-2">
            For any questions, contact us at
            <br />
            <a href="mailto:bookings@brandx.org.au">bookings@brandx.org.au</a>
          </div>
        </v-card-text>
        <v-card-actions class="pb-5">
          <v-spacer></v-spacer>
          <base-button @click="goToBilling">Book a Space</base-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import PaymentInput from '@/components/PaymentInput.vue';
import { useAuthStore } from '@/composables/useAuthStore';
import { SubscribedResponse } from '@/composables/useBookedResources/types';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { defineComponent, onMounted, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';
import { formatDate } from '@/utils/date';

import { formatPrice } from '@/utils/number';

export default defineComponent({
  components: { PaymentInput, MemberPage, BaseButton },
  name: 'SubscribePage',
  setup() {
    const sub = ref<SubscribedResponse | null>(null);
    const price = ref(0);
    const accountType = ref('');
    const { router } = useRouter();
    const dialog = ref(true);
    const { refreshState } = useAuthStore();
    const { user, isAuthed, isMember } = useAuthStore();

    onMounted(async () => {
      await refreshState();
      price.value = await user.value.getSubscriptionPrice();

      let userData: any | undefined = user.value.data;
      accountType.value = userData?.customAttributes?.account_type;
      
    });

    const goToBilling = async () => {
      await refreshState();
      router.push({ name: routeNames.spaces.book });
    };
    const goHome = () => {
      if (!isAuthed.value) {
        return router.push('/');
      }

      if (!isMember.value) {
        return router.push('/');
      }

      router.push({ name: routeNames.dashboard });
    };
    const susbcribed = (_sub: SubscribedResponse) => {
      sub.value = _sub;
      dialog.value = true;
    };

    return {
      goToBilling,
      susbcribed,
      accountType,
      dialog,
      formatDate,
      goHome,
      sub,
      formatPrice,
      routeNames,
      price,
      user,
    };
  },
});
</script>

<style>
.width_dialog {
  /* width: 500px; */
}</style>
