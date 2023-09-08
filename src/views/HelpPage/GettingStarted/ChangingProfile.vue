<template>
  <faq-question title="Changing Profile Information or Password">
    <p>
      To change your profile information (name, address, email, etc.), first log into the calendar using your email
      address and password. Click “My Profile”, located in the menu on the top right hand side of the screen (indicated
      by three horizontal lines). This will bring you to a form with your current information already filled in. Edit
      any information you wish. Unchanged values will not be altered. Fields marked with “*” must be completed.
    </p>

    <p>
      If you wish to change your password, click the “Password” tab and enter your existing password followed by the new
      passwork you want to create. After editing your information, click "Reset" and your changes will be saved to the
      system.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'ChangingProfile',
});
</script>

<style></style>
