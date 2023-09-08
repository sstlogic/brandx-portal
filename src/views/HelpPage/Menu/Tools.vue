<template>
  <faq-question title="Tools">
    <p>Menu tools will provide you with common Booking Calendar links.</p>

    <p>
      "Book A Space" will take you to the calendars of the type of space you want to book. When you have clicked the
      type of space, you can view availability and place bookings on these calendars.
    </p>

    <p>
      "View Spaces" will take you to a list of all the studios you can book at <strong>Brand X</strong>. When you click
      on the arrow, you can view information on the location, size and equipment available in each space.
    </p>

    <p>
      "My Bookings" will list all the bookings you have made at <strong>Brand X</strong>. When you click on the arrow,
      you can request changes to these bookings if required.
    </p>

    <p>
      "My Profile " will display your personal information, such as your contact details as recorded in our system. You
      can click on the above tabs to change your credit card details (“Billing”) and create a new password (“Password”).
    </p>

    <p>
      "FAQ and Help" provides frequently asked questions and information on how to navigate the
      <strong>Brand X</strong> Booking Calendar.
    </p>

    <p>“Contact” allows you to email <strong>Brand X</strong> if you require additional information.</p>

    <p>"Log Out" will log you out of the Booking Calendar and return you to the View-Only screen.</p>

    <p>“<strong>Brand X</strong> Home” will take you to the <strong>Brand X</strong> main website.</p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'Tools',
});
</script>

<style></style>
