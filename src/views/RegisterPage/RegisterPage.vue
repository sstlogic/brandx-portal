<template>
  <member-page title="Register">
    <register-form />
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent } from '@/plugins/composition';
import RegisterText from './components/RegisterText.vue';
import RegisterForm from './components/RegisterForm.vue';
import PaymentForm from './components/PaymentForm.vue';
import { useRegistrationData } from '@/composables/useRegistrationData';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';

export default defineComponent({
  components: { RegisterText, BaseButton, RegisterForm, PaymentForm, MemberPage },
  name: 'RegisterPage',
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
