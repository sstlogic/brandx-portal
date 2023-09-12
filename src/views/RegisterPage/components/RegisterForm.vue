<template>
  <div class=" px-4">
    <div class="tab-title pt-4">Create a Brand X Account</div>
    <div class="sub-title-normal py-sm-4">To book a space or sign up for Artist Pass Access first make an account.</div>
    <div class="pt-3">
      <v-form v-model="valid">
        <v-expand-transition>
          <div>
            <div>
              <div class="sub-title-normal pb-2"><span class="sub-title">First name:</span> (required)</div>
              <v-text-field v-model="formData.firstName" dense class="custom-text-field" outlined label=""
                :rules="[rules.required]" />
              <div class="sub-title-normal pb-2"><span class="sub-title">Last name:</span> (required)</div>
              <v-text-field v-model="formData.lastName" dense outlined label="" class="custom-text-field"
                :rules="[rules.required]" />
              <div class="sub-title-normal pb-2"><span class="sub-title">Email:</span> (required)</div>
              <v-text-field v-model="formData.email" dense outlined class="custom-text-field"
                :error-messages="errors.email" :rules="[rules.required]" :loading="loading" />
              <div v-if="emailExists && formData.email">
                <p>
                  Your email address is already registered. To proceed with subscribing, please
                  <router-link :to="{ name: routeNames.auth.login }">login to renew.</router-link>
                </p>
              </div>
              <div class="sub-title-normal pb-2"><span class="sub-title">Password:</span> (required)</div>
              <v-text-field v-model="formData.password" dense outlined class="custom-text-field"
                :type="isPasswordVisible ? 'text' : 'password'" label=""
                :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                @click:append="isPasswordVisible = !isPasswordVisible"
                :rules="[rules.required, rules.minLength(8)]"></v-text-field>
            </div>
            <div class="d-flex">
              <v-checkbox v-model="formData.tcs" color="secondary" hide-details :rules="[rules.required]" label="">
              </v-checkbox>
              <div class="sub-title-normal ">
                I agree to Brand X
                <a href="https://www.brandx.org.au/artist-pass-terms-and-conditions" target="_blank" @click.stop>
                  terms and conditions
                </a>
                and understand that I may receive official notices from Brand X from time to time. (Required)
              </div>
            </div>
            <div class="d-flex justify-end pt-10">
              <base-button black :disabled="!valid" @click="register" :loading="loading">Sign Up</base-button>
            </div>
            <v-sheet height="30px" />
            <div class="d-flex justify-center px-20 sub-title-normal">
              Already an Artist Pass Subscriber in the past?
            </div>
            <div class="d-flex justify-center sub-title-normal">
              <router-link :to="{ name: routeNames.auth.login }"> Log in to continue </router-link>
            </div>
          </div>
        </v-expand-transition>
      </v-form>
    </div>
  </div>
</template>
<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent, ref } from '@/plugins/composition';
import RegisterText from './RegisterText.vue';
import { useFormValidation } from '@/composables/useValidation';
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
    const { artforms, accountType, formData, type, typeSelected, isForOrganisation, emailExists, next } =
      useRegistrationData();
    const { post } = useApi();
    const { router } = useRouter();
    const { errors, mapErrors } = useFormValidation(formData);
    const checkIfEmailExists = async () =>
      withLoader(async () => {
        emailExists.value = await User.existsByEmail(formData.email);
      });

    const register = async () => {
      withLoader(async () => {
        const response = await post('/users', snakeKeys(formData)).catch((errors) => mapErrors(errors));
        console.log(response, 'response');
        if (response !== undefined) {
          await login(formData.email, formData.password);
          router.push({ name: routeNames.subscriber });
        }
      });
    };

    const login = async (email: string, password: string) =>
      withLoader(async () => {
        const user = await User.login({ email, password });

        if (user) {
          const { storeLogin } = useAuthStore();

          storeLogin(user);
          // router.push({ name: routeNames.subscriber });
          // router.push({ name: routeNames.profile.billing });
        }
      });

    debouncedWatch(
      () => formData.email,
      async () => checkIfEmailExists(),
      { debounce: 500, immediate: true }
    );

    return {
      type,
      errors,
      isForOrganisation,
      typeSelected,
      formData,
      rules,
      valid,
      accountType,
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

<style>
.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

@media only screen and (min-width: 1025px) {
  /* .v-text-field {
    padding-top: -30px !important;
    margin-top: -30px !important;
  } */

  /* Your CSS styles for desktop screens go here */


  .custom-text-field .v-input__slot {
    border-radius: 0px !important;
    border: 1px solid #231F20 !important;
    /* Adjust the radius value as needed */
  }

  .custom-text-field .v-text-field__slot {
    min-height: 50px !important;
    font-family: 'Roboto-Regular' !important;
    font-size: 24px;
    font-weight: 300;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
  }

  .custom-text-field .v-text-field__slot {
    min-height: 40px !important;
    font-family: 'Roboto-Regular' !important;
    font-size: 16px;
    font-weight: 300;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
  }

  .sub-title-normal {
    font-family: 'Roboto-Regular' !important;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }

  .sub-title {
    font-family: 'Roboto-Regular' !important;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }

  .tab-title {
    font-family: 'Roboto-Regular' !important;
    font-size: 30px;
    font-weight: 900;
    line-height: 35px;
    letter-spacing: 0em;
  }
}

@media only screen and (max-width: 1024px) {

  /* Your CSS styles for all mobile devices, including tablets, go here */
  .custom-text-field .v-input__slot {
    border-radius: 0px !important;
    border: 1px solid #231F20 !important;
    /* Adjust the radius value as needed */
  }

  .custom-text-field .v-text-field__slot {
    min-height: 50px !important;
    font-family: 'Roboto-Regular' !important;
    font-size: 24px;
    font-weight: 300;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
  }

  .custom-text-field .v-input__icon {
    padding-top: 10px !important;
  }

  .sub-title-normal {
    font-family: 'Roboto-Regular' !important;
    font-size: 24px;
    font-weight: 300;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
  }

  .sub-title {
    font-family: 'Roboto-Regular' !important;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
  }

  .tab-title {
    font-family: 'Roboto-Regular' !important;
    font-size: 36px;
    font-weight: 900;
    line-height: 42px;
    letter-spacing: 0em;
  }
}
</style>
