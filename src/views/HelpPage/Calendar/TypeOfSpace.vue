<template>
  <faq-question title="Type Of Space">
    <p>
      <strong>Brand X</strong> provides Artist Pass subscribers with the option to search our studio portfolio via
      artform categories. These include “Arts Business” (office and meeting spaces), Digital Media (editing suites and
      production studios), “Music” (recording studios and practice rooms), “Performing Arts” (rehearsal spaces and
      wardrobe) and “Visual Arts” (workspaces for hire). Clicking on the type of space will display calendars
      appropriate to the artform category selected.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'TypeOfSpace',
});
</script>

<style></style>
