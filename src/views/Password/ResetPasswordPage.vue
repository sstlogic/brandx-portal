<template>
  <member-page title="Reset Password">
    <p class="mb-2" v-if="!success">Reset your password below.</p>
    <div v-else>
      <p>Your password has been reset.</p>
      <base-button :to="{ name: routeNames.auth.login }" black class="mt-2" block>Login</base-button>
    </div>

    <div>
      <v-form v-model="valid" v-if="!success">
        <v-text-field
          v-model="formData.email"
          outlined
          label="Email"
          :rules="[rules.required]"
          disabled
          :error-messages="errors.email"
          dense
        ></v-text-field>
        <v-text-field
          v-model="formData.password"
          outlined
          :type="isPasswordVisible ? 'text' : 'password'"
          label="Password"
          :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
          :error-messages="errors.password"
          :rules="[rules.required, rules.minLength(8)]"
          @click:append="isPasswordVisible = !isPasswordVisible"
          dense
        ></v-text-field>
        <div class="d-flex align-center justify-space-between flex-wrap">
          <!-- <v-checkbox label="Remember Me" hide-details class="me-3 mt-1"> </v-checkbox> -->
          <!-- forgot link -->
          <v-spacer />
        </div>

        <base-button black block @click="login" :loading="loading" :disabled="!valid">Reset Password</base-button>
      </v-form>
    </div>
  </member-page>
</template>

<script lang="ts">
import { useApi } from '@/composables/useApi';
import { useLoader } from '@/composables/useLoader';
import { useFormValidation } from '@/composables/useValidation';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { defineComponent, reactive, ref } from '@/plugins/composition';
import { useRouter } from '@/router/useRouter';
import { rules } from '@/composables/useValidation/validations';
import { mdiEyeOutline } from '@mdi/js';
import BaseButton from '@/components/base/BaseButton.vue';
import { routeNames } from '@/router/routeNames';
import { useStatus } from '@/composables/useStatus';

export default defineComponent({
  components: { MemberPage, BaseButton },
  name: 'ResetPasswordPage',
  props: {
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const success = ref(false);
    const valid = ref(false);
    const isPasswordVisible = ref(false);
    const { loading, withLoader } = useLoader();
    const { post } = useApi();
    const { router } = useRouter();
    const { setMessage } = useStatus();

    const formData = reactive({
      password: '',
      email: props.email,
    });

    const { errors, mapErrors } = useFormValidation(formData);

    const login = async () =>
      withLoader(async () => {
        loading.value = true;
        const reset = await post('/reset-password', {
          email: formData.email,
          password: formData.password,
          token: props.token,
        }).catch((error) => {
          mapErrors(error);
        });

        if (reset) {
          success.value = true;
        }
      });

    return {
      success,
      valid,
      isPasswordVisible,
      login,
      loading,
      formData,
      errors,
      rules,
      icons: {
        mdiEyeOutline,
      },
      routeNames,
    };
  },
});
</script>

<style></style>
