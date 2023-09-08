<template>
  <div>
    <v-form v-model="valid">
      <!-- TODO Validation -->
      <v-text-field
        v-model="formData.currentPassword"
        dense
        outlined
        :type="isCurrentPasswordVisible ? 'text' : 'password'"
        label="Current Password"
        :append-icon="isCurrentPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
        @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
        :rules="[rules.required]"
        :error-messages="errors.currentPassword"
      />
      <v-text-field
        v-model="formData.Password"
        dense
        outlined
        :type="isPasswordVisible ? 'text' : 'password'"
        label="New Password"
        :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
        @click:append="isPasswordVisible = !isPasswordVisible"
        :rules="[rules.required, rules.minLength(8)]"
        :error-messages="errors.password"
      />
    </v-form>
    <div class="d-flex">
      <v-spacer />
      <base-button black :disabled="!valid" @click="reset" :loading="loading">Reset</base-button>
    </div>

    <div class="mt-2" v-if="success">Your password has been reset.</div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent, reactive, ref } from '@/plugins/composition';
import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
import { useFormValidation, rules } from '@/composables/useValidation';
import { useLoader } from '@/composables/useLoader';
import { useApi } from '@/composables/useApi';
import { snakeKeys } from '@/utils/case';
import { useStatus } from '@/composables/useStatus';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';

export default defineComponent({
  components: { BaseButton },
  name: 'ProfilePasswordPage',
  setup() {
    const valid = ref(false);
    const isCurrentPasswordVisible = ref(false);
    const isPasswordVisible = ref(false);
    const success = ref(false);
    const { post } = useApi();
    const { router } = useRouter();
    const { setMessage } = useStatus();

    const formData = reactive({
      currentPassword: '',
      Password: '',
    });

    const { loading, withLoader } = useLoader();

    const { errors, mapErrors } = useFormValidation(formData);

    const reset = async () =>
      withLoader(async () => {
        await post('/update-password', snakeKeys(formData))
          .catch((error) => mapErrors(error))
          .then((response) => {
            if (response) {
              formData.currentPassword = '';
              formData.Password = '';
              success.value = true;
              setMessage('Password Updated. Redirecting to Dashboard...');
              setTimeout(() => {
                router.push({ name: routeNames.dashboard });
              }, 1000);
            }
          });
      });

    return {
      valid,
      formData,
      isCurrentPasswordVisible,
      isPasswordVisible,
      icons: {
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
      errors,
      rules,
      loading,
      reset,
      success,
    };
  },
});
</script>

<style></style>
