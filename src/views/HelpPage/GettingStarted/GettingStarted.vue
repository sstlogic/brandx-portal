<template>
  <faq-topic title="Getting Started">
    <p>
      <strong><strong>Brand X</strong></strong> offers this Booking Calendar exclusively to Artist Pass subscribers to
      book studios, view current and previous bookings as well as keep your account information up to date.
    </p>

    <p>
      An Artist Pass is only available to individuals and groups who identify as “emerging or established professional
      artists”. An Artist Pass subscription is valid for 12-months.
    </p>

    <template #questions>
      <registering />
      <logging-in />
      <resetting-password />
      <changing-profile />
      <my-profile />
      <getting-help />
    </template>
  </faq-topic>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqTopic from '../components/FaqTopic.vue';
import ChangingProfile from './ChangingProfile.vue';
import GettingHelp from './GettingHelp.vue';
import LoggingIn from './LoggingIn.vue';
import MyProfile from './MyProfile.vue';
import Registering from './Registering.vue';
import ResettingPassword from './ResettingPassword.vue';

export default defineComponent({
  components: { FaqTopic, Registering, LoggingIn, ResettingPassword, ChangingProfile, MyProfile, GettingHelp },
  name: 'GettingStarted',
});
</script>

<style></style>
