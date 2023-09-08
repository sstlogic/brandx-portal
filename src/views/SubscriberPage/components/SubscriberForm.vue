<template>
  <div>
    <!-- 1.002 Subscriber Type -->
    <div class="w-full px-4" v-if="step == 1">
      <div class="tab-title py-4">
        Hi Sam! 👋
        <div class="pt-5">Which of these options best describes you?</div>
      </div>
      <v-form v-model="valid">
        <div>
          <div>
            <v-radio-group v-model="formData.organisationType" column :rules="[rules.required]">
              <div class="" v-for="(orgType, index) in orgTypes" :key="index">
                <div :class="{
                      'rounded-label': true,
                      'rounded-label-active': formData.organisationType === orgType.key,
                    }" class="rounded-label d-flex my-2 pt-4 pb-2">
                  <v-radio large :value="orgType.key" :ripple="false" color="black">
                  </v-radio>
                  <label class="sub-title pt-2" @click="checkRadio(orgType.key)">
                    {{ orgType.label }}
                  </label>
                </div>
              </div>
            </v-radio-group>
          </div>

          <v-sheet height="100px" />
          <div class="sub-title-normal">
            <span class="sub-title">None of the above?</span> Get in touch
          </div>
          <v-sheet height="200px" />
          <div class="d-flex justify-end pt-2">
            <base-button black :disabled="!valid" @click="checkTypeOfOrganization"
              :loading="loading">Continue</base-button>
          </div>
        </div>
      </v-form>
    </div>
    <!-- 1.003 Art Practice -->
    <div class="w-full px-4" v-if="step == 2">
      <div class="tab-title pt-4">
        {{ 'We love &lt;usertype&gt;! 💛' }}
      </div>
      <div class="pt-4 sub-title-normal">Help us get to know you and please answer the following questions.. </div>
      <div class="pt-3 sub-title-normal">What is your primary arts practice?
      </div>
      <div class="sub-title-normal pt-2">Select one.</div>
      <v-form v-model="valid">
        <div>
          <v-radio-group v-model="formData.artform" row :rules="[rules.required]">
            <div class="d-flex px-2" v-for="(item, index) in artforms" :key="index">
              <div class="art-radio my-2 py-4 px-4 sub-title" :class="{
                      'art-radio': true,
                      'art-radio-active': formData.artform === item,
                    }">
                <v-radio :value="item" :ripple="false" color="black" class="hidden-radio">
                </v-radio>
                <label class="font-weight-bold" @click="checkRadioArtType(item)">
                  {{ item }}
                </label>
              </div>
            </div>
          </v-radio-group>
        </div>
        <div class="d-flex justify-end pt-2">
          <base-button black :disabled="!valid" @click="updateArtistFlow(5)" :loading="loading">Continue</base-button>
        </div>
        <v-sheet height="30px" />
      </v-form>
    </div>
    <!-- 1.005 Contact Info -->
    <div class="w-full px-4" v-if="step == 5">
      <div class="tab-title pt-4">Where can we contact you?</div>
      <div class="sub-title-normal py-5">For billing and under the rare occasion that we may need to contact you.</div>
      <v-form v-model="valid" class="pt-4">
        <div>
          <div class="sub-title-normal pb-2"><span class="sub-title">Mobile phone number</span> (required)</div>
          <v-text-field v-model="formData.phone" dense class="custom-text-field" outlined label=""
            :rules="[rules.required]" />
          <div class="sub-title-normal pb-2"><span class="sub-title">Street Address</span> (required)</div>
          <v-text-field v-model="formData.address" dense outlined label="" class="custom-text-field"
            :rules="[rules.required]" />
          <div class="sub-title-normal pb-2"><span class="sub-title">Suburb</span> (required)</div>
          <v-text-field v-model="formData.suburb" dense class="custom-text-field" outlined label=""
            :rules="[rules.required]" />
          <div class="sub-title-normal pb-2"><span class="sub-title">Country</span> (required)</div>
          <v-text-field v-model="formData.country" dense outlined label="" class="custom-text-field"
            :rules="[rules.required]" />
          <div class="d-flex">
            <div class="mr-4 w-full">
              <div class="sub-title-normal pb-2"><span class="sub-title">State</span> (required)</div>
              <v-text-field v-model="formData.state" dense outlined label="" class="custom-text-field"
                :rules="[rules.required]" />
            </div>
            <div class="ml-4 w-full">
              <div class="sub-title-normal pb-2"><span class="sub-title">Postcode</span> (required)</div>
              <v-text-field v-model="formData.postcode" dense outlined label="" class="custom-text-field"
                :rules="[rules.required]" />
            </div>
          </div>
          <div class="row">
            <div class="col sub-title-normal">Do you attest that the information you have provided today is accurate?
            </div>
            <div class="col-auto insurance-radio ">
              <v-radio-group row v-model="formData.insurance" :rules="[rules.inArray(['Yes', 'No'])]">
                <v-radio value="Yes" color="black" :ripple="false" />
                <label class="mr-3 text sub-title-normal">Yes</label>
                <v-radio value="No" color="black" :ripple="false" />
                <label class="sub-title-normal">No</label>
              </v-radio-group>
            </div>
          </div>
        </div>
        <div class="d-flex justify-end pt-5">
          <base-button black :disabled="!valid" @click="updateArtistFlow(6)" :loading="loading">Continue</base-button>
        </div>
        <v-sheet height="30px" />
      </v-form>
    </div>
    <!-- 1.006 Online Info -->
    <div class="w-full px-4" v-if="step == 6">
      <div class="tab-title py-4 mt-10">Where can we find you online?</div>
      <div class="pt-2 sub-title-normal">
        Getting to know our community helps us to connect artists and opportunities. If you are comfortable please share
        your online details.
      </div>
      <v-form v-model="valid" class="pt-7">
        <div>
          <div class="sub-title-normal pb-2"><span class="sub-title">Website URL</span> (optional)</div>
          <v-text-field v-model="formData.website" dense class="custom-text-field" outlined />
          <div class="tab-title py-7 mt-10">Would you like to hear from us from time to time?</div>
          <div class="pt-3 sub-title-normal">
            By subscribing to the Brand X newsletter you’ll stay up to date with the latest programs,
            shows and residency information that we have to offer.
          </div>
          <div class="pt-4 sub-title-normal"> Be the first to know and subscribe to our newsletter.
          </div>
          <div class="w-full pt-3">
            <v-radio-group row v-model="formData.hear_from_us" :rules="[rules.inArray(['Yes', 'No'])]">
              <v-radio value="Yes" color="black" :ripple="false" />
              <label class="mr-3 sub-title-normal">Yaaaas please!</label>
              <v-radio value="No" color="black" :ripple="false" />
              <label class="sub-title-normal">Not now thanks.</label>
            </v-radio-group>
          </div>
        </div>
        <div class="d-flex justify-end pt-5 mt-10">
          <div class="pr-4 pt-3 text-decoration-underline sub-title-normal">skip this question</div>
          <base-button black :disabled="!valid" @click="updateArtistFlow(7)" :loading="loading">Continue</base-button>
        </div>
        <v-sheet height="30px" />
      </v-form>
    </div>
    <!-- 1.007 Artist Pass Subscription -->
    <div class="w-full px-4" v-if="step == 7">
      <div class="tab-title pt-4 mt-10">Amazing! You are registered.</div>
      <div class="tab-title pt-6">
        Based on the information provided, you qualify for an &lt;type&gt; Artist Pass.
      </div>
      <div class="text-h5 text-center subsidised-space-section px-5 py-10 mt-7">
        <div class="subsidise-title">Subsidised space hire</div>
        <div class="subsidise-description pt-2">
          A subscription costs $20.00 and provides you with great benefits for the next 12-months.
        </div>
        <div class="subsidise-description pt-5">Starting from &lt;usertype_rate&gt; per hour &lt;saving&gt;% saving off
          our
          standard rate at $66</div>
      </div>
      <div class="mt-7 py-5">
        <div class="subsidise-title">Other benefits include</div>
        <div class="subsidise-description pt-1">Free access to A2A workshop programs (value $25)</div>
        <div class="subsidise-description pt-2">$5 off all tickets to our Flying Nun shows</div>
        <div class="subsidise-description pt-2">Exclusive invitations to our launches and events</div>
        <div class="subsidise-description pt-2">Networking opportunities with artists in Sydney</div>
        <div class="subsidise-description pt-2">Discounts from our industry sponsors</div>
      </div>
      <div class="tab-title mt-10">Do you want an artist pass?</div>
      <div class="d-flex justify-end pt-5 mt-10">
        <div class="mr-3 px-2 py-2 rect-btn">No thanks</div>
        <base-button black @click="updateArtistFlow(7)">Yes please</base-button>
      </div>
      <v-sheet height="30px" />
    </div>
    <div class="progress-bar" v-if="formData.organisationType == 'ARTIST' && progress > 0">
      <v-progress-linear :value="progress" :color="'#231F20'" :background-color="'#F4E44C'"></v-progress-linear>
    </div>
    <v-sheet height="30px" />
  </div>
