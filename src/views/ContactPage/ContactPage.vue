<template>
  <member-page title="My Bookings">
    <template #header>
      <v-tabs background-color="lightGray" color="black" fixed-tabs slider-size="4">
        <v-tab class="tab font-weight-bold text-capitalize" :to="{ name: routeNames.help }">FAQ</v-tab>
        <v-tab class="tab font-weight-bold text-capitalize" :to="{ name: routeNames.contact }">Contact</v-tab>
      </v-tabs>
    </template>

    <div>
      <v-expand-transition>
        <v-form v-model="valid" class="mt-2" v-if="!loading && !success">
          <div class="mb-4">
            Complete this form with your query and we'll get back to you within 24 hours during business hours (48 hours
            during weekends).
          </div>

          <v-text-field
            v-model="formData.name"
            label="Your Name (required)"
            outlined
            dense
            :rules="[rules.required]"
            :error-messages="errors.name"
          />
          <v-text-field
            v-model="formData.email"
            label="Email (required)"
            outlined
            dense
            :rules="[rules.required]"
            :error-messages="errors.email"
          />
          <v-textarea
            v-model="formData.message"
            label="Message (required)"
            outlined
            dense
            persistent-hint
            :rules="[rules.required]"
            :error-messages="errors.message"
          />
        </v-form>
      </v-expand-transition>
      <v-expand-transition>
        <div v-if="success" class="text-center">Your query has been submitted.</div>
      </v-expand-transition>
      <div class="d-flex">
        <v-spacer />
        <base-button :disabled="!valid" :loading="loading" @click="submit" v-if="!success">Submit</base-button>
      </div>
      <div class="text-center mt-8">For urgent matters please SMS or call 0448 507 468</div>
    </div>
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { defineComponent, onMounted, reactive, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { rules } from '@/composables/useValidation/validations';
import { useLoader } from '@/composables/useLoader';
import { useApi } from '@/composables/useApi';
import { snakeKeys } from '@/utils/case';
import { useAuthStore } from '@/composables/useAuthStore';
import { useFormValidation } from '@/composables/useValidation';

export default defineComponent({
  components: { MemberPage, BaseButton },
  name: 'ContactPage',
  setup() {
    const valid = ref(false);
    const success = ref(false);
    const { loading, withLoader } = useLoader();
    const { post } = useApi();
    const { isAuthed, user } = useAuthStore();
    const formData = reactive({
      email: '',
      name: '',
      message: '',
    });
    const { errors, mapErrors } = useFormValidation(formData);

    onMounted(() => {
      if (isAuthed.value) {
        formData.email = user.value.data.email;
        formData.name = user.value.data.firstName + ' ' + user.value.data.lastName;
      }
    });

    const submit = async () =>
      withLoader(async () => {
        await post('/contact', snakeKeys(formData))
          .catch((errors) => mapErrors(errors))
          .then(() => {
            success.value = true;
          });
      });

    return {
      routeNames,
      formData,
      valid,
      rules,
      success,
      loading,
      submit,
      errors,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab {
  font-size: 1.125rem;
}
</style>
