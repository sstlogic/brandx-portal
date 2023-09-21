<template>
  <div>
    <!-- 1.002 Subscriber Type -->
    <div class="w-full px-4" v-if="step == 1">
      <div class="tab-title pt-8 pt-sm-4 padding-21">
        Hi {{ formData.firstName }}! 👋 <br />
        Which best describes you?
      </div>
      <div class="sub-title-normal padding-21">
        Please select the choice that best describes your usage at Brand X so that we can tailor your experience.
      </div>
      <v-form v-model="valid">
        <div>
          <div class="padding-21">
            <v-radio-group v-model="formData.accountType" column :rules="[rules.required]" id="accountType">
              <div class="" v-for="(orgType, index) in accountType" :key="index">
                <div :class="{
                      'rounded-label': true,
                      'rounded-label-active': formData.accountType === orgType.key,
                  }" class="rounded-label d-flex my-2 pt-4 pb-2">
                  <v-radio large :value="orgType.key" :ripple="false" color="black"> </v-radio>
                  <label class="sub-title rounded-label-text pl-4" @click="checkRadio(orgType.key)">
                    {{ orgType.label}}
                  </label>
                </div>
              </div>
            </v-radio-group>
          </div>
          <!-- <v-sheet height="30px" /> -->
          <div class="sub-title-normal padding-21">
            <span class="sub-title">None of the above? </span>
            <a href="mailto:info@brandx.org.au">Get in touch</a>
          </div>
          <div class="d-flex justify-end">
            <base-button black :disabled="!valid" @click="checkTypeOfOrganization" id="SubscriberType"
              :loading="loading">Continue</base-button>
          </div>
        </div>
      </v-form>
    </div>

    <!-- Help us get to know you -->
    <div class="w-full px-4" v-if="step === 3">
      <div class="tab-title pt-4">Help us get to know you. 💛</div>
      <div class="sub-title-normal pt-md-4 pb-md-2 py-sm-5">Tell us more about your organisation.</div>
      <v-form v-model="valid" class="pt-4" id="help_us_form">
        <div>
          <div class="sub-title-normal pb-2"><span class="sub-title">Organisation name</span> (required)</div>
          <v-text-field v-model="formData.organisationName" name="organisationName" dense class="custom-text-field"
            outlined label="" :rules="[rules.required]" />
          <div class="sub-title-normal pb-2"><span class="sub-title">Organisation ABN</span> (required)</div>
          <v-text-field v-model="formData.organisationAbn" name="organisationAbn" dense outlined label=""
            class="custom-text-field" :rules="[rules.required]" />
          <div class="sub-title-normal pb-2"><span class="sub-title">Your role in the organisation</span> (required)</div>
          <v-text-field v-model="formData.roleInOrg" name="roleInOrg" dense class="custom-text-field" outlined label=""
            :rules="[rules.required]" />
          <div class="sub-title-normal pb-2">
            <span class="sub-title">Please choose your organisation type</span> (required)
          </div>
          <div>
            <v-radio-group v-model="formData.organisationType" row :rules="[rules.required]" id="organisationType">
              <div class="d-flex px-2" v-for="(item, index) in orgTypes" :key="index + '_'">
                <div class="org-rounded-radio my-2 py-sm-4 py-md-2 px-4 sub-title" :class="{
                      'org-rounded-radio': true,
                      'org-rounded-radio-active': formData.organisationType === item,
                }">
                  <label class="font-weight-bold" @click="checkRadioOrgType(item)">
                    {{ item }}
                  </label>
                  <v-radio name="organisationType" :value="item" :ripple="false" color="black" class="hidden-radio">
                  </v-radio>
                </div>
              </div>
            </v-radio-group>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 sub-title-normal">
              <span class="sub-title">Do you have Public liability Insurance?</span> (required)
            </div>
            <div class="col-md-12 col-sm-12 insurance-radio">
              <v-radio-group row v-model="formData.insurance" :rules="[rules.inArray(['Yes', 'No'])]" id="insurance">
                <v-radio value="Yes" name="insurance" id="yes_rd" color="black" :ripple="false" />
                <label class="mr-3 text sub-title-normal" for="yes_rd">Yes</label>
                <v-radio value="No" id="no_rd" name="insurance" color="black" :ripple="false" />
                <label class="sub-title-normal" for="no_rd">No</label>
              </v-radio-group>
            </div>
          </div>
          <div class="d-flex justify-end pt-5">
            <base-button black :disabled="!valid" @click="helpUsPage" id="HelpUs"
              :loading="loading">Continue</base-button>
          </div>
          <v-sheet height="30px" />
        </div>
      </v-form>
    </div>

    <!-- 1.003 Art Practice -->
    <div class="w-full px-4" v-if="step === 4">
      <div class="tab-title pt-4">
        {{ 'We love ' + formData.accountType + '! 💛' }}
      </div>
      <div class="pt-4 sub-title-normal description-m">
        Help us get to know you and please answer the following questions..
      </div>
      <div class="sub-title-normal description-m">What is your primary arts practice?</div>
      <div class="sub-title-normal pt-2 description-m">Select one.</div>
      <v-form v-model="valid" id="form_art" class="">
        <div>
          <v-radio-group v-model="formData.artform" row :rules="[rules.required]" id="artform">
            <div class="d-flex px-2" v-for="(itemArt, index) in artforms" :key="index">
              <div class="art-radio my-2 py-sm-4 py-md-2 px-4 sub-title" :class="{
                      'art-radio': true,
                      'art-radio-active': formData.artform === itemArt,
                    }">
                <v-radio :value="itemArt" :ripple="false" color="black" class="hidden-radio">
                </v-radio>
                <label class="font-weight-bold" @click="checkRadioArtType(itemArt)">
                  {{ itemArt }}
                </label>
              </div>
            </div>
          </v-radio-group>
          <div class="d-flex justify-end pt-5">
            <base-button black :disabled="!valid" @click="updateArtistFlow(5)" id="ArtPractice"
              :loading="loading">Continue</base-button>
          </div>
        </div>
      </v-form>
    </div>
    <!-- 1.005 Contact Info -->
    <div class="w-full px-4" v-if="step == 5">
      <div class="tab-title pt-4 padding-21">Where can we contact you?</div>
      <div class="sub-title-normal padding-32">For billing and under the rare occasion that we may need to
        contact you.
      </div>
      <v-form v-model="valid" class="">
        <div>
          <div class="sub-title-normal pb-2"><span class="sub-title">Mobile phone number</span> (required)</div>
          <div class="text-input-sub">
            <v-text-field v-model="formData.wk_ph" name="wk_ph" dense class="custom-text-field" outlined label=""
              :rules="[rules.required]" />
          </div>
          <div class="sub-title-normal pb-2"><span class="sub-title">Street Address</span> (required)</div>
          <div class="text-input-sub">
            <v-text-field v-model="formData.address" name="address" dense outlined label="" class="custom-text-field"
              :rules="[rules.required]" />
          </div>
          <div class="sub-title-normal pb-2"><span class="sub-title">Suburb</span> (required)</div>
          <div class="text-input-sub">
            <v-text-field v-model="formData.suburb" name="suburb" dense class="custom-text-field" outlined label=""
              :rules="[rules.required]" />
          </div>
          <div class="sub-title-normal pb-2"><span class="sub-title">Country</span> (required)</div>
          <div class="text-input-sub">
            <v-text-field v-model="formData.country" name="country" dense outlined label="" class="custom-text-field"
              :rules="[rules.required]" />
          </div>
          <div class="d-flex">
            <div class="mr-4 w-full text-input-sub">
              <div class="sub-title-normal pb-2"><span class="sub-title">State</span> (required)</div>
              <v-text-field v-model="formData.state" name="state" dense outlined label="" class="custom-text-field"
                :rules="[rules.required]" />
            </div>
            <div class="ml-4 w-full text-input-sub">
              <div class="sub-title-normal pb-2"><span class="sub-title">Postcode</span> (required)</div>
              <v-text-field v-model="formData.postcode" name="postcode" dense outlined label="" class="custom-text-field"
                :rules="[rules.required]" />
            </div>
          </div>
          <div class="row">
            <div class="col sub-title-normal">Do you attest that the information you have provided today is accurate?
            </div>
            <div class="col-auto insurance-radio ">
              <v-radio-group row v-model="formData.accurate" :rules="[rules.inArray(['Yes', 'No'])]" id="accurate">
                <v-radio value="Yes" id="ac_rd_yes" color="black" :ripple="false" />
                <label class="mr-3 text sub-title-normal" for="ac_rd_yes">Yes</label>
                <v-radio value="No" id="ac_rd_no" color="black" :ripple="false" />
                <label class="sub-title-normal" for="ac_rd_no">No</label>
              </v-radio-group>
            </div>
          </div>
        </div>
        <div class="d-flex justify-end pt-5">
          <base-button black :disabled="!valid" @click="updateArtistFlow(6)" id="ContactInfo"
            :loading="loading">Continue</base-button>
        </div>
      </v-form>
    </div>
    <!-- 1.006 Online Info -->
    <div class="w-full px-4" v-if="step == 6">
      <div class="tab-title pt-4 padding-21">Where can we find you online?</div>
      <div class="sub-title-normal padding-32">
        Getting to know our community helps us to connect artists and opportunities. If you are comfortable please share
        your online details.
      </div>
      <v-form v-model="valid" class="">
        <div>
          <div class="sub-title-normal pb-2"><span class="sub-title">Website URL</span> (optional)</div>
          <v-text-field v-model="formData.website" dense class="custom-text-field" outlined />
          <div class="tab-title pt-7 padding-21">Would you like to hear from us from time to time?</div>
          <div class="sub-title-normal padding-21">
            By subscribing to the Brand X newsletter you’ll stay up to date with the latest programs,
            shows and residency information that we have to offer.
          </div>
          <div class="sub-title-normal padding-21">Be the first to know and subscribe to our newsletter.</div>
          <div class="w-full">
            <v-radio-group row v-model="formData.promo" :rules="[rules.inArray(['Yes', 'No'])]" id="promo">
              <v-radio value="Yes" color="black" id="promo_yes" :ripple="false" />
              <label class="mr-3 sub-title-normal" for="promo_yes">Yaaaas please!</label>
              <v-radio value="No" color="black" id="promo_no" :ripple="false" />
              <label class="sub-title-normal" for="promo_no">Not now thanks.</label>
            </v-radio-group>
          </div>
        </div>
        <div class="d-flex justify-end pt-5">
          <div class="pr-4 pt-3 text-decoration-underline sub-title-normal" @click="updateArtistFlow(7)">
            skip this question
          </div>
          <base-button black :disabled="!valid" @click="updateArtistFlow(7)" id="OnlineInfo"
            :loading="loading">Continue</base-button>
        </div>
      </v-form>
    </div>
    <!-- 1.007 Artist Pass Subscription -->
    <div class="w-full px-4" v-if="step == 7">
      <div class="tab-title pt-4 mt-5">Amazing! You are registered.</div>
      <div class="tab-title pt-6">
        Based on the information provided, you qualify for an {{ formData.accountType }} Artist Pass.
      </div>
      <div class="text-h5 text-center subsidised-space-section image-container px-5 py-7 mt-7">
        <div class="diamond">
          <img alt="diamond" class="diamond-img" src="../../../assets/diamond.png" />
        </div>
        <div class="subsidise-title">Subsidised space hire</div>
        <div class="subsidise-description pt-2">
          A subscription costs {{ formData.accountType == "Artist" ? "$20.00": "$100.00" }} and provides you with great
          benefits
          for the next 12-months.
        </div>
        <div class="subsidise-description pt-5">
          Starting from ${{ getType('rate') }}.00 per hour {{ getType('saving') }}% saving off our standard rate at $66
        </div>
      </div>
      <div class="mt-3 py-5">
        <div class="subsidise-title">Other benefits include</div>
        <div class="subsidise-description pt-1">Free access to A2A workshop programs (value $25)</div>
        <div class="subsidise-description pt-2">$5 off all tickets to our Flying Nun shows</div>
        <div class="subsidise-description pt-2">Exclusive invitations to our launches and events</div>
        <div class="subsidise-description pt-2">Networking opportunities with artists in Sydney</div>
        <div class="subsidise-description pt-2">Discounts from our industry sponsors</div>
      </div>
      <div class="tab-title mt-2">Do you want an artist pass?</div>
      <div class="d-flex justify-end pt-5 mt-5">
        <div class="mr-3 px-2 py-2">
          <!-- <router-link :to="{ name: routeNames.home }" class="rect-btn">No thanks</router-link> -->
          <div class="rect-btn" @click="noThankYou()">No thanks</div>
        </div>
        <!-- <router-link :to="{ name: routeNames.profile.billing }"> -->
        <base-button black @click="goAheadToBilling()" id="ArtistPassSubscription">Yes please</base-button>
        <!-- </router-link> -->
      </div>
    </div>

    <div class="progress-bar" v-if="formData.accountType == 'Artist' && progress > 0">
      <v-progress-linear :value="progress" :color="'#231F20'" :background-color="'#F4E44C'"></v-progress-linear>
    </div>
  </div>
