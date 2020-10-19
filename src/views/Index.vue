<template>
    <div>
        <jumbotron-home/>
        <partner-home/>
        <footer-home/>
        <floating-button/>
    </div>
</template>

<script>
import jumbotron from '@/components/Jumbotron.vue';
import partner from '@/components/Partner.vue';
import footer from '@/components/Footer.vue';
import floatingButton from '@/components/FloatingButton.vue';
import goTo from 'vuetify/es5/services/goto';

export default {
  components: {
    'jumbotron-home': jumbotron,
    'partner-home': partner,
    'footer-home': footer,
    'floating-button': floatingButton,
  },
  created() {
    goTo(0);
  },
};
</script>

<style scoped>

</style>
