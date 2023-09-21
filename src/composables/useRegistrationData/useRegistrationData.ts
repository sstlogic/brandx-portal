import { computed, reactive, ref, watch } from '@/plugins/composition';

const artforms = ref([
  'Visual Arts',
  'Performing Arts',
  'Music/Sound',
  'Film/Media',
  'Technology',
  'Festivals/Events',
  'Writing/Publishing',
  'Education/Workshops',
  'Wellness/Fitness',
  'Multi-Arts',
  'Community',
  'Other',
]);

const orgTypes = ['Government', 'Not For Profit', 'For Profit'];
const accountType = [
  { key: 'Artist', label: 'I am an individual artist', rate: 24.0 },
  { key: 'Arts_Organisation', label: 'We are an arts organization', rate: 33.0 },
  { key: 'General_Public', label: 'I am neither, but I have a creative project', rate: 66.0 },
];

const organisation = ['Government', 'Not For Profit', 'For Profit'];
const userDefaultData = {
  organisationName: '',
  organisationAbn: '',
  orgType: '',
  roleInOrg: '',
  organisationType: '',
  accountType: '',
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  suburb: '',
  state: '',
  country: '',
  postcode: '',
  phone: '',
  artform: '',
  tcs: false,
  updates: false,
  insurance: '',
  password: '',
  accurate: '',
  website: '',
  promo: '',
  wk_ph: '',
  hm_ph: '',
};
const formData = reactive(userDefaultData);

const type = ref<'individual' | 'organisation' | null>('individual');
const typeSelected = computed(() => !!type.value);
const isForOrganisation = computed(() => type.value === 'organisation');
const emailExists = ref(false);

const step = ref(1);
const next = () => step.value++;
const prev = () => step.value--;
// add specific value to step
const goToStep = (value: number) => (step.value = value);

const progress = ref(0);

const reset = () => {
  step.value = 1;
  progress.value = 0;
  formData.organisationName = '';
  formData.organisationAbn = '';
  formData.orgType = '';
  formData.roleInOrg = '';
  formData.organisationType = '';
  formData.accountType = '';
  formData.email = '';
  formData.firstName = '';
  formData.lastName = '';
  formData.address = '';
  formData.suburb = '';
  formData.state = '';
  formData.country = '';
  formData.postcode = '';
  formData.phone = '';
  formData.artform = '';
  formData.tcs = false;
  formData.updates = false;
  formData.insurance = 'No';
  formData.password = '';
  formData.accurate = '';
  formData.website = '';
  formData.promo = '';

  console.log('Reset Form Data', formData);
};

const updateProgress = (value: number) => {
  if (progress.value === 100) return;
  // Update the progress value
  progress.value += value;
};

watch(isForOrganisation, (val: boolean) => {
  if (!val) {
    formData.organisationAbn = '';
    formData.organisationType = '';
    formData.organisationName = '';
  }
});

export const useRegistrationData = () => {
  return {
    artforms,
    accountType,
    orgTypes,
    formData,
    type,
    typeSelected,
    isForOrganisation,
    emailExists,
    step,
    goToStep,
    next,
    prev,
    progress,
    organisation,
    updateProgress,
    reset,
  };
};
