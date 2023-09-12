<template>
  <subscription-page title="Your Artist Pass" heading="Artist Pass Login">
    <div class="mt-5 mb-5 px-5 row">
      <div class="col-md-12 col-sm-12 sub-title-normal">
        <div class="tab-title pb-1">Artist Pass Login</div>
        An Artist Pass is required to book a space with Brand X.<br />
        <div class="pt-1">
          Don't have one? <router-link :to="{ name: routeNames.auth.register }"> Subscribe here </router-link>
        </div>
      </div>
    </div>
    <div class="px-5">
      <login-form />
    </div>
  </subscription-page>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import LoginForm from './components/LoginForm.vue';
import { routeNames } from '@/router/routeNames';
import SubscriptionPage from '@/layouts/SubscriptionLayout/SubscriptionPage.vue';

export default defineComponent({
  components: { LoginForm, SubscriptionPage },
  name: 'LoginPage',
  setup() {
    return {
      routeNames,
    };
  },
});
</script>

<style>
@media only screen and (min-width: 1025px) {

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
    font-weight: 300;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
  }

  .sub-title {
    font-family: 'Roboto-Regular' !important;
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
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
}
</style>
