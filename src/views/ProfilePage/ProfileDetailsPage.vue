<template>
  <div>
    <v-form v-model="valid">
      <div v-if="user.data.organisation">
        <div class="subtitle-1 mb-2">Organisation Details</div>

        <!-- Org Name -->
        <v-text-field v-model="formData.organisationName" dense outlined label="Organisation Name (required)" />

        <!-- Org Type -->
        <v-select
          v-model="formData.organisationType"
          :items="orgTypes"
          dense
          outlined
          label="Organisation Type (required)"
        />

        <!-- Org ABN -->
        <v-text-field
          v-model="formData.organisationAbn"
          dense
          outlined
          label="Organisation ABN (required)"
          type="number"
        />
      </div>

      <div>
        <div class="subtitle-1 mb-2">Contact Details</div>

        <!-- Email -->
        <v-text-field v-model="formData.email" dense outlined label="Email (required)" :rules="[rules.required]" />
      </div>

      <div>
        <div>
          <!-- First Name -->
          <v-text-field
            v-model="formData.firstName"
            dense
            outlined
            label="First Name (required)"
            :rules="[rules.required]"
          />

          <!-- Last Name -->
          <v-text-field
            v-model="formData.lastName"
            dense
            outlined
            label="Last Name (required)"
            :rules="[rules.required]"
          />

          <!-- Address -->
          <v-text-field
            v-model="formData.address"
            dense
            outlined
            label="Address (required)"
            :rules="[rules.required]"
          />

          <!-- Suburb -->
          <v-text-field v-model="formData.suburb" dense outlined label="Suburb (required)" :rules="[rules.required]" />

          <!-- State -->
          <v-text-field v-model="formData.state" dense outlined label="State (required)" :rules="[rules.required]" />

          <!-- Country -->
          <v-text-field
            v-model="formData.country"
            dense
            outlined
            label="Country (required)"
            :rules="[rules.required]"
          />

          <!-- Postcode -->
          <v-text-field
            v-model="formData.postcode"
            dense
            outlined
            label="Postcode (required)"
            :rules="[rules.required]"
          />

          <!-- Mobile -->
          <v-text-field v-model="formData.phone" dense outlined label="Mobile (required)" :rules="[rules.required]" />

          <v-radio-group
            v-model="formData.insurance"
            label="Do you have Public Liability Insurance?"
            :rules="[rules.inArray(['Yes', 'No'])]"
          >
            <v-radio value="Yes" label="Yes" />
            <v-radio value="No" label="No" />
          </v-radio-group>
        </div>
        <div>
          <div class="subtitle-1 mb-2">Artform Details</div>

          <!-- Artfrom -->
          <v-select
            v-model="formData.artform"
            :items="artforms"
            dense
            outlined
            label="Primary Artform (required)"
            :rules="[rules.required]"
          />
        </div>
        <div class="d-flex justify-center">
          <base-button black :disabled="!valid" @click="update" :loading="loading">Save</base-button>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent, onMounted, ref } from '@/plugins/composition';
import { rules } from '@/composables/useValidation/validations';
import { routeNames } from '@/router/routeNames';
import { useLoader } from '@/composables/useLoader';
import { useRegistrationData } from '@/composables/useRegistrationData';
import { useAuthStore } from '@/composables/useAuthStore';
import { BookedUser } from '@/models/booked/BookedUser';
import { useStatus } from '@/composables/useStatus';
import { useRouter } from '@/router/useRouter';

export default defineComponent({
  components: { BaseButton },
  name: 'ProfileDetailsPage',
  setup() {
    const valid = ref(false);
    const { user, refreshState } = useAuthStore();

    const formData = ref<BookedUser>({} as BookedUser);

    onMounted(async () => {
      await fetchData();
    });

    const { loading, withLoader } = useLoader();
    const { setMessage } = useStatus();
    const { router } = useRouter();

    const fetchData = async () =>
      withLoader(async () => {
        formData.value = await user.value.getBookedUser();
        if (formData.value.artform) {
          artforms.value.push(formData.value.artform);
        }
      });

    const { artforms, orgTypes } = useRegistrationData();

    const update = async () =>
      withLoader(async () => {
        const response = await user.value.updateUser(formData.value);
        await refreshState();
        if (user.value.data.member) {
          setMessage('Profile Updated. Redirecting to Dashboard...');
          setTimeout(() => {
            router.push({ name: routeNames.dashboard });
          }, 1000);
        } else {
          setMessage('Profile Updated.');
        }
      });

    return {
      rules,
      valid,
      orgTypes,
      artforms,
      loading,
      routeNames,
      formData,
      update,
      user,
    };
  },
});
</script>

<style></style>
