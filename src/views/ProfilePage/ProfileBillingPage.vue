<template>
  <div>
    <div class="gray-card pa-4 mb-4">
      <div v-if="user.data.customAttributes.account_type == 'General_Public'">
        <div class="font-weight-bold mb-4">General Public</div>
        <div v-if="!isMember" class="mb-4">
          Artist Pass subscriptions are designed to support artists and arts organisations. A subscription is not
          available with this account type. Feel there has been an error?
          <!-- <a href="https://dev.brandx.org.au/contact">Contact Us</a> -->
        </div>
      </div>
      <div v-if="
          user.data.customAttributes.account_type == 'Individual' ||
          user.data.customAttributes.account_type == 'Arts_Organisation'
        ">
        <div class="font-weight-bold mb-4">Artist Pass Subscription</div>
        <div v-if="!isMember" class="mb-4">
          <!-- For full access to the Brand X Booking Calendar please pay for your subscription to continue.
          <br />
          <br /> -->
          Get heavily subsidised studio rates and discounted tickets to our programs for 12 months with an Artist Pass.
          Apply now as an arts organisation or professional artist (emerging or established) and activate your annual
          subscription by completing the application form and payment.
        </div>
      </div>
      <template v-if="user.data.customAttributes.account_type == 'Individual' ||
          user.data.customAttributes.account_type == 'Arts_Organisation'">
        <div v-if="isMember" class="d-flex justify-space-between">
          <div class="d-flex justify-center flex-column">
            <div>Subscriber since: {{ formatDate(user.data.memberSince) }}</div>
            <div>Subscriber expiry: {{ formatDate(user.data.memberExpiry) }}</div>
            <div v-if="user.data.memberRenewal">Renewal date: {{ formatDate(user.data.memberRenewal) }}</div>
            <div v-if="!user.data.existingMember">Auto-renew: {{ user.data.autoRenew ? 'On' : 'Off' }}</div>
          </div>
          <div class="d-flex justify-center flex-column">
            <base-button @click="editing = true" v-show="!editing && !user.data.existingMember">Edit</base-button>
          </div>
        </div>
        <div v-else>
          <base-button :to="{ name: routeNames.profile.subscribe }">Pay Now</base-button>
        </div>
      </template>
      <template v-if="user.data.customAttributes.account_type == 'General_Public'">
        <base-button :to="{name: routeNames.contact}">Contact Us</base-button>
      </template>
      <v-expand-transition>
        <div v-show="editing && isMember" class="pt-4">
          <base-button block @click="turnOffRenew" v-if="user.data.autoRenew" :loading="loading">Turn Off Auto
            Renew</base-button>
          <base-button block @click="turnOnRenew" v-if="!user.data.autoRenew" :loading="loading">Turn On Auto
            Renew</base-button>
        </div>
      </v-expand-transition>
    </div>

    <div v-if="isMember || user.data.last4">
      <payment-methods />
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/composables/useAuthStore';
import { useConfirmation } from '@/composables/useConfirmation/useConfirmation';
import { useLoader } from '@/composables/useLoader';
import { defineComponent, onMounted, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { formatDate } from '@/utils/date';
import PaymentMethods from './components/PaymentMethods.vue';

export default defineComponent({
  components: { BaseButton, PaymentMethods },
  name: 'ProfileBillingPage',
  setup() {
    const { isMember, refreshState, user } = useAuthStore();
    const editing = ref(false);
    const { loading, withLoader } = useLoader();
    const { confirmation } = useConfirmation();
    const { $delete, post } = useApi();

    onMounted(async () => {
      await refreshState();
    });

    const turnOffRenew = async () =>
      withLoader(async () => {
        const confirmed = await confirmation(
          'Are you sure you want to turn off auto-renew? You will no longer be able to book resources after the end of your billing period.'
        );

        if (confirmed) {
          await $delete('/subscription');
          await refreshState();
          editing.value = false;
        }
      });

    const turnOnRenew = async () =>
      withLoader(async () => {
        const confirmed = await confirmation(
          'Are you sure you want to turn on auto-renew? You will be charged automatically at the end of your billing period.'
        );

        if (confirmed) {
          await post('/subscription/resume', {});
          await refreshState();
          editing.value = false;
        }
      });
    return {
      isMember,
      routeNames,
      user,
      formatDate,
      editing,
      turnOffRenew,
      turnOnRenew,
      loading,
    };
  },
});
</script>

<style scoped lang="scss">
.card-image {
  outline: 1px solid gray !important;
}
</style>
