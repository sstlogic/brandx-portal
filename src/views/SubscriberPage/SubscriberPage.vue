<template>
  <member-page title="Subscriber">
    <subscriber-form />
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent } from '@/plugins/composition';
// import SubscriberText from './components/SubscriberText.vue';
import SubscriberForm from './components/SubscriberForm.vue';
import { useRegistrationData } from '@/composables/useRegistrationData';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';

export default defineComponent({
  components: {  BaseButton, SubscriberForm, MemberPage },
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
