<template>
  <member-page title="Your Artist Pass" heading="Artist Pass Login">
    <div class="mb-4">
      <div>An Artist Pass is required to book a space with Brand X.</div>
      <div>Don't have one? <router-link :to="{ name: routeNames.auth.register }"> Subscribe here</router-link></div>
    </div>
    <div>
      <login-form />
    </div>
  </member-page>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import LoginForm from './components/LoginForm.vue';
import { routeNames } from '@/router/routeNames';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';

export default defineComponent({
  components: { LoginForm, MemberPage },
  name: 'LoginPage',
  setup() {
    return {
      routeNames,
    };
  },
});
</script>

<style></style>
