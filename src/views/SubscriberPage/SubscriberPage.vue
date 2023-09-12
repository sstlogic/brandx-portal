<template>
  <subscription-page title="Subscriber">
    <subscriber-form />
  </subscription-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent } from '@/plugins/composition';
// import SubscriberText from './components/SubscriberText.vue';
import SubscriberForm from './components/SubscriberForm.vue';
import { useRegistrationData } from '@/composables/useRegistrationData';
import SubscriptionPage from '@/layouts/SubscriptionLayout/SubscriptionPage.vue';

export default defineComponent({
  components: { BaseButton, SubscriberForm, SubscriptionPage },
  name: 'SubscriberPage',
  setup() {
    const { step } = useRegistrationData();
    return {
      step,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep .step-header {
  box-shadow: none !important;
}
</style>
