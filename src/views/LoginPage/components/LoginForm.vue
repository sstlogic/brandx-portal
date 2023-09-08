<template>
  <v-form v-model="valid">
    <v-text-field outlined dense label="Email Address" v-model="formData.email" :error-messages="errors.email" />
    <v-text-field
      v-model="formData.password"
      dense
      outlined
      :type="isPasswordVisible ? 'text' : 'password'"
      label="Password"
      :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
      :error-messages="errors.password"
      @click:append="isPasswordVisible = !isPasswordVisible"
      hide-details="auto"
    ></v-text-field>
    <div class="text-right">
      <router-link :to="{ name: routeNames.auth.forgot }">Forgot Password</router-link>
    </div>
    <div class="d-flex justify-center">
      <base-button black class="my-4" @click="login" :loading="loading">Login</base-button>
    </div>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@/plugins/composition';
import { useFormValidation } from '@/composables/useValidation';
import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
import BaseButton from '@/components/base/BaseButton.vue';
import { useLoader } from '@/composables/useLoader';
import { User } from '@/models';
import { useAuthStore } from '@/composables/useAuthStore';
import { useRouter } from '@/router/useRouter';
import { routeNames } from '@/router/routeNames';

export default defineComponent({
  name: 'LoginForm',
  components: {
    BaseButton,
  },
  setup() {
    const valid = ref(false);
    const isPasswordVisible = ref(false);
    const formData = reactive({
      email: '',
      password: '',
    });

    const { errors, mapErrors } = useFormValidation(formData); // TODO - validation errors
    const { loading, withLoader } = useLoader();
    const { router } = useRouter();

    const login = async () =>
      withLoader(async () => {
        const user = await User.login({ email: formData.email, password: formData.password }).catch((errors) =>
          mapErrors(errors)
        );

        if (user) {
          const { storeLogin } = useAuthStore();

          storeLogin(user);

          if (user.data.member) {
            router.push({ name: routeNames.dashboard });
          } else {
            router.push({ name: routeNames.profile.billing });
          }
        }
      });

    return {
      valid,
      formData,
      errors,
      login,
      icons: {
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
      isPasswordVisible,
      routeNames,
      loading,
    };
  },
});
</script>

<style></style>
