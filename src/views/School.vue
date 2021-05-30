<template>
    <div class="mt-12 pt-1">
        <school-home/>
        <footer-home/>
    </div>
</template>

<script>
import school from '@/components/School.vue';
import footer from '@/components/Footer.vue';

export default {
  components: {
    'school-home': school,
    'footer-home': footer,
  },
};

</script>
<style scoped>

</style>
