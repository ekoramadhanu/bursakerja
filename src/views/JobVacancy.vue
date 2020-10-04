<template>
    <div class="mt-12 pt-1">
        <job-vacancy-home/>
        <footer-home/>
    </div>
</template>

<script>
import jobVacancy from '@/components/JobVacancy.vue';
import footer from '@/components/Footer.vue';

export default {
  components: {
    'job-vacancy-home': jobVacancy,
    'footer-home': footer,
  },
};
</script>

<style scoped>

</style>