</template>
<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent, ref } from '@/plugins/composition';
import SubscriberText from './SubscriberText.vue';
import { rules } from '@/composables/useValidation/validations';
// import { debouncedWatch } from '@vueuse/core';
import { User } from '@/models';
import { routeNames } from '@/router/routeNames';
import { useLoader } from '@/composables/useLoader';
import { useRegistrationData } from '@/composables/useRegistrationData';
import { mdiEyeOutline } from '@mdi/js';
import { useApi } from '@/composables/useApi';
import { snakeKeys } from '@/utils/case';
// import { useAuthStore } from '@/composables/useAuthStore';
// import { useRouter } from '@/router/useRouter';

export default defineComponent({
  components: { SubscriberText, BaseButton },
  name: 'SubscriberForm',
  setup() {
    const valid = ref(false);
    const isPasswordVisible = ref(false);
    const { loading, withLoader } = useLoader();
    const { artforms,step, orgTypes, formData, type,updateProgress, progress,typeSelected, isForOrganisation,goToStep, emailExists,next, } =
      useRegistrationData();
    const { post } = useApi();
    
    // const { router } = useRouter();

   
    const checkIfEmailExists = async () =>
      withLoader(async () => {
        emailExists.value = await User.existsByEmail(formData.email);
      });
    // console.log(step.value)
    const register = async () => {
      withLoader(async () => {
        await post('/users', snakeKeys(formData));
      });
    };
    const checkTypeOfOrganization = async () => {
      if (formData.organisationType === 'ARTIST') {
        goToStep(2);
        updateProgress(20);
      } else if (formData.organisationType === 'ARTS_ORGS') {
        goToStep(3);
      } else {
        goToStep(4);
      }
    };
    const updateArtistFlow =async (step:number) => {
      if (formData.organisationType === 'ARTIST') {
        goToStep(step);
        updateProgress(20);
        console.log(step,'step');
        console.log(progress.value,'progress');
      }
    };

    const checkRadio = async (value: string) => {
      formData.organisationType = value;
      console.log(formData.organisationType,step.value);
    };
    const checkRadioArtType = async (value: string) => {
      formData.artform = value;
      console.log(formData.artform,step.value);
    };
    console.log(step.value,'step.value' );
    console.log(progress.value,'progress');

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
      checkTypeOfOrganization,
      checkRadioArtType,
      updateArtistFlow,
      step,
      next,
      checkRadio,
      goToStep,
      updateProgress,
      progress,
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
.custom-text-field .v-input__slot {
  border-radius: 0px !important;
  border: 1px solid #231F20 !important;
}


.custom-text-field .v-input__slot {
  border-radius: 0px !important;
  border: 1px solid #231F20 !important;
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

.rounded-label {
  min-height: 80px !important;
  display: inline-block;
  border: 3px solid #231F20;
  border-radius: 20px;
  padding: 5px 10px;
  padding-left: 30px !important;
}

.custom-radio {
  height: 30px !important;
  width: 30px !important;
}

.v-icon.v-icon {
  font-size: 28px !important;
}

/* active rounded-label */
.rounded-label-active {
  background-color: #F4E44C;
}

.hidden-radio {
  position: absolute;
  left: -9999px;
}

.art-radio {
  display: inline-block;
  border: 3px solid #231F20;
  border-radius: 40px;
  padding: 5px 10px;
}

.art-radio-active {
  background-color: #F4E44C;
}

.insurance-label {
  margin-left: 10px;
}

.insurance-radio .v-input--radio-group.v-input--radio-group--row .v-radio {
  margin-right: 0px;
}

.subsidised-space-section {
  border-radius: 40px;
  background: #F4E44C;
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

.subsidise-title {
  font-family: 'Roboto-Regular' !important;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
}

.subsidise-description {
  font-family: 'Roboto-Regular' !important;
  font-size: 24px;
  font-weight: 400;
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

.rect-btn {
  border: 3px solid #231F20;
  font-family: 'Roboto-Regular' !important;
  font-size: 36px;
  font-weight: 900;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  padding: 10px 30px !important;
}

.progress-bar {
  max-width: 250px;
  margin: 0 auto;
  padding-top: 30px;
}
</style>
