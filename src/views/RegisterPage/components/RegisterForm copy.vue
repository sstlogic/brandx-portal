<template>
  <div class="w-full px-4">
    <div class="font-weight-bold text-h5 py-4">Artist Pass</div>
    <register-text />

    <v-form v-model="valid">
      <div class="text-h6 mt-4">New Registration</div>
      <v-radio-group v-model="type">
        <v-radio :key="1" value="individual" label="Individual ($20 per year)" />
        <v-radio :key="2" value="organisation" label="Organisation ($100 per year)" />
      </v-radio-group>
      <v-expand-transition>
        <div v-if="typeSelected">
          <v-expand-transition>
            <div v-if="isForOrganisation">
              <div class="subtitle-1 mb-2">Organisation Details</div>

              <!-- Org Name -->
              <v-text-field v-model="formData.organisationName" dense outlined label="Organisation Name (required)"
                :rules="[rules.required]" />

              <!-- Org Type -->
              <v-select v-model="formData.organisationType" :items="orgTypes" dense outlined
                label="Organisation Type (required)" :rules="[rules.required]" />

              <!-- Org ABN -->
              <v-text-field v-model="formData.organisationAbn" dense outlined label="Organisation ABN (required)"
                :rules="[rules.required]" type="number" />
            </div>
          </v-expand-transition>
          <div>
            <div class="subtitle-1 mb-2">Contact Details</div>

            <!-- Email -->
            <v-text-field v-model="formData.email" dense outlined label="Email (required)" :rules="[rules.required]"
              :loading="loading" />
          </div>

          <div v-if="emailExists && formData.email">
            <p>
              Your email address is already registered. To proceed with subscribing, please
              <router-link :to="{ name: routeNames.auth.login }">login to renew.</router-link>
            </p>
          </div>

          <div v-if="!emailExists && formData.email">
            <div>
              <!-- First Name -->
              <v-text-field v-model="formData.firstName" dense outlined label="First Name (required)"
                :rules="[rules.required]" />

              <!-- Last Name -->
              <v-text-field v-model="formData.lastName" dense outlined label="Last Name (required)"
                :rules="[rules.required]" />

              <!-- Address -->
              <v-text-field v-model="formData.address" dense outlined label="Address (required)"
                :rules="[rules.required]" />

              <!-- Suburb -->
              <v-text-field v-model="formData.suburb" dense outlined label="Suburb (required)"
                :rules="[rules.required]" />

              <!-- State -->
              <v-text-field v-model="formData.state" dense outlined label="State (required)" :rules="[rules.required]" />

              <!-- Country -->
              <v-text-field v-model="formData.country" dense outlined label="Country (required)"
                :rules="[rules.required]" />

              <!-- Postcode -->
              <v-text-field v-model="formData.postcode" dense outlined label="Postcode (required)"
                :rules="[rules.required]" />

              <!-- Mobile -->
              <v-text-field v-model="formData.phone" dense outlined label="Mobile (required)" :rules="[rules.required]" />

              <v-radio-group v-model="formData.insurance" label="Do you have Public Liability Insurance?"
                :rules="[rules.inArray(['Yes', 'No'])]">
                <v-radio value="Yes" label="Yes" />
                <v-radio value="No" label="No" />
              </v-radio-group>
            </div>
            <div>
              <div class="subtitle-1 mb-2">Artform Details</div>

              <!-- Artfrom -->
              <v-select v-model="formData.artform" :items="artforms" dense outlined label="Primary Artform (required)"
                :rules="[rules.required]" />
            </div>
            <div>
              <div class="subtitle-1 mb-2">Password</div>
              <v-text-field v-model="formData.password" dense outlined :type="isPasswordVisible ? 'text' : 'password'"
                label="Password" :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                @click:append="isPasswordVisible = !isPasswordVisible"
                :rules="[rules.required, rules.minLength(8)]"></v-text-field>
            </div>
            <div>
              <v-checkbox v-model="formData.tcs" :rules="[rules.required]" label="">
                <template #label>
                  <p>
                    I agree to Brand X
                    <a href="https://www.brandx.org.au/artist-pass-terms-and-conditions" target="_blank" @click.stop>
                      terms and conditions and understand
                    </a>
                    that I may receive official notices from Brand X from time to time.
                  </p>
                </template>
              </v-checkbox>
              <v-checkbox v-model="formData.updates"
                label="Yes, keep me up to date with Brand X news, events and promotions." />
            </div>
            <div class="d-flex justify-center">
              <base-button black :disabled="!valid" @click="register" :loading="loading">Register</base-button>
            </div>
          </div>
          <v-sheet height="100px" />
        </div>
      </v-expand-transition>
    </v-form>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent, ref } from '@/plugins/composition';
import RegisterText from './RegisterText.vue';
import { rules } from '@/composables/useValidation/validations';
import { debouncedWatch } from '@vueuse/core';
import { User } from '@/models';
import { routeNames } from '@/router/routeNames';
import { useLoader } from '@/composables/useLoader';
import { useRegistrationData } from '@/composables/useRegistrationData';
import { mdiEyeOutline } from '@mdi/js';
import { useApi } from '@/composables/useApi';
import { snakeKeys } from '@/utils/case';
import { useAuthStore } from '@/composables/useAuthStore';
import { useRouter } from '@/router/useRouter';

export default defineComponent({
  components: { RegisterText, BaseButton },
  name: 'RegisterForm',
  setup() {
    const valid = ref(false);
    const isPasswordVisible = ref(false);
    const { loading, withLoader } = useLoader();
    const { artforms, orgTypes, formData, type, typeSelected, isForOrganisation, emailExists, next } =
      useRegistrationData();
    const { post } = useApi();
    const { router } = useRouter();

    const checkIfEmailExists = async () =>
      withLoader(async () => {
        emailExists.value = await User.existsByEmail(formData.email);
      });

    const register = async () => {
      withLoader(async () => {
        await post('/users', snakeKeys(formData));

        await login(formData.email, formData.password);
      });
    };

    const login = async (email: string, password: string) =>
      withLoader(async () => {
        const user = await User.login({ email, password });

        if (user) {
          const { storeLogin } = useAuthStore();

          await storeLogin(user);

          router.push({ name: routeNames.profile.billing });
        }
      });

    debouncedWatch(
      () => formData.email,
      async () => checkIfEmailExists(),
      { debounce: 500, immediate: true }
    );

    return {
      type,
      isForOrganisation,
      typeSelected,
      formData,
      rules,
      valid,
      orgTypes,
      artforms,
      loading,
      emailExists,
      register,

      routeNames,
      isPasswordVisible,
      icons: {
        mdiEyeOutline,
      },
    };
  },
});
</script>

<style></style>
