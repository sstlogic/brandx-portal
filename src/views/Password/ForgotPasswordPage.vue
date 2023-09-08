<template>
  <member-page title="Forgot Password">
    <p class="mb-2" v-if="!success">Enter your email below and you will be sent a link to reset your password.</p>

    <p v-else>
      If an account exists with this email address, a password reset link has been sent. If you do not receive an email
      within 5 minutes, your email address is not recognised and you'll need to
      <router-link :to="{ name: routeNames.auth.register }">make a new subscription</router-link>.
    </p>

    <v-form v-model="valid" v-if="!success">
      <v-text-field label="Email" outlined dense :rules="[rules.required, rules.email]" v-model="formData.email" />
    </v-form>

    <div class="d-flex">
      <v-spacer />
      <base-button v-if="!success" :disabled="!valid" black :loading="loading" @click="submit">Submit</base-button>
      <base-button v-else black :to="{ name: routeNames.auth.login }">Back to Login</base-button>
    </div>
  </member-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@/plugins/composition';
import { rules } from '@/composables/useValidation/validations';
import { useLoader } from '@/composables/useLoader';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useApi } from '@/composables/useApi';
import { routeNames } from '@/router/routeNames';

export default defineComponent({
  components: { MemberPage, BaseButton },
  name: 'ForgotPasswordPage',
  setup() {
    const { loading, withLoader } = useLoader();
    const valid = ref(false);
    const success = ref(false);
    const { post } = useApi();

    const formData = reactive({
      email: '',
    });

    const submit = async () =>
      withLoader(async () => {
        const response = await post('/forgot-password', formData).finally(() => {
          success.value = true;
        });
      });

    return {
      rules,
      formData,
      valid,
      success,
      submit,
      loading,
      routeNames,
    };
  },
});
</script>

<style></style>
