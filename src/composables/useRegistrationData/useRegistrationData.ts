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

// const orgTypes = ['Sole Trader', 'Not For Profit entity', 'For Profit entity', 'Partnership', 'Trust'];
const orgTypes = [
  { key: 'ARTIST', label: 'I am an individual artist' },
  { key: 'ARTS_ORGS', label: 'We are an arts organization' },
  { key: 'GENERAL_PUBLIC', label: 'I am neither, but I have a creative project' },
];

const organisation = ['Government', 'Not For Profit', 'For Profit'];

const formData = reactive({
  organisationName: '',
  organisationAbn: '',
  orgType: '',
  roleInOrg: '',

  organisationType: '',
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
  tcs: '',
  updates: false,
  insurance: '',
  accurate: '',
  password: '',

  website: '',
  hear_from_us: '',
});

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
  };
};