</template>
<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { defineComponent, ref, watchEffect } from '@/plugins/composition';
import SubscriberText from './SubscriberText.vue';
import { rules } from '@/composables/useValidation/validations';
// import { debouncedWatch } from '@vueuse/core';
// import { User } from '@/models';
import { routeNames } from '@/router/routeNames';
import { useLoader } from '@/composables/useLoader';
import { useRegistrationData } from '@/composables/useRegistrationData';
import { mdiEyeOutline } from '@mdi/js';
import { useApi } from '@/composables/useApi';
import { snakeKeys } from '@/utils/case';
import { BookedUser } from '@/models/booked/BookedUser';
import { useAuthStore } from '@/composables/useAuthStore';
import { useStatus } from '@/composables/useStatus';
import { useRouter } from '@/router/useRouter';

export default defineComponent({
  components: { SubscriberText, BaseButton },
  name: 'SubscriberForm',
  setup() {
    const valid = ref(true);
    const isPasswordVisible = ref(false);
    const { loading, withLoader } = useLoader();
    const {
      artforms,
      step,
      accountType,
      formData,
      reset,
      type,
      updateProgress,
      progress,
      typeSelected,
      isForOrganisation,
      orgTypes,
      goToStep,
      emailExists,
      next,
      organisation,
    } = useRegistrationData();
    const { setMessage } = useStatus();
    const { user, refreshState,isAuthed } = useAuthStore();
    const formDataSubmit = ref<BookedUser>({} as BookedUser);
    const { post, put } = useApi();
    // console.log(user.value.data, 'user');
    if (isAuthed) {
      if (formData.firstName == '') {
        formData.firstName = user?.value?.data?.firstName;
      }
      if (formData.lastName == '') {
        formData.lastName = user?.value?.data?.lastName;
      }
      if (formData.email == '') {
        formData.email = user?.value?.data?.email;
      }
    }
    const { router } = useRouter();
    const register = async () => {
      withLoader(async () => {
        await post('/users', snakeKeys(formData));
      });
    };

    watchEffect(() => {
      // console.log(valid.value, 'valid watchEffect');
      // console.log(step.value, 'step');
    });

    const updateUser = async (type: string) => {
      return withLoader(async () => {
        let uuid = user?.value?.data?.uuid ?? '';
        const response = await put(`/users/${uuid}`, snakeKeys(formData));
        if (response === undefined) {
          return false;
        }
        if (response !== undefined && type == 'General_Public') {
          reset();
          router.push({ name: routeNames.spaces.book });
        }
        return response;
      });
    };
    const checkTypeOfOrganization = async () => {
      if (formData.accountType === 'Artist') {
        goToStep(4);
        updateProgress(20);
      } else if (formData.accountType === 'Arts_Organisation') {
        goToStep(3);
      } else if (formData.accountType === 'General_Public') {
        console.log(formData.accountType, 'formData.accountType');
        await updateUser('General_Public');
      }
    };
    const updateArtistFlow = async (step: number) => {
      const res = await updateUser(formData.accountType);
      console.log(res, 'res', formData.accountType);
      if (res !== undefined) {
        goToStep(step);
        updateProgress(20);
      }
    };
    const goAheadToBilling = async () => {
      reset();
      router.push({ name: routeNames.profile.billing });
    };
    const noThankYou = async () => {
      reset();
      router.push({ name: routeNames.home });
    };
    const checkRadio = async (value: string) => {
      formData.accountType = value;
    };
    const checkRadioArtType = async (value: string) => {
      formData.artform = value;
    };
    const checkRadioOrgType = async (value: string) => {
      formData.organisationType = value;
    };
    const getType = (value: string) => {
      let data = accountType.filter((item) => {
        return item.key === formData.accountType; // Assuming item.key is what you want to match
      });
      if (data.length > 0) {
        if (value == 'rate') {
          return data[0].rate;
        }
        if (value == 'saving') {
          let saving = (100 * data[0].rate) / 66;

          return Math.round(100 - saving);
        }
      }
      return '';
    };
    const helpUsPage = async () => {
      const res = await updateUser(formData.accountType);
      if (res !== undefined) {
        updateProgress(20);
        goToStep(4);
      }
    };
    
    return {
      type,
      isForOrganisation,
      typeSelected,
      formData,
      formDataSubmit,
      rules,
      valid,
      accountType,
      artforms,
      getType,
      loading,
      emailExists,
      register,
      updateUser,
      helpUsPage,
      goAheadToBilling,
      noThankYou,
      organisation,
      checkTypeOfOrganization,
      checkRadioArtType,
      checkRadioOrgType,
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
      orgTypes,
    };
  },
});
</script>

