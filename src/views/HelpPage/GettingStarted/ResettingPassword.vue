<template>
  <faq-question title="Resetting Your Fogotten Password">
    <p>
      If you have forgotten your password, you can reset it and have a new one emailed to you. To do this, navigate to
      the login page and click the "Forgot Password" link. You will be taken to a new page and asked to enter your email
      address. After clicking "Submit", a new, randomly generated password will be created.
    </p>

    <p>
      This new password will be set in the system and emailed to you. After receiving this email, simply copy and paste
      your new password, log in with it, and promptly change your password by following the instructions.
    </p>

    <p>
      If an error message is returned, then the system does not recognize your email address; which could mean that you
      are not an Artist Pass subscriber of <strong>Brand X</strong>, that your subscription has expired or that the
      system has a different email address on file. In which case, contact <strong>Brand X</strong> for assistance.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'ResettingPassword',
});
</script>

<style></style>