<style>
.image-container {
  position: relative;
  display: inline-block;
  /* Make sure the container doesn't collapse */
}

.diamond {
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-bottom-color: your-diamond-color;
  /* Replace with your desired color */
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-30px, -60px);
  rotate: 5deg;
  /* Center the diamond */
}

.padding-21 {
  padding-bottom: 21px;
}

.padding-42 {
  padding-bottom: 42px;
}

.padding-32 {
  padding-bottom: 32px;
}

/* desktop screen */
@media only screen and (min-width: 1025px) {


  .text-input-sub .theme--light.v-input {
    max-height: 60px;
  }

  .custom-text-field .v-input__slot {
    border-radius: 0px !important;
    border: 1px solid #231F20 !important;
  }

  .custom-text-field .v-input__slot {
    border-radius: 0px !important;
    border: 1px solid #231F20 !important;
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

  .rounded-label {
    min-height: 65px !important;
    display: inline-block;
    border: 3px solid #231F20;
    border-radius: 20px;
    padding: 5px 10px;
    padding-left: 30px !important;
  }

  .rounded-label-text {
    padding-top: 0px !important;
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

  .org-rounded-radio {
    display: inline-block;
    border: 3px solid #231F20;
    border-radius: 40px;
    padding: 5px 10px;
  }

  .org-rounded-radio-active {
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

  .subsidise-title {
    font-family: 'Roboto-Regular' !important;
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
  }

  .subsidise-description {
    font-family: 'Roboto-Regular' !important;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
  }

  .tab-title {
    font-family: 'Roboto-Medium' !important;
    font-size: 24px;
    font-weight: 900;
    line-height: 42px;
    letter-spacing: 0em;
  }

  .rect-btn {
    border: 3px solid #231F20;
    font-family: 'Roboto-Medium' !important;
    font-size: 30px;
    font-weight: 900;
    line-height: 35.16px;
    letter-spacing: 0em;
    padding: 6px 30px !important;
    color: #231F20 !important;
    text-decoration: none !important;
  }

  .progress-bar {
    max-width: 250px;
    margin: 0 auto;
    padding-top: 30px;
  }
}

/* Mobile screen */
@media only screen and (max-width: 1024px) {
  .text-input-sub .theme--light.v-input {
    max-height: 75px;
  }

  .description-m {
    margin-bottom: 10px !important;
  }

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

  .rounded-label-text {
    padding-top: 5px !important;
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
    font-family: 'Roboto-Medium' !important;
    font-size: 36px;
    font-weight: 900;
    line-height: 42px;
    letter-spacing: 0em;
  }

  .rect-btn {
    border: 3px solid #231F20;
    font-family: 'Roboto-Medium' !important;
    font-size: 36px;
    font-weight: 900;
    line-height: 42px;
    letter-spacing: 0em;
    text-align: left;
    padding: 6px 30px !important;
    color: #231F20 !important;
    text-decoration: none !important;
  }

  .progress-bar {
    max-width: 250px;
    margin: 0 auto;
    padding-top: 30px;
  }
}
</style>
